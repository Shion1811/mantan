// 商品データを格納する変数
let productData = null;

// JSONファイルを読み込む関数
async function loadProductData() {
    try {
        const response = await fetch('../../../product-data.json');
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

// 現在のカテゴリーを取得する関数
function getCurrentCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'おすすめ';
}

// 商品データを表示する関数
function displayProductData() {
    if (!productData) {
        console.log('商品データが読み込まれていません');
        return;
    }
    
    const currentCategory = getCurrentCategory();
    const products = productData[currentCategory];
    
    if (!products || products.length === 0) {
        console.log(`カテゴリー "${currentCategory}" のデータが見つかりません`);
        return;
    }
    
    // 最初の商品を表示
    const firstProduct = products[0];
    if (firstProduct) {
        setProductImage(firstProduct.image);
        setProductTitle(firstProduct.title);
        setProductPrice(firstProduct.price);
        setAllergyInfo(firstProduct.allergies);
    }
}

// 時間に応じて遷移先を決定する関数
function getTimeBasedRedirect() {
    const now = new Date();
    const currentHour = now.getHours();
    
    console.log(`現在の時刻: ${currentHour}時`);
    
    // 11:00~16:00の場合はconfirmationScreen.html
    if (currentHour >= 11 && currentHour < 16) {
        console.log('11:00~16:00の時間帯 - confirmationScreen.htmlに遷移');
        return '../../../pages/confirmationScreen.html';
    }
    // 16:00~18:00の場合はmodal
    else if (currentHour >= 16 && currentHour < 20) {
        console.log('16:00~18:00の時間帯 - modalに遷移');
        return '../../../pages/modal/set/index.html';
    }
    // その他の時間帯はconfirmationScreen.html（デフォルト）
    else {
        console.log('その他の時間帯 - confirmationScreen.htmlに遷移（デフォルト）');
        return '../../../pages/confirmationScreen.html';
    }
}

async function productClickAction(){
    const productContainer = document.getElementById('product-list-container');
    const side = await fetch('../../../pages/modal/side/index.html');
    const set = await fetch('../../../pages/modal/set/index.html');
    
    // side-product-listが存在する場合のみ処理
    const sideProductList = document.getElementById('side-product-list');
    const setProductList = document.getElementById('set-product-list');
    if (sideProductList) {
        const sideProduct = document.querySelectorAll('#side-product-list > div');
        
        sideProduct.forEach(el => {
            let clickCount = 0; 
            const style = el.style;
            
            el.addEventListener('click',() => {
                clickCount++;
                
                if(clickCount % 2 === 1){
                    style.border = "1.5px solid var(--color-black)";
                    style.width = "289px";
                    style.height = "253px";
                    style.borderRadius = "30px";
                } else {
                    style.border = "none";
                }
            });
        });
    } else if (setProductList) {
        const setProduct = document.querySelectorAll('#set-product-list > div');
        
        setProduct.forEach(el => {
            let clickCount = 0; 
            const style = el.style;
            
            el.addEventListener('click',() => {
                clickCount++;
                
                if(clickCount % 2 === 1){
                    style.border = "1.5px solid var(--color-black)";
                    style.width = "289px";
                    style.height = "253px";
                    style.borderRadius = "30px";
                } else {
                    style.border = "none";
                }
            });
        });
    } else {
        productContainer.addEventListener('click',()=>{
            // 時間に応じて遷移先を決定
            const targetUrl = getTimeBasedRedirect();
            window.location.href = targetUrl;
        });
    }
}

// 画像を動的に変更する関数
function setProductImage(imagePath) {
    const productImage = document.getElementById('product-image');
    if (productImage && imagePath) {
        productImage.src = imagePath;
    }
}

// 商品タイトルを動的に変更する関数
function setProductTitle(title) {
    const titleElement = document.querySelector('.product-list-title-container p');
    if (titleElement && title) {
        titleElement.textContent = title;
    }
}

// 商品価格を動的に変更する関数
function setProductPrice(price) {
    const priceElement = document.querySelector('.product-list-info-container h2');
    if (priceElement && price) {
        priceElement.textContent = price;
    }
}

// アレルギー情報を動的に変更する関数
function setAllergyInfo(allergies) {
    const allergyList = document.querySelector('.product-list-allergy-list');
    if (allergyList && allergies) {
        allergyList.innerHTML = '';
        
        // アレルギー画像のマッピング
        const allergyImageMap = {
            'buckwheat': '../../../images/buckwheat.png',
            'Crab': '../../../images/Crab.png',
            'egg': '../../../images/egg.png',
            'milk': '../../../images/milk.png',
            'peanut': '../../../images/peanut.png',
            'Shrimp': '../../../images/Shrimp.png',
            'walnut': '../../../images/walnut.png',
            'wheat': '../../../images/wheat.png'
        };
        
        allergies.forEach(allergy => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = allergyImageMap[allergy] || `../../../images/${allergy}.png`;
            img.alt = `${allergy}の画像`;
            li.appendChild(img);
            allergyList.appendChild(li);
        });
    }
}

// 初期化処理
async function initializeProductList() {
    try {
        // 現在の時刻を表示（デバッグ用）
        const now = new Date();
        const currentTime = now.toLocaleTimeString('ja-JP');
        console.log(`ProductList読み込み完了 - 現在時刻: ${currentTime}`);
        
        // JSONファイルを読み込み
        await loadProductData();
        
        // 商品データを表示
        displayProductData();
        
        // クリックイベントを設定
        productClickAction();
        
    } catch (error) {
        console.error('ProductList初期化エラー:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeProductList();
});