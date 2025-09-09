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
            window.location.href = "../../../index.html";
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
        allergies.forEach(allergy => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = `../../../images/${allergy}.png`;
            img.alt = `${allergy}の画像`;
            li.appendChild(img);
            allergyList.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    productClickAction();

    productClickAction();
});