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
            // スクロール位置の割合を計算（0〜1）
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
    // 全ての商品のカウントボタンを取得
    const minusButtons = document.querySelectorAll('.product-check-count-minus');
    const plusButtons = document.querySelectorAll('.product-check-count-plus');
    const countNumbers = document.querySelectorAll('.product-check-count-number');

    // 各商品のカウントを管理
    const counts = new Array(countNumbers.length).fill(1);

    // ボタンの色を更新する関数
    function updateButtonColors(index) {
        const count = counts[index];
        const minusButton = minusButtons[index];
        const plusButton = plusButtons[index];

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

    // 各商品にイベントリスナーを設定
    minusButtons.forEach((minusButton, index) => {
        minusButton.addEventListener('click', function() {
            if (counts[index] > 1) {
                counts[index]--;
                countNumbers[index].textContent = counts[index];
                updateButtonColors(index);
            }
        });
    });

    plusButtons.forEach((plusButton, index) => {
        plusButton.addEventListener('click', function() {
            if (counts[index] < 5) {
                counts[index]++;
                countNumbers[index].textContent = counts[index];
                updateButtonColors(index);
            }
        });
    });

    // 初期状態のボタン色を設定
    counts.forEach((_, index) => {
        updateButtonColors(index);
    });
}

// ページ読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', function() {
    syncScroll();
    initializeCount();
});
