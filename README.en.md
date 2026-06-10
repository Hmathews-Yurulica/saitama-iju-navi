# Saitama Relocation Navigator

**言語 / Language:** [日本語](./README.md) | English

A landing page with an AI-powered chatbot for people considering relocating to Saitama Prefecture.

---

## Tech Stack

| Technology | Details |
|---|---|
| **HTML** | HTML Living Standard |
| **CSS** | SCSS (compiled via Dart Sass CLI) / sanitize.css |
| **JS** | Vanilla JavaScript |
| **AI** | Anthropic Claude (chatbot — coming soon) |

---

## Browser Support

| Browser | Environment |
|---|---|
| Edge latest | Windows |
| Chrome latest | Windows / Mac |
| Firefox latest | Windows |
| Safari latest | Mac |
| Mobile Safari | iOS 10+ |
| Chrome | Android 7+ |

---

## Directory Structure

```
/
├── index.html
├── assets/
│   ├── img/          # Images (png / jpg / svg / gif)
│   ├── css/
│   │   ├── sanitize.css   # CSS reset
│   │   └── style.css      # Compiled from SCSS (do not edit directly)
│   ├── scss/
│   │   └── style.scss     # Main stylesheet
│   └── js/
│       ├── plugins.js     # jQuery plugins etc.
│       └── script.js      # Main script
├── .editorconfig
├── .gitignore
├── README.md
├── README.en.md
└── CHANGELOG.md
```

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Hmathews-Yurulica/saitama-iju-navi.git
cd saitama-iju-navi
git checkout develop
```

### 2. Editor config

Install the **EditorConfig for VS Code** extension:

- Plugin ID: `EditorConfig.EditorConfig`

### 3. Install dependencies

```bash
npm install
```

### 4. Compile SCSS

**Watch mode (development):**

```bash
npm run sass:watch
```

**One-time build:**

```bash
npm run sass:build
```

> `assets/css/style.css` is generated automatically — do not edit it directly.

### 5. Preview in browser

Open `index.html` directly in your browser, or use the **Live Server** VSCode extension.

---

## Development Rules

- Never append code directly to shared files (`style.scss`, `script.js`)
- Add new features in new files (e.g. `_sub.scss` / `sub.js`)
- Class names: lowercase, hyphen-separated, no abbreviations
- IDs only for JS hooks
- Accessibility: JIS X 8341-3:2016 Level AA
  - Contrast ratio 4.5:1 or higher
  - Visible keyboard focus states
  - Touch targets 44×44px minimum
- Compress images before delivery (TinyPNG etc.), filenames in lowercase with hyphens
- Remove all `console.log` and debug code before submitting

---

## Git Branching (Git Flow)

| Branch | Purpose |
|---|---|
| `master` | Production |
| `develop` | Development base (staging equivalent) |
| `feature/YYYYMMDD_surname` | Work branch (from develop) |
| `feature/modify_issueKey` | Issue fix branch (from develop) |
| `hotfix/` | Bug fix (from master) |
| `release/` | Release branch |

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a full history of changes.
