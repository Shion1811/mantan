// 縦スクロール同期機能
function syncScroll() {
    const container = document.querySelector('.order-history-list');
    const sideBar = document.querySelector('.side-bar');
    const innerSideBar = document.querySelector('.inner-side-bar');
    
    if (!container || !sideBar || !innerSideBar) return;
    
    // 初期化時にサイドバーの高さを設定
    function initializeSideBar() {
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        const sideBarHeight = sideBar.offsetHeight;
        
        if (scrollHeight > clientHeight) {
            // スクロールが必要な場合
            const scrollbarHeight = (clientHeight / scrollHeight) * sideBarHeight;
            innerSideBar.style.height = scrollbarHeight + 'px';
            sideBar.style.display = 'block';
        } else {
            // スクロールが不要な場合
            sideBar.style.display = 'none';
        }
    }
    
    // コンテナの縦スクロールイベントを監視
    container.addEventListener('scroll', function() {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        
        // 縦スクロール可能な範囲を計算
        const maxScroll = scrollHeight - clientHeight;
        
        if (maxScroll > 0) {
            // スクロール位置の割合を計算（0〜1）
            const scrollRatio = scrollTop / maxScroll;
            
            // side-barとinner-side-barの高さを取得
            const sideBarHeight = sideBar.offsetHeight;
            const innerSideBarHeight = innerSideBar.offsetHeight;
            
            // inner-side-barの移動可能な範囲を計算（side-barの境界内）
            const moveableRange = sideBarHeight - innerSideBarHeight;
            
            if (moveableRange > 0) {
                // inner-side-barの位置を調整（side-barの境界内に制限）
                const newTop = Math.min(scrollRatio * moveableRange, moveableRange);
                innerSideBar.style.transform = `translateY(${newTop}px)`;
            }
        }
    });
    
    // サイドバークリックでスクロール位置を変更
    sideBar.addEventListener('click', function(e) {
        const rect = sideBar.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const clickPercent = clickY / rect.height;
        
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        const maxScroll = scrollHeight - clientHeight;
        
        const targetScrollTop = clickPercent * maxScroll;
        container.scrollTop = targetScrollTop;
    });
    
    // 初期化
    initializeSideBar();
    
    // ウィンドウリサイズ時に再初期化
    window.addEventListener('resize', function() {
        setTimeout(initializeSideBar, 100);
    });
}

// 戻るボタンのクリック処理
function handleBackClick(button) {
    const container = button.closest('[data-href]');
    if (container && container.dataset.href) {
        // data-hrefが指定されている場合はそのページに遷移
        window.location.href = container.dataset.href;
    } else {
        // data-hrefが指定されていない場合は履歴を戻る
        history.back();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    syncScroll();
});