// 商品確認画面のスクリプト

// スクロール同期機能
function syncScroll() {
    const container = document.querySelector('.product-check-container');
    const innerSideBar = document.querySelector('.inner-side-bar');
    const sideBar = document.querySelector('.side-bar');
    
    if (!container || !innerSideBar || !sideBar) return;
    
    // コンテナのスクロールイベントを監視
    container.addEventListener('scroll', function() {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        
        // スクロール可能な範囲を計算
        const maxScroll = scrollHeight - clientHeight;
        
        if (maxScroll > 0) {
            // スクロール位置の割合を計算
            const scrollRatio = scrollTop / maxScroll;
            
            // side-barの高さを取得
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
}

// カウント機能
function initializeCount() {
    const minusButton = document.getElementById('minus-button');
    const plusButton = document.getElementById('plus-button');
    const countNumber = document.getElementById('count-number');
    
    let count = 1;
    
    minusButton.addEventListener('click', function() {
        if (count > 1) {
            count--;
            countNumber.textContent = count;
        }
    });
    
    plusButton.addEventListener('click', function() {
        count++;
        countNumber.textContent = count;
    });
}

// ページ読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', function() {
    syncScroll();
    initializeCount();
});