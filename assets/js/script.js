/*!
 * script.js
 * メインスクリプト
 * 特定ページのみで動作する処理は、DOMの存在確認を最初に行うこと
 * 提出前に console.log・デバッグコードを削除すること
 */

(function () {
  'use strict';

  // スムーススクロール（アンカーリンク）
  // ------------------------------------------------------------
  const anchors = document.querySelectorAll('a[href^="#"]');
  if (anchors.length > 0) {
    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
})();
