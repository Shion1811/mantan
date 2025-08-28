/**
 * ファイルだけで動作するコンポーネント読み込みスクリプト
 * 
 * 使用方法:
 * 1. HTMLファイルで <div data-include="path/to/component.html"></div> と記述
 * 2. このスクリプトが自動的にHTMLとCSSを読み込んで挿入
 * 
 * 例:
 * <div data-include="pages/components/ColeClerk/index.html"></div>
 */

(function() {
    'use strict';
    
    // デバッグモード（コンソールにログを表示）
    const DEBUG = true;
    
    function log(message) {
        if (DEBUG) {
            console.log('[ComponentLoader]', message);
        }
    }
    
    function error(message) {
        console.error('[ComponentLoader]', message);
    }
    
    /**
     * CSSファイルを読み込む
     */
    function loadCSS(cssUrl) {
        log(`CSS読み込み開始: ${cssUrl}`);
        
        // 既に読み込まれているかチェック
        const existingLink = document.querySelector(`link[href="${cssUrl}"]`);
        if (existingLink) {
            log(`CSSは既に読み込み済み: ${cssUrl}`);
            return;
        }
        
        // 新しいlink要素を作成
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssUrl;
        link.type = 'text/css';
        
        // 読み込み成功時の処理
        link.onload = function() {
            log(`CSS読み込み完了: ${cssUrl}`);
        };
        
        // 読み込み失敗時の処理
        link.onerror = function() {
            error(`CSS読み込み失敗: ${cssUrl}`);
            // 失敗時の詳細情報
            console.error(`CSS読み込み失敗の詳細:`, {
                url: cssUrl,
                currentPath: window.location.pathname,
                href: link.href,
                absoluteUrl: new URL(cssUrl, window.location.href).href
            });
        };
        
        // headに追加
        document.head.appendChild(link);
        log(`CSSをheadに追加: ${cssUrl}`);
        
        // 追加後の確認
        setTimeout(() => {
            const addedLink = document.querySelector(`link[href="${cssUrl}"]`);
            if (addedLink) {
                log(`CSS要素が正常に追加されました: ${cssUrl}`);
            } else {
                error(`CSS要素の追加に失敗: ${cssUrl}`);
            }
        }, 100);
    }
    
    /**
     * HTMLファイルを直接読み込む（fetchを使わない）
     */
    function loadHTMLFile(htmlUrl, callback) {
        // 相対パスを絶対パスに変換
        const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
        const fullPath = basePath + '/' + htmlUrl;
        
        // XMLHttpRequestを使用（file://でも動作する場合がある）
        const xhr = new XMLHttpRequest();
        xhr.open('GET', htmlUrl, true);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`), null);
                }
            }
        };
        
        xhr.onerror = function() {
            callback(new Error('ネットワークエラー'), null);
        };
        
        xhr.send();
    }
    
    /**
     * 単一のコンポーネントを読み込む
     */
    function loadComponent(slot) {
        const htmlUrl = slot.getAttribute('data-include');
        if (!htmlUrl) {
            error('data-include属性が設定されていません');
            return;
        }
        
        log(`コンポーネント読み込み開始: ${htmlUrl}`);
        
        // HTMLファイルを読み込み
        loadHTMLFile(htmlUrl, function(err, htmlContent) {
            if (err) {
                error(`コンポーネント読み込みエラー: ${htmlUrl} - ${err.message}`);
                slot.innerHTML = `<!-- 読み込みエラー: ${htmlUrl} -->`;
                return;
            }
            
            // HTMLを挿入
            slot.innerHTML = htmlContent;
            log(`HTML挿入完了: ${htmlContent.length}文字`);
            
            // 対応するCSSファイルを自動読み込み
            // 絶対パスベースで正確なパスを生成
            let cssUrl;
            
            // 現在のページのパスを取得
            const currentPath = window.location.pathname;
            log(`現在のページパス: ${currentPath}`);
            
            if (htmlUrl.startsWith('components/')) {
                // 現在のページが /pages/productCheck.html の場合
                // 絶対パスベースで正しいCSSパスを生成
                const baseDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
                cssUrl = baseDir + '/' + htmlUrl.replace(/\/index\.html?$/i, '/style.css');
            } else {
                // その他の場合は従来の方法
                cssUrl = htmlUrl.replace(/\/index\.html?$/i, '/style.css');
            }
            
            log(`生成されたCSSパス: ${cssUrl}`);
            log(`最終的なCSSパス: ${cssUrl}`);
            
            loadCSS(cssUrl);
        });
    }
    
    /**
     * 全てのコンポーネントを読み込む
     */
    function loadAllComponents() {
        log('コンポーネント読み込み開始');
        
        const slots = document.querySelectorAll('[data-include]');
        log(`読み込み対象: ${slots.length}件`);
        
        if (slots.length === 0) {
            log('読み込み対象のコンポーネントが見つかりません');
            return;
        }
        
        // 各スロットに対してコンポーネントを読み込み
        for (let i = 0; i < slots.length; i++) {
            loadComponent(slots[i]);
        }
        
        log('全てのコンポーネント読み込み完了');
    }
    
    // DOMの準備ができたら実行
    if (document.readyState === 'loading') {
        // DOMがまだ読み込み中
        document.addEventListener('DOMContentLoaded', loadAllComponents);
        log('DOMContentLoadedイベントを待機中');
    } else {
        // DOMが既に読み込み完了
        loadAllComponents();
        log('DOM既に完了、即座に実行');
    }
    
})();
