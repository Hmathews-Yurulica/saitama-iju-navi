# 変更履歴

このプロジェクトの重要な変更はすべてこのファイルに記録されます。

フォーマットは [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) に準拠し、
バージョニングは [Semantic Versioning](https://semver.org/spec/v2.0.0.html) に従います。

---

## [未リリース]

### 予定
- AIチャットボットの実装（Anthropic Claude）

---

## [0.5.0] - 2026-06-12

### 変更
- FV グリーンブロブ（`.fv-blob-area`）のアスペクト比を `949:522` に固定（`aspect-ratio: 949 / 522`）
  - PC・SP 問わず全画面サイズで縦横比を維持
  - 固定 `height` 指定（PC: `83%`、SP: `280px`）を削除し `height: auto` に変更

---

## [0.4.0] - 2026-06-11

### 追加
- FV ヒーローセクション・AI相談セクション（セクション1〜5）のインライン CSS を `style.scss` へ移行
- レスポンシブ表示制御ユーティリティクラス（`.is-pc` / `.is-pctab` / `.is-tab` / `.is-tabsp` / `.is-sp`）を追加
- SP（≤ 540px）向け FV レスポンシブスタイルを実装
  - タイトル・ラベルのフォントサイズ縮小（38px → 20px、70px → 40px）
  - ディスクリプションボックスを4行に分割
  - ボタンを縦並びに変更（幅 232px）
  - マスコット・デコ要素を SP 向けに再配置
  - SP 専用フローティング CTA バナー（「AIコンシェルジュに相談する」）を追加

### 変更
- PC FV セクションを全画面対応に変更（`100vw × 85vh`、最小高さ `698px`）
  - 背景テクスチャ・グリーンブロブを `%` ベースで比率スケール
  - ディスクリプション・ボタンを `%` 上端で縦方向流動配置
  - 右端要素（さいたまっち・デコ4/5・マスコットラベル）を `right` ベースに変更
  - マスコット・デコ・ホワイトバーを `bottom` ベースでフロアピン固定

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
