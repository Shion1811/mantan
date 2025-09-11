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

// 商品データを格納する変数
let productData = null;

// JSONファイルを読み込む関数
async function loadProductData() {
    try {
        const response = await fetch('../product-data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        productData = await response.json();
        console.log('商品データ読み込み成功:', productData);
        return productData;
    } catch (error) {
        console.error('商品データ読み込みエラー:', error);
        return {};
    }
}

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


// 商品データを表示する関数
function displayProducts(category) {
    if (!productData || !productData[category]) {
        console.log(`カテゴリー "${category}" のデータが見つかりません`);
        return;
    }
    
    const products = productData[category];
    const productListContainers = document.querySelectorAll('.product-list');
    
    // 各ページに商品を配置
    productListContainers.forEach((container, pageIndex) => {
        const startIndex = pageIndex * 6; // 1ページに6商品
        const endIndex = Math.min(startIndex + 6, products.length);
        const pageProducts = products.slice(startIndex, endIndex);
        
        // 既存のProductListコンポーネントをクリア
        container.innerHTML = '';
        
        // 商品を追加
        pageProducts.forEach((product, productIndex) => {
            const productElement = createProductElement(product, startIndex + productIndex);
            container.appendChild(productElement);
        });
    });
}

// 商品要素を作成する関数
function createProductElement(product, index) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-list-container';
    productDiv.id = `product-list-container-${index}`;
    productDiv.setAttribute('data-product-index', index);
    
    // アレルギー画像のマッピング
    const allergyImageMap = {
        'buckwheat': '../images/buckwheat.png',
        'Crab': '../images/Crab.png',
        'egg': '../images/egg.png',
        'milk': '../images/milk.png',
        'peanut': '../images/peanut.png',
        'Shrimp': '../images/Shrimp.png',
        'walnut': '../images/walnut.png',
        'wheat': '../images/wheat.png',
        // OptionalAllergiesフォルダの画像
        'almond': '../images/OptionalAllergies/アーモンド.png',
        'abalone': '../images/OptionalAllergies/あわび.png',
        'squid': '../images/OptionalAllergies/いか.png',
        'salmon_roe': '../images/OptionalAllergies/いくら.png',
        'orange': '../images/OptionalAllergies/オレンジ.png',
        'cashew': '../images/OptionalAllergies/カシューナッツ.png',
        'kiwi': '../images/OptionalAllergies/キウイフルーツ.png',
        'sesame': '../images/OptionalAllergies/ごま.png',
        'salmon': '../images/OptionalAllergies/さけ.png',
        'mackerel': '../images/OptionalAllergies/さば.png',
        'gelatin': '../images/OptionalAllergies/ゼラチン.png',
        'banana': '../images/OptionalAllergies/バナナ.png',
        'macadamia': '../images/OptionalAllergies/マカダミアナッツ.png',
        'peach': '../images/OptionalAllergies/もも.png',
        'yam': '../images/OptionalAllergies/やまいも.png',
        'apple': '../images/OptionalAllergies/りんご.png',
        'soybean': '../images/OptionalAllergies/大豆.png',
        'beef': '../images/OptionalAllergies/牛肉.png',
        'pork': '../images/OptionalAllergies/豚肉.png',
        'chicken': '../images/OptionalAllergies/鶏肉.png'
    };
    
    // アレルギー画像のHTMLを生成
    const allergyImages = product.allergies
        .filter(allergy => allergyImageMap[allergy])
        .map(allergy => `<li><img src="${allergyImageMap[allergy]}" alt="${allergy}の画像"></li>`)
        .join('');
    
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-list-title-container">
            <p>${product.title}</p>
        </div>
        <div class="product-list-info-container">
            <div class="product-list-allergy-container">
                <p>アレルギー</p>
                <ul class="product-list-allergy-list">
                    ${allergyImages}
                </ul>
            </div>
            <h2>${product.price}</h2>
        </div>
    `;
    
    return productDiv;
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
    
    // 現在のカテゴリーの商品を表示
    displayProducts(currentCategory);
    
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
    
    orderHistoryParagraphs.forEach((p, index) => {
        // span要素を一時的に保存
        const spanElement = p.querySelector('.order-history-count');
        const spanHTML = spanElement ? spanElement.outerHTML : '';
        
        // spanを除いたテキストのみを取得
        const textContent = p.textContent.replace(/\d+コ/g, '').trim();
        
        if (textContent && textContent.length > 0) {
            // 日本語の文字数で改行（6文字ごと）
            if (textContent.length > 6) {
                const lines = [];
                for (let i = 0; i < textContent.length; i += 6) {
                    lines.push(textContent.slice(i, i + 6));
                }
                
                // 改行されたテキストとspanを組み合わせ
                p.innerHTML = lines.join('<br>') + ' ' + spanHTML;
            }
        }
    });
}

// 注文履歴を更新する関数
function updateOrderHistoryCounts() {
    // localStorageから注文数を取得
    const waterCount = localStorage.getItem('waterCount') || '0';
    const drinkCount = localStorage.getItem('drinkCount') || '0';
    
    // 全ての注文履歴要素を確認
    const allOrderCounts = document.querySelectorAll('.order-history-count');
    allOrderCounts.forEach((element, index) => {
    });
    
    // 水の注文数を更新（最初のdiv内のp要素）
    const waterCountElement = document.querySelector('.order-history-list > div:first-child .order-history-count');
    if (waterCountElement) {
        waterCountElement.textContent = `${waterCount}コ`;
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

// 初期化処理
async function initializeSelectProduct() {
    try {
        // JSONファイルを読み込み
        await loadProductData();
        
        // 商品選択機能を初期化
        selectProduct();
        
        // 注文履歴を更新
        updateOrderHistoryCounts();
        
        // コンポーネントが読み込まれた後にスクロール機能を初期化
        setTimeout(() => {
            initScrollNavigation();
            formatOrderHistoryText();
        }, 1000);
        
    } catch (error) {
        console.error('初期化エラー:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSelectProduct();
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

// ===== ProductList関連の機能 =====

// 時間に応じて遷移先を決定する関数
function getTimeBasedRedirect() {
    const now = new Date();
    const currentHour = now.getHours();
    
    console.log(`現在の時刻: ${currentHour}時`);
    
    // 11:00~16:00の場合はconfirmationScreen.html
    if (currentHour >= 11 && currentHour < 16) {
        console.log('11:00~16:00の時間帯 - confirmationScreen.htmlに遷移');
        return '../pages/confirmationScreen.html';
    }
    // 16:00~18:00の場合はmodal
    else if (currentHour >= 16 && currentHour < 20) {
        console.log('16:00~18:00の時間帯 - modalに遷移');
        return '../pages/modal/side/index.html';
    }
    // その他の時間帯はconfirmationScreen.html（デフォルト）
    else {
        console.log('その他の時間帯 - confirmationScreen.htmlに遷移（デフォルト）');
        return '../pages/confirmationScreen.html';
    }
}

// ProductListのクリックイベントを設定
function setupProductListClickEvents() {
    // コンポーネント読み込み完了後に実行
    setTimeout(() => {
        const productContainers = document.querySelectorAll('.product-list-container');
        
        productContainers.forEach((container, index) => {
            
            container.addEventListener('click', () => {
                console.log(`ProductList ${index + 1} がクリックされました`);
                const targetUrl = getTimeBasedRedirect();
                console.log(`遷移先: ${targetUrl}`);
                window.location.href = targetUrl;
            });
        });
    }, 1000); // コンポーネント読み込みを待つ
}

// ProductListの機能を初期化
document.addEventListener('DOMContentLoaded', () => {
    setupProductListClickEvents();
});