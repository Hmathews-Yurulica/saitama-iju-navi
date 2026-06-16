# 住むなら埼玉

**言語 / Language:** 日本語 | [English](./README.en.md)

埼玉県への移住を検討している方向けに、必要な情報とAIチャットボットを提供するランディングページです。

---

## 技術スタック

| 技術 | 内容 |
|---|---|
| **HTML** | HTML Living Standard |
| **CSS** | SCSS（Dart Sass CLI でコンパイル） / sanitize.css |
| **JS** | バニラ JavaScript |
| **AI** | Anthropic Claude（チャットボット・近日実装） |

---

## 推奨動作環境

| ブラウザ | 対応 |
|---|---|
| Edge latest | Windows |
| Chrome latest | Windows / Mac |
| Firefox latest | Windows |
| Safari latest | Mac |
| Mobile Safari | iOS 10〜 |
| Chrome | Android 7〜 |

---

## ディレクトリ構成

```
/
├── index.html
├── assets/
│   ├── img/          # 画像（png / jpg / svg / gif）
│   ├── css/
│   │   ├── sanitize.css   # リセットCSS
│   │   └── style.css      # SCSSからコンパイル済み（編集不要）
│   ├── scss/
│   │   └── style.scss     # メインスタイル
│   └── js/
│       ├── plugins.js     # jQueryプラグイン等
│       └── script.js      # メインスクリプト
├── .editorconfig
├── .gitignore
├── README.md
├── README.en.md
└── CHANGELOG.md
```

---

## セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/Hmathews-Yurulica/saitama-iju-navi.git
cd saitama-iju-navi
git checkout develop
```

### 2. エディタ設定

VSCode を使用している場合、拡張機能 **EditorConfig for VS Code** を導入してください。

- プラグインID: `EditorConfig.EditorConfig`

### 3. 依存パッケージのインストール

```bash
npm install
```

### 4. SCSSのコンパイル

**ウォッチモード（開発時）：**

```bash
npm run sass:watch
```

**ワンタイムビルド：**

```bash
npm run sass:build
```

> `assets/css/style.css` は自動生成されます。直接編集しないでください。

### 5. ブラウザで確認

`index.html` をブラウザで直接開くか、VSCode の **Live Server** 拡張機能を使用してください。

---

## レスポンシブ対応

### ブレークポイント

| クラス | 表示条件 |
|---|---|
| `.is-pc` | 992px 以上のみ表示 |
| `.is-pctab` | 541px 以上のみ表示 |
| `.is-tab` | 540px〜991px のみ表示 |
| `.is-tabsp` | 991px 以下のみ表示 |
| `.is-sp` | 540px 以下のみ表示 |

### メディアクエリ（スタイル適用範囲）

| 範囲 | 用途 |
|---|---|
| 992px〜1200px | `aisupport-mascot` / `sec-heading-group` の流動補間 |
| 541px〜991px | タブレット向けレイアウト |
| 〜540px | SP 向けレイアウト |

### FV セクション（PC）

- サイズ: `100vw × 85vh`（最小高さ `698px`）
- 背景・ブロブ: `%` ベースで比率スケール
- ディスクリプション・ボタン: セクション高さに対する `%` で縦位置を流動配置
- 右端要素（さいたまっち・デコ・ラベル）: `right` ベースで右端固定
- マスコット・デコ・ホワイトバー: `bottom` ベースでフロア固定
- デコ要素の z-index: 1（主要コンテンツより背面）、ボタン: z-index 3（最前面）

### スムーズスクロール

CSS `scroll-behavior: smooth` + `scroll-padding-top` でヘッダー高さを考慮したアンカースクロールを実装。JS 不要。

---

## 開発ルール（コーディング規約）

- 既存の共通ファイル（`style.scss`, `script.js`）に直接コードを追記しない
- 機能追加・修正は必ず新規ファイル（例: `_sub.scss` / `sub.js`）を作成する
- クラス名は小文字・ハイフン繋ぎ、略さない（例: `site-header`, `gnav-list`）
- IDはJSで使用する場合のみ可
- アクセシビリティ：JIS X 8341-3:2016 適合レベルAA準拠
  - コントラスト比 4.5:1 以上
  - Tabキーフォーカスを視覚的に表示
  - タッチターゲット 44x44px 以上
- 画像は圧縮してから納品（TinyPNG等）、ファイル名は英小文字・ハイフン繋ぎ
- 提出前に `console.log` やデバッグコードを削除する

---

## Gitブランチ運用（Git Flow）

| ブランチ | 用途 |
|---|---|
| `master` | 本番と同等 |
| `develop` | 開発元（テスト環境と同等） |
| `feature/YYYYMMDD_名前` | 作業ブランチ（developから派生） |
| `feature/modify_課題キー` | バックログ課題対応（developから派生） |
| `hotfix/` | バグフィックス（masterから派生） |
| `release/` | リリース用 |

**作業フロー：**
1. `develop` から作業ブランチを切る
2. コミット・プッシュ後、`develop` へプルリクエスト
3. レビュー・修正・承認後にマージ

---

## 変更履歴

変更の詳細は [CHANGELOG.md](./CHANGELOG.md) を参照してください。
