// サイドページのスクリプト

// 横スクロール同期機能
function syncScroll() {
    const container = document.querySelector('.set-product-list');
    const setBar = document.querySelector('.set-bar');
    const innerSetBar = document.querySelector('.inner-set-bar');
    
    if (!container || !setBar || !innerSetBar) return;
    
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
            const setBarWidth = setBar.offsetWidth;
            const innerSetBarWidth = innerSetBar.offsetWidth;
            
            // inner-side-barの移動可能な範囲を計算（side-barの境界内）
            const moveableRange = setBarWidth - innerSetBarWidth;
            
            if (moveableRange > 0) {
                // inner-side-barの位置を調整（side-barの境界内に制限）
                const newLeft = Math.min(scrollRatio * moveableRange, moveableRange);
                innerSetBar.style.transform = `translateX(${newLeft}px)`;
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById('overlay');
    if (!overlay) return;
    
    overlay.addEventListener('click', (e) => {
      // 子要素をクリックした時に誤作動させたくなければ以下でガード
      if (e.target !== e.currentTarget) return;

      if (history.length > 1) {
        history.go(-2);
      } else {
        location.href = '/index.html';
      }
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    syncScroll();
});
