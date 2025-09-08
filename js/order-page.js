// カウント機能
function initializeCount() {
    // 全ての商品のカウントボタンを取得
    const minusButtons = document.querySelectorAll('.counter-minus');
    const plusButtons = document.querySelectorAll('.counter-plus');
    const countNumbers = document.querySelectorAll('.counter-number');

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
            if (counts[index] > 0) {
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
    initializeCount();
});