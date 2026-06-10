/*!
 * script.js
 * メインスクリプト
 * 特定ページのみで動作する処理は、DOMの存在確認を最初に行うこと
 * 提出前に console.log・デバッグコードを削除すること
 */

(function () {
  'use strict';

  // ハンバーガーメニュー（SP）
  // ------------------------------------------------------------
  var navButton = document.getElementById('js-nav-button');
  var globalNav = document.getElementById('global-nav');
  if (navButton && globalNav) {
    navButton.addEventListener('click', function () {
      var isOpen = navButton.getAttribute('aria-expanded') === 'true';
      navButton.setAttribute('aria-expanded', String(!isOpen));
      navButton.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
      navButton.classList.toggle('is-active', !isOpen);
      if (isOpen) {
        globalNav.style.display = '';
      } else {
        globalNav.style.display = 'block';
      }
    });
  }

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
