// ジャンルの管理設定
const CATEGORIES = [
    'おすすめ',
    '洋食', 
    '和食',
    '定食',
    'キッズ',
    'デザート',
    'ドリンク',
    'その他'
];

// 現在のジャンルのインデックスを取得
function getCurrentCategoryIndex() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'おすすめ';
    return CATEGORIES.indexOf(category);
}

// 次のジャンルを取得
function getNextCategory() {
    const currentIndex = getCurrentCategoryIndex();
    if (currentIndex >= 0 && currentIndex < CATEGORIES.length - 1) {
        return CATEGORIES[currentIndex + 1];
    }
    return null; // 最後のジャンルの場合
}


function selectProduct() {
    const categoryButtons = document.querySelectorAll('.category-list li');
    
    // URLパラメータから現在のジャンルを取得
    const urlParams = new URLSearchParams(window.location.search);
    const currentCategory = urlParams.get('category') || 'おすすめ';
    
    // 現在のジャンルに対応するボタンをアクティブにする
    categoryButtons.forEach(button => {
        const buttonText = button.querySelector('button').textContent;
        if (buttonText === currentCategory) {
            button.classList.add('active');
            button.style.backgroundColor = 'var(--color-orange)';
        } else {
            button.classList.remove('active');
            button.style.backgroundColor = 'color-mix(in srgb, var(--color-gray), #000000 44%)';
        }
    });
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.querySelector('button').textContent;
            
            // 同じジャンルをクリックした場合は何もしない
            if (buttonText === currentCategory) return;
            
            // 他のジャンルに遷移
            window.location.href = `SelectProduct.html?category=${encodeURIComponent(buttonText)}`;
        });
    });
}

function formatOrderHistoryText() {
    const orderHistoryParagraphs = document.querySelectorAll('.order-history p');
    console.log('Found paragraphs:', orderHistoryParagraphs.length);
    
    orderHistoryParagraphs.forEach((p, index) => {
        // span要素を一時的に保存
        const spanElement = p.querySelector('.order-history-count');
        const spanHTML = spanElement ? spanElement.outerHTML : '';
        
        // spanを除いたテキストのみを取得
        const textContent = p.textContent.replace(/\d+コ/g, '').trim();
        console.log(`Paragraph ${index}: "${textContent}"`);
        
        if (textContent && textContent.length > 0) {
            // 日本語の文字数で改行（6文字ごと）
            if (textContent.length > 6) {
                const lines = [];
                for (let i = 0; i < textContent.length; i += 6) {
                    lines.push(textContent.slice(i, i + 6));
                }
                
                // 改行されたテキストとspanを組み合わせ
                p.innerHTML = lines.join('<br>') + ' ' + spanHTML;
                console.log(`Formatted paragraph ${index}:`, p.innerHTML);
            }
        }
    });
}

// 注文履歴を更新する関数
function updateOrderHistoryCounts() {
    // localStorageから注文数を取得
    const waterCount = localStorage.getItem('waterCount') || '0';
    const drinkCount = localStorage.getItem('drinkCount') || '0';
    
    console.log(`注文履歴を読み込み: 水=${waterCount}コ, ドリンクバー=${drinkCount}コ`);
    
    // 全ての注文履歴要素を確認
    const allOrderCounts = document.querySelectorAll('.order-history-count');
    console.log(`見つかった注文履歴要素数: ${allOrderCounts.length}`);
    allOrderCounts.forEach((element, index) => {
        console.log(`要素${index}: ${element.textContent}`);
    });
    
    // 水の注文数を更新（最初のdiv内のp要素）
    const waterCountElement = document.querySelector('.order-history-list > div:first-child .order-history-count');
    if (waterCountElement) {
        waterCountElement.textContent = `${waterCount}コ`;
        console.log(`水の注文数を更新: ${waterCount}コ`);
    } else {
        console.log('水の注文数要素が見つかりません');
        // 代替方法で検索
        const waterElement = document.querySelector('.order-history-list > div:first-child p');
        if (waterElement) {
            const waterSpan = waterElement.querySelector('.order-history-count');
            if (waterSpan) {
                waterSpan.textContent = `${waterCount}コ`;
                console.log(`代替方法で水の注文数を更新: ${waterCount}コ`);
            }
        }
    }
    
    // ドリンクバーの注文数を更新（2番目のdiv内のp要素）
    const drinkCountElement = document.querySelector('.order-history-list > div:nth-child(2) .order-history-count');
    if (drinkCountElement) {
        drinkCountElement.textContent = `${drinkCount}コ`;
        console.log(`ドリンクバーの注文数を更新: ${drinkCount}コ`);
    } else {
        console.log('ドリンクバーの注文数要素が見つかりません');
        // 代替方法で検索
        const drinkElement = document.querySelector('.order-history-list > div:nth-child(2) p');
        if (drinkElement) {
            const drinkSpan = drinkElement.querySelector('.order-history-count');
            if (drinkSpan) {
                drinkSpan.textContent = `${drinkCount}コ`;
                console.log(`代替方法でドリンクバーの注文数を更新: ${drinkCount}コ`);
            }
        }
    }
}

