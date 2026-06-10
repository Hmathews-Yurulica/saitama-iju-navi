/**
 * css-to-scss.js
 *
 * Converts flat compiled CSS → nested SCSS by manipulating the PostCSS AST
 * directly, then using postcss-scss's own stringify so all formatting/
 * semicolons/raws are preserved exactly.
 *
 * Transformations applied:
 *  1. Child selectors nested inside parents  (.a .b → .a { .b {} })
 *  2. Pseudo-classes / pseudo-elements / same-element modifiers use &
 *     (.a:hover → .a { &:hover {} })
 *  3. @media blocks split so each rule moves inside its matching parent
 */

const postcss     = require('postcss');
const postcssSCSS = require('postcss-scss');
const fs          = require('fs');
const path        = require('path');

const FILE = path.join(__dirname, '../assets/scss/style.scss');
const src  = fs.readFileSync(FILE, 'utf8');

// ─── helpers ──────────────────────────────────────────────────────────────────

function norm(sel) {
  return (sel || '').replace(/\s+/g, ' ').trim();
}

/**
 * If childSel is a descendant/modifier of parentSel, return the selector
 * string to use *inside* the parent (with & substitution where needed).
 * Returns null if not a child.
 */
function childSelector(childSel, parentSel) {
  const c = norm(childSel);
  const p = norm(parentSel);
  if (!c || !p || c === p) return null;

  if (c.startsWith(p + ' '))   return c.slice(p.length + 1);        // .a .b  →  .b
  if (c.startsWith(p + '.'))   return '&' + c.slice(p.length);      // .a.b   →  &.b
  if (c.startsWith(p + ':'))   return '&' + c.slice(p.length);      // .a:h   →  &:h
  if (c.startsWith(p + '['))   return '&' + c.slice(p.length);      // .a[x]  →  &[x]
  if (c.startsWith(p + ' > ')) return '& > ' + c.slice(p.length + 3); // .a > .b
  if (c.startsWith(p + ' + ')) return '& + ' + c.slice(p.length + 3);
  if (c.startsWith(p + ' ~ ')) return '& ~ ' + c.slice(p.length + 3);
  return null;
}

/**
 * For a comma-list selector, return the nested version if ALL parts are
 * children of parentSel, otherwise null.
 */
function childSelectorMulti(multiSel, parentSel) {
  const parts = multiSel.split(',').map(s => s.trim());
  const mapped = parts.map(p => childSelector(p, parentSel));
  if (mapped.some(m => m === null)) return null;
  return mapped.join(',\n');
}

// ─── AST manipulation ─────────────────────────────────────────────────────────

/**
 * Walk a list of PostCSS nodes (children of a container) and nest
 * child rules inside their parents.  Mutates the array in-place.
 *
 * Strategy (single-pass, greedy):
 *   Keep a stack of "open" rule nodes.  For each new rule, pop the stack
 *   until we find a parent that contains this rule, then nest it there.
 *   If no parent found, push to output as a new top-level rule and reset stack.
 */
// How many nodes to look back when searching for a parent.
// Keeps nesting local to each component block and prevents generic layout
// selectors (e.g. .inner) from absorbing page-section rules that appear
// hundreds of lines away.
const LOOK_BACK = 20;

function nestRules(container) {
  // container is a PostCSS Root or Rule — use .nodes array
  const nodeList = container.nodes || [];

  // Collect all direct rule children first (snapshot before mutation)
  const rules = nodeList.filter(n => n.type === 'rule');

  for (const rule of rules) {
    const sel     = norm(rule.selector);
    const ruleIdx = nodeList.indexOf(rule);

    // Only consider candidates within LOOK_BACK positions of this rule
    let bestParent = null;
    let bestLen    = 0;

    const start = Math.max(0, ruleIdx - LOOK_BACK);
    for (let i = start; i < ruleIdx; i++) {
      const candidate = nodeList[i];
      if (candidate.type !== 'rule') continue;
      if (candidate === rule) continue;

      const rel = childSelectorMulti(sel, norm(candidate.selector));
      if (rel !== null && candidate.selector.length > bestLen) {
        bestParent = candidate;
        bestLen    = candidate.selector.length;
      }
      // Also search recursively inside already-nested children
      const deeper = findDeepestParent(candidate, sel);
      if (deeper && deeper.selector.length > bestLen) {
        bestParent = deeper;
        bestLen    = deeper.selector.length;
      }
    }

    if (bestParent) {
      const rel = childSelectorMulti(sel, norm(bestParent.selector));
      rule.selector = rel;
      rule.remove();
      bestParent.append(rule);
    }
  }
}

