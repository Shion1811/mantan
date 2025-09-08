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
// ページ読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', function() {
    syncScroll();
    touchContents();
});
