// 商品確認画面の初期化
function initializeProductCheck() {
    console.log('productCheck初期化開始');
    
    // localStorageから注文数を取得
    const waterCount = localStorage.getItem('waterCount') || '0';
    const drinkCount = localStorage.getItem('drinkCount') || '0';
    
    console.log(`注文数を読み込み: 水=${waterCount}コ, ドリンクバー=${drinkCount}コ`);
    
    // 水の注文数を表示
    const waterCountElement = document.getElementById('count-number-water');
    if (waterCountElement) {
        waterCountElement.textContent = waterCount;
        console.log(`水の注文数を表示: ${waterCount}コ`);
    } else {
        console.log('水の注文数要素が見つかりません');
    }
    
    // ドリンクバーの注文数を表示
    const drinkCountElement = document.getElementById('count-number-drink');
    if (drinkCountElement) {
        drinkCountElement.textContent = drinkCount;
        console.log(`ドリンクバーの注文数を表示: ${drinkCount}コ`);
    } else {
        console.log('ドリンクバーの注文数要素が見つかりません');
    }
    
    // カウント機能を初期化
    initializeCountFunctions();
}

// カウント機能を初期化
function initializeCountFunctions() {
    // 水のカウント機能
    const waterMinusButton = document.getElementById('minus-button-water');
    const waterPlusButton = document.getElementById('plus-button-water');
    const waterCountElement = document.getElementById('count-number-water');
    
    if (waterMinusButton && waterPlusButton && waterCountElement) {
        let waterCount = parseInt(waterCountElement.textContent) || 0;
        
        waterMinusButton.addEventListener('click', () => {
            if (waterCount > 0) {
                waterCount--;
                waterCountElement.textContent = waterCount;
                localStorage.setItem('waterCount', waterCount);
                console.log(`水の注文数を更新: ${waterCount}コ`);
            }
        });
        
        waterPlusButton.addEventListener('click', () => {
            waterCount++;
            waterCountElement.textContent = waterCount;
            localStorage.setItem('waterCount', waterCount);
            console.log(`水の注文数を更新: ${waterCount}コ`);
        });
    }
    
    // ドリンクバーのカウント機能
    const drinkMinusButton = document.getElementById('minus-button-drink');
    const drinkPlusButton = document.getElementById('plus-button-drink');
    const drinkCountElement = document.getElementById('count-number-drink');
    
    if (drinkMinusButton && drinkPlusButton && drinkCountElement) {
        let drinkCount = parseInt(drinkCountElement.textContent) || 0;
        
        drinkMinusButton.addEventListener('click', () => {
            if (drinkCount > 0) {
                drinkCount--;
                drinkCountElement.textContent = drinkCount;
                localStorage.setItem('drinkCount', drinkCount);
                console.log(`ドリンクバーの注文数を更新: ${drinkCount}コ`);
            }
        });
        
        drinkPlusButton.addEventListener('click', () => {
            drinkCount++;
            drinkCountElement.textContent = drinkCount;
            localStorage.setItem('drinkCount', drinkCount);
            console.log(`ドリンクバーの注文数を更新: ${drinkCount}コ`);
        });
    }
}

// ページ読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded - productCheck初期化');
    initializeProductCheck();
});

// ページが表示されるたびに注文数を更新
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        console.log('ページが表示されました - 注文数を更新');
        initializeProductCheck();
    }
});

// ページがフォーカスされた時にも注文数を更新
window.addEventListener('focus', () => {
    console.log('ページがフォーカスされました - 注文数を更新');
    initializeProductCheck();
});