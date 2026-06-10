# 住むなら埼玉

**言語 / Language:** 日本語 | [English](./README.en.md)

埼玉県への移住を検討している方向けに、必要な情報とAIチャットボットを提供するランディングページです。

---

## 技術スタック

| 技術 | 内容 |
|---|---|
| **HTML** | HTML Living Standard |
| **CSS** | SCSS（Live Sass Compiler でコンパイル） / sanitize.css |
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

### 3. SCSSのコンパイル

拡張機能 **Live Sass Compiler** を使用してください。

`settings.json` に以下を追加してください：

```json
"liveSassCompile.settings.formats": [
  {
    "extensionName": ".css",
    "savePath": "~/../css",
    "savePathReplacementPairs": null
  }
],
"liveSassCompile.settings.excludeList": [
  "/wp-admin/**"
]
```

### 4. ブラウザで確認

`index.html` をブラウザで直接開くか、VSCode の **Live Server** 拡張機能を使用してください。

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
