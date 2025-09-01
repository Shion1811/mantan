// 商品確認画面のスクリプト

// スクロール同期機能
function syncScroll() {
    const container = document.querySelector('.product-check-container');
    const innerSideBar = document.querySelector('.inner-side-bar');
    
    if (!container || !innerSideBar) return;
    
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
            
            // inner-side-barの高さを取得
            const innerSideBarHeight = innerSideBar.offsetHeight;
            const containerHeight = container.offsetHeight;
            
            // inner-side-barの移動可能な範囲を計算
            const moveableRange = containerHeight - innerSideBarHeight;
            
            if (moveableRange > 0) {
                // inner-side-barの位置を調整
                const newTop = scrollRatio * moveableRange;
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
    
    // ボタンの色を更新する関数
    function updateButtonColors() {
        if (count === 1) {
            // 1の時: minusがgray、plusがwhite
            minusButton.style.backgroundColor = 'var(--color-gray)';
            plusButton.style.backgroundColor = 'var(--color-white)';
        } else if (count >= 2 && count <= 4) {
            // 2~4の時: 両方ともwhite
            minusButton.style.backgroundColor = 'var(--color-white)';
            plusButton.style.backgroundColor = 'var(--color-white)';
        } else if (count === 5) {
            // 5の時: 1の色を反対（minusがwhite、plusがgray）
            minusButton.style.backgroundColor = 'var(--color-white)';
            plusButton.style.backgroundColor = 'var(--color-gray)';
        }
    }
    
    minusButton.addEventListener('click', function() {
        if (count > 1) {
            count--;
            countNumber.textContent = count;
            updateButtonColors();
        }
    });
    
    plusButton.addEventListener('click', function() {
        if (count < 5) {
            count++;
            countNumber.textContent = count;
            updateButtonColors();
        }
    });
    
    // 初期状態のボタン色を設定
    updateButtonColors();
}

// ページ読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', function() {
    syncScroll();
    initializeCount();
});