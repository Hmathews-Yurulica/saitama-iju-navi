# 変更履歴

このプロジェクトの重要な変更はすべてこのファイルに記録されます。

フォーマットは [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) に準拠し、
バージョニングは [Semantic Versioning](https://semver.org/spec/v2.0.0.html) に従います。

---

## [未リリース]

### 予定
- AIチャットボットの実装（Anthropic Claude）

---

## [0.3.0] - 2026-06-10

### 変更
- `style.scss` をフラットな CSS からネスト構造の SCSS にリファクタ（セレクタのネスト・`&` による疑似クラス・インライン `@media`）
- `script.js` のヘッダースクロールリスナーを修正（`load resize` イベントごとにリスナーが積み重なるバグを解消、名前空間付きイベント `scroll.header` に変更し即時初期化）

### 追加
- `package.json` — Dart Sass CLI を使った `sass:build` / `sass:watch` npm スクリプト
- `scripts/css-to-scss.js` — PostCSS ベースの CSS → SCSS 変換スクリプト

---

## [0.2.0] - 2026-06-10

### 変更
- アーキテクチャをNext.jsから静的HTML/SCSS/JSに変更
- コーディング規約（ver 1.2）に基づき全体を再構築

### 追加
- `index.html` — ランディングページの骨格
- `assets/scss/style.scss` — メインスタイルシート（SCSS）
- `assets/css/sanitize.css` — CSSリセット
- `assets/js/script.js` — メインスクリプト
- `assets/js/plugins.js` — 外部プラグイン用ファイル
- `.editorconfig` — エディタ設定（UTF-8 / LF / インデント2スペース）
- `.gitignore` — 除外設定

### 削除
- Next.js プロジェクト一式

---

## [0.1.0] - 2026-06-09

### 追加
- Next.js 16（TypeScript・Tailwind CSS）の初期セットアップ
- ローカル環境設定用の `.env.example` テンプレート
- セットアップ手順を記載した `README.md`（日本語・英語対応）
- GitHubリポジトリを `Hmathews-Yurulica/saitama-iju-navi` として作成
