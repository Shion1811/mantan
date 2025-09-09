// カウント機能
function initializeCount() {
    // 全ての商品のカウントボタンを取得
    const minusButtons = document.querySelectorAll('.counter-minus');
    const plusButtons = document.querySelectorAll('.counter-plus');
    const countNumbers = document.querySelectorAll('.counter-number');
    const totalPeopleElement = document.getElementById('toral-people');

    // 各商品のカウントを管理
    const counts = new Array(countNumbers.length).fill(0);

    // 合計人数を更新する関数
    function updateTotalPeople() {
        const total = counts.reduce((sum, count) => sum + count, 0);
        if (totalPeopleElement) {
            totalPeopleElement.textContent = total;
        }
        
        // 注文履歴を更新
        updateOrderHistory();
    }
    
    // 注文履歴を更新する関数
    function updateOrderHistory() {
        // 水の注文数（最初のカウント）
        const waterCount = counts[0] || 0;
        // ドリンクバーの注文数（2番目のカウント）
        const drinkCount = counts[1] || 0;
        
        // localStorageに保存
        localStorage.setItem('waterCount', waterCount);
        localStorage.setItem('drinkCount', drinkCount);
        
        console.log(`注文履歴を更新: 水=${waterCount}コ, ドリンクバー=${drinkCount}コ`);
    }

    // ボタンの色を更新する関数
    function updateButtonColors(index) {
        const count = counts[index];
        const minusButton = minusButtons[index];
        const plusButton = plusButtons[index];

        if (count === 0) {
            // 0の時: minusがgray、plusがwhite
            minusButton.style.backgroundColor = 'var(--color-gray)';
            plusButton.style.backgroundColor = 'var(--color-white)';
        } else if (count >= 1 && count <= 9) {
            // 1~9の時: 両方ともwhite
            minusButton.style.backgroundColor = 'var(--color-white)';
            plusButton.style.backgroundColor = 'var(--color-white)';
        } else if (count === 10) {
            // 10の時: minusがwhite、plusがgray
            minusButton.style.backgroundColor = 'var(--color-white)';
            plusButton.style.backgroundColor = 'var(--color-gray)';
        }
    }

    // 各商品にイベントリスナーを設定
    minusButtons.forEach((minusButton, index) => {
        minusButton.addEventListener('click', function() {
            if (counts[index] > 0) {
                counts[index]--;
                countNumbers[index].textContent = counts[index];
                updateButtonColors(index);
                updateTotalPeople();
            }
        });
    });

    plusButtons.forEach((plusButton, index) => {
        plusButton.addEventListener('click', function() {
            if (counts[index] < 10) {
                counts[index]++;
                countNumbers[index].textContent = counts[index];
                updateButtonColors(index);
                updateTotalPeople();
            }
        });
    });

    // 初期状態のボタン色を設定
    counts.forEach((_, index) => {
        updateButtonColors(index);
    });
    
    // 初期合計人数を設定
    updateTotalPeople();
}

// ページ読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeCount();
});