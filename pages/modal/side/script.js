// サイドページのスクリプト

// 横スクロール同期機能
function syncScroll() {
    const container = document.querySelector('.side-product-list');
    const sideBar = document.querySelector('.side-bar');
    const innerSideBar = document.querySelector('.inner-side-bar');
    
    if (!container || !sideBar || !innerSideBar) return;
    
    // コンテナの横スクロールイベントを監視
    container.addEventListener('scroll', function() {
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        
        // 横スクロール可能な範囲を計算
        const maxScroll = scrollWidth - clientWidth;
        
        if (maxScroll > 0) {
            // スクロール位置の割合を計算（0〜1）
            const scrollRatio = scrollLeft / maxScroll;
            
            // side-barとinner-side-barの幅を取得
            const sideBarWidth = sideBar.offsetWidth;
            const innerSideBarWidth = innerSideBar.offsetWidth;
            
            // inner-side-barの移動可能な範囲を計算（side-barの境界内）
            const moveableRange = sideBarWidth - innerSideBarWidth;
            
            if (moveableRange > 0) {
                // inner-side-barの位置を調整（side-barの境界内に制限）
                const newLeft = Math.min(scrollRatio * moveableRange, moveableRange);
                innerSideBar.style.transform = `translateX(${newLeft}px)`;
            }
        }
    });
    
    // ドラッグ状態の管理
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    
    // サイドバークリックでスクロール位置を変更
    sideBar.addEventListener('click', function(e) {
        if (isDragging) return; // ドラッグ中はクリック処理をスキップ
        
        const rect = sideBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickPercent = clickX / rect.width;
        
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const maxScroll = scrollWidth - clientWidth;
        
        const targetScrollLeft = clickPercent * maxScroll;
        container.scrollLeft = targetScrollLeft;
    });
    
    // マウスダウンでドラッグ開始
    sideBar.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startScrollLeft = container.scrollLeft;
        sideBar.style.cursor = 'grabbing';
        e.preventDefault();
    });
    
    // マウス移動でドラッグ処理
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const rect = sideBar.getBoundingClientRect();
        const deltaPercent = deltaX / rect.width;
        
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const maxScroll = scrollWidth - clientWidth;
        
        const targetScrollLeft = startScrollLeft + (deltaPercent * maxScroll);
        container.scrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScroll));
    });
    
    // マウスアップでドラッグ終了
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            sideBar.style.cursor = 'grab';
        }
    });
}

function touchContents(){
    // side-product-listのすべての子要素divを取得
    const sideProductDivs = document.querySelectorAll('.side-product-list > div');
    
    sideProductDivs.forEach(div => {
        div.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // borderクラスの切り替え
            if (div.classList.contains('border')) {
                div.classList.remove('border');
                console.log('border非表示');
            } else {
                div.classList.add('border');
                console.log('border表示');
            }
        });
    });

    // コンポーネントが読み込まれるまで待機
    setTimeout(() => {
        // ProductListコンポーネントのbutton要素を取得
        const productButtons = document.querySelectorAll('.product-list-container');
        
        productButtons.forEach(button => {
            // 既存のonclick属性を完全に削除
            button.removeAttribute('onclick');
            
            // 新しいクリックイベントを追加
            button.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                // ボタンのスタイル変更処理
                if (button.classList.contains('selected')) {
                    button.classList.remove('selected');
                } else {
                    // 他の選択を解除
                    productButtons.forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                }
                
                return false;
            });
        });
    }, 100); // 100ms待機してから実行
}
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById('overlay');
    if (!overlay) return;
    
    overlay.addEventListener('click', (e) => {
      // 子要素をクリックした時に誤作動させたくなければ以下でガード
      if (e.target !== e.currentTarget) return;

      if (history.length > 1) {
        history.back();
      } else {
        location.href = '/index.html';
      }
    });
  });

document.addEventListener('DOMContentLoaded',()=> {
    syncScroll();
    touchContents
});