function initScrollNavigation() {
    const productListAll = document.querySelector('.product-list-all');
    const leftButton = document.querySelector('.scroll-left-button');
    const rightButton = document.querySelector('.scroll-right-button');
    const pageNumber = document.getElementById('pages-number');
    
    if (!productListAll || !leftButton || !rightButton || !pageNumber) return;
    
    let currentPage = 1;
    const totalPages = 4;
    const pageWidth = 987;
    
    
    // ページ番号を更新する関数
    function updatePageNumber() {
        pageNumber.textContent = currentPage;
    }
    
    // ボタンの状態を更新する関数
    function updateButtonStates() {
        leftButton.disabled = currentPage === 1;
        
        // 4ページ目の時は右ボタンを無効化せず、次のページへの遷移を示す
        if (currentPage === totalPages) {
            rightButton.disabled = false;
            rightButton.title = 'SelectProduct.html';
            rightButton.classList.add('next-page');
        } else {
            rightButton.disabled = false;
            rightButton.classList.remove('next-page');
        }
    }
    
    // 指定されたページに移動する関数
    function goToPage(page) {
        if (page < 1 || page > totalPages) return;
        
        currentPage = page;
        const scrollPosition = (page - 1) * pageWidth;
        productListAll.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        updatePageNumber();
        updateButtonStates();
    }
    
    // 左ボタンのクリックイベント
    leftButton.addEventListener('click', () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    });
    
    // 右ボタンのクリックイベント
    rightButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        } else if (currentPage === totalPages) {
            // 4ページ目の時は次のジャンルに遷移
            const nextCategory = getNextCategory();
            if (nextCategory) {
                // 次のジャンルに遷移
                window.location.href = `SelectProduct.html?category=${encodeURIComponent(nextCategory)}`;
            } else {
                // 最後のジャンルの場合は確認画面に遷移
                window.location.href = 'confirmationScreen.html';
            }
        }
    });
    
    // スクロールイベントでページ番号を更新
    productListAll.addEventListener('scroll', () => {
        const scrollLeft = productListAll.scrollLeft;
        const newPage = Math.round(scrollLeft / pageWidth) + 1;
        
        if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
            currentPage = newPage;
            updatePageNumber();
        updateButtonStates();
        }
    });
    // 初期ページ番号を設定
    updatePageNumber();
}

document.addEventListener('DOMContentLoaded', () => {
    selectProduct();
    // 注文履歴を更新
    updateOrderHistoryCounts();
    
    // コンポーネントが読み込まれた後にスクロール機能を初期化
    setTimeout(() => {
        initScrollNavigation();
        formatOrderHistoryText();
    }, 1000);
});

// ページが表示されるたびに注文履歴を更新
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        updateOrderHistoryCounts();
    }
});

// ページがフォーカスされた時にも注文履歴を更新
window.addEventListener('focus', () => {
    updateOrderHistoryCounts();
});