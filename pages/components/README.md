# コンポーネントシステム 使用方法

## 基本的な使い方

### 1. コンポーネントを読み込む
```html
<div data-include="components/使用するコンポーネントディレクトリ/index.html"></div>
<!-- 例 -->
 <div data-include="components/ColeClerk/index.html"></div>
```

### 2. スクリプトを読み込む
```html
<script src="components/component-loader.js"></script>
```

## コンポーネントの作成

### ディレクトリ構造
```
pages/components/
├── ComponentName/
│   ├── index.html      ← HTMLファイル
│   └── style.css       ← CSSファイル
└── component-loader.js
```

## 自動処理される内容

- ✅ HTMLファイルの自動挿入
- ✅ CSSファイルの自動読み込み
- ✅ 重複読み込みの防止
- ✅ エラーハンドリング

## 注意事項

1. **ファイル名固定**: `index.html`と`style.css`
3. **パスは正確に**: `data-include`のパスを正確に指定

## トラブルシューティング

問題が発生した場合は、ブラウザのコンソールでログを確認してください。
