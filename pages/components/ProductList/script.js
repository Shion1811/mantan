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

document.addEventListener('DOMContentLoaded',()=>{
    productClickAction();

    productClickAction();
});