function findDeepestParent(container, childSel) {
  let best = null;
  let bestLen = 0;
  container.each(n => {
    if (n.type !== 'rule') return;
    const rel = childSelectorMulti(childSel, norm(n.selector));
    if (rel !== null && n.selector.length > bestLen) {
      best    = n;
      bestLen = n.selector.length;
    }
    const deeper = findDeepestParent(n, childSel);
    if (deeper && deeper.selector.length > bestLen) {
      best    = deeper;
      bestLen = deeper.selector.length;
    }
  });
  return best;
}

/**
 * For each @media block, try to move each of its child rules inside a
 * matching top-level rule.  Rules with no matching parent stay in a
 * residual @media block that remains in place.
 */
function mergeMediaIntoParents(root) {
  // Collect all @media atrules at the top level (snapshot, as we'll mutate)
  const mediaBlocks = [];
  root.each(n => {
    if (n.type === 'atrule' && /^media$/i.test(n.name)) mediaBlocks.push(n);
  });

  for (const media of mediaBlocks) {
    const orphanRules = [];

    // Walk rules inside this @media
    const innerRules = [];
    media.each(n => { if (n.type === 'rule') innerRules.push(n); });

    for (const rule of innerRules) {
      const sel = norm(rule.selector);

      // 1. Exact-match: find a rule with exactly the same selector
      let exactMatch = null;
      root.each(candidate => {
        if (candidate.type === 'rule' && norm(candidate.selector) === sel) {
          exactMatch = candidate;
        }
      });
      if (!exactMatch) {
        // Also search inside nested rules
        root.each(candidate => {
          if (candidate.type !== 'rule') return;
          candidate.each(child => {
            if (child.type === 'rule' && norm(child.selector) === sel) exactMatch = child;
          });
        });
      }

      // 2. Parent match: find deepest rule whose selector is a parent of this one
      let bestParent = null;
      let bestLen    = 0;
      root.each(candidate => {
        if (candidate.type !== 'rule') return;
        const rel = childSelectorMulti(sel, norm(candidate.selector));
        if (rel !== null && candidate.selector.length > bestLen) {
          bestParent = candidate;
          bestLen    = candidate.selector.length;
        }
        const deeper = findDeepestParent(candidate, sel);
        if (deeper && deeper.selector.length > bestLen) {
          bestParent = deeper;
          bestLen    = deeper.selector.length;
        }
      });

      const newMedia = postcss.atRule({
        name:   media.name,
        params: media.params,
        raws:   { between: ' ', afterName: ' ' },
      });

      if (exactMatch) {
        // Same selector: unwrap — put declarations directly in @media (SCSS bubbles it)
        rule.each(decl => newMedia.append(decl.clone()));
        rule.remove();
        exactMatch.append(newMedia);
      } else if (bestParent) {
        const rel = childSelectorMulti(sel, norm(bestParent.selector));
        rule.selector = rel;
        rule.remove();
        newMedia.append(rule);
        bestParent.append(newMedia);
      } else {
        orphanRules.push(rule);
      }
    }

    // If all rules were absorbed, remove the empty @media block
    if (orphanRules.length === 0) {
      media.remove();
    }
    // Otherwise leave the @media in place — it already lost the moved rules
  }
}

// ─── reformat ─────────────────────────────────────────────────────────────────

/**
 * Walk the AST and fix indentation raws so nested nodes are properly indented.
 * This corrects the raws.before / raws.after / raws.between values that
 * PostCSS preserves from the original position when nodes are moved.
 */
function reformat(container, depth = 0) {
  // myIndent: the indentation level of direct children of this container
  const myIndent = '  '.repeat(depth);

  let first = true;
  container.each(node => {
    const isBlock = !!(node.nodes);

    // raws.before = whitespace that appears before this node
    // Use a blank line separator between block-level siblings for readability
    const nl = (isBlock && !first) ? '\n\n' : '\n';
    node.raws.before = nl + myIndent;
    first = false;

    if (isBlock) {
      node.raws.between = ' ';
      if (node.nodes.length) {
        // Closing } sits at myIndent level (same indent as this node's selector)
        node.raws.after = '\n' + myIndent;
        reformat(node, depth + 1);
      } else {
        node.raws.after = '';
      }
      // Re-indent continuation lines in multi-part selectors
      if (node.type === 'rule' && node.selector && node.selector.includes('\n')) {
        node.selector = node.selector
          .split('\n')
          .map((line, i) => i === 0 ? line : myIndent + line.trim())
          .join('\n');
      }
    }
  });
}

// ─── main ──────────────────────────────────────────────────────────────────────

console.log('Parsing…');
const root = postcssSCSS.parse(src);

console.log('Nesting child selectors…');
nestRules(root);

console.log('Merging @media into parents…');
mergeMediaIntoParents(root);

console.log('Reformatting indentation…');
reformat(root);

console.log('Serialising…');
const output = root.toResult({ syntax: postcssSCSS }).css;

fs.writeFileSync(FILE, output);
console.log(`Done. Written ${output.split('\n').length} lines → ${FILE}`);
