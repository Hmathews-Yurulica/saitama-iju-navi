# 変更履歴

このプロジェクトの重要な変更はすべてこのファイルに記録されます。

フォーマットは [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) に準拠し、
バージョニングは [Semantic Versioning](https://semver.org/spec/v2.0.0.html) に従います。

---

## [未リリース]

### 修正
- `functions/index.js`: Cookie名を `saitama_auth` から `__session` に変更。Firebase HostingはCloud Runへのリクエスト転送時に `__session` 以外のCookieを除去するため、認証Cookie未検出によりログイン後も常にログインフォームが表示される問題を解消
- `functions/index.js`: ログイン成功後のリダイレクト先を `/` から `/index.html` に変更
- `functions/index.js`: 認証処理をExpressミドルウェア（`authMiddleware`）として分離し、ルートハンドラと明確に責務を分割
- `functions/index.js`: `SameSite=Strict` を `SameSite=Lax` に変更し、リダイレクト時のCookie送信を保証

---

## [未リリース（旧）]

### 予定
- AIチャットボットの実装（Anthropic Claude）

### 変更
- `assets/scss/style.scss` から未使用セレクタを削除し、ファイルサイズを削減（26,376行 → 8,908行）。`route-map-*`、検索結果・WordPressページテンプレート系（`page-*`、`section-*` 等）の旧セレクタを除去。ヘッダー/フッター/ナビ、`index.html` の各セクション（fv/aisupport/topics/steps/faq/cta）、`script.js`/`plugins.js` が参照するクラス（slick、modaal、フォーム関連）は保持。`assets/css/style.css` は変更なし。

---

## [0.7.0] - 2026-06-16

### 追加
- `.aisupport-chat__window` を `__window-wrap` でラップし、SP で `transform: scale()` により内部要素（テキスト・画像含む）を画面幅に応じて均一スケーリング（最大サイズは PC 表示と同一）
- `.fv-button` / `.btn-yellow` / `.faq-copy-btn` に `box-shadow`（下方向のドロップシャドウ、ボーダーと同色）を追加し、ホバー時に `0px` まで縮小するアニメーションを実装

### 変更
- `.fv-button` / `.btn-yellow` ホバー時の背景色・ボーダー色を `#FBDC93` に変更
- `.fv-button` / `.btn-yellow` の `border-bottom` を常時 2px・`margin-bottom: 2px` に固定（ホバー時の可変だったボーダー幅を廃止し `box-shadow` で表現）
- `.faq-copy-btn` のボーダーを 1px・`margin-bottom: 1px`・シャドウ 1px に変更（他ボタンと同じ表現をスケールダウンして適用）
- 上記ボタン群のトランジションを `0.2s ease-in` に統一（opacity・background・border-color・box-shadow）

---

## [0.6.0] - 2026-06-16

### 追加
- FAQ カテゴリタブのホバー時に黄色アンダーラインが左から右へ伸びるアニメーション（0.2s ease-out）
- FAQ タブラベルを `<span class="faq-cat-tab__label">` でラップし、アンダーラインをテキスト幅に揃える
- `topics-section` に FV と同じ背景テクスチャ画像（PC: `bg_texture_pc.png` / SP: `bg_texture_sp.png`）を適用
- `btn-yellow has-icon` のテキストを `<span class="btn-yellow__text">` でラップし、SP で `flex-grow: 1` + `text-align: center` を適用
- `aisupport-mascot` の left 位置を 992px〜1200px 間で流動補間（15px → 100px）
- `.aisupport-section .sec-heading-group` の margin-left を 992px〜1200px 間で流動補間（60px → 0px）

### 変更
- アンカースクロールを jQuery animate から CSS `scroll-behavior: smooth` + `scroll-padding-top` に変更（全ブラウザで確実に動作）
- `script.js` のアンカースクロール処理を削除し、CSS のみで実装
- コピーツールチップの表示位置を `.faq-q-text` からコピーボタン上部に変更
- FV デコ要素（`.fv-deco`）の z-index を 1 に設定し、主要コンテンツ（blob・description・mascot: 2、buttons: 3）より背面に配置
- `faq-row` の区切り線を `1px dashed rgba(green, 0.4)` から `2px solid #fff` に変更
- `faq-cat-tab--active` のボーダーを上・下・左のみ `2px solid #36bc87` に変更し、直後のタブの上ボーダーを非表示に
- `fv-disclaimer-line` を `2px dashed #FFCC52`（黄色破線）に変更
- `step-item__text` の SP フォントサイズを `clamp(1px, calc((100vw - 110px) / 20), 14px)` に変更（20文字が常に1行に収まるよう調整）
- `.fv-main-title p` の `text-shadow` を `0.156vw 0.156vw 0px rgba(0,0,0,0.25)` に変更し、文字サイズに比例してスケール

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
