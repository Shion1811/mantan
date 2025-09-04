// SelectProductファイルの管理設定
const SELECT_PRODUCT_FILES = [
    'SelectProduct.html',      // 現在のファイル
    // ここに追加したページを追加
    // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
];

// 現在のファイルのインデックスを取得
function getCurrentFileIndex() {
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop();
    return SELECT_PRODUCT_FILES.indexOf(fileName);
}

// 次のSelectProductファイルを取得
function getNextSelectProductFile() {
    const currentIndex = getCurrentFileIndex();
    if (currentIndex >= 0 && currentIndex < SELECT_PRODUCT_FILES.length - 1) {
        return SELECT_PRODUCT_FILES[currentIndex + 1];
    }
    return null; // 最後のファイルの場合
}

function selectProduct() {
    const categoryButtons = document.querySelectorAll('.category-list li');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 他のボタンからactiveクラスを削除し、グレー色に戻す
            categoryButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.classList.remove('active');
                    otherButton.style.backgroundColor = 'color-mix(in srgb, var(--color-gray), #000000 44%)';
                }else {
                    button.classList.add('active');
                    button.style.backgroundColor = 'var(--color-orange)';
                }
            });
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

function initScrollNavigation() {
    const productListAll = document.querySelector('.product-list-all');
    const leftButton = document.querySelector('.scroll-left-button');
    const rightButton = document.querySelector('.scroll-right-button');
    const pageNumber = document.getElementById('pages-number');
    
    if (!productListAll || !leftButton || !rightButton || !pageNumber) return;
    
    let currentPage = 1;
    const totalPages = 4;
    const pageWidth = 987;
    
    // 次のSelectProductファイルの設定（将来の拡張用）
    const nextSelectProductFile = getNextSelectProductFile();
    const currentFileIndex = getCurrentFileIndex();
    
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
            // 4ページ目の時は次のSelectProductファイルに遷移
            if (nextSelectProductFile) {
                window.location.href = nextSelectProductFile;
            } else {
                // 最後のSelectProductファイルの場合は確認画面に遷移
                window.location.href = 'SelectProduct.html';
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
    // コンポーネントが読み込まれた後にスクロール機能を初期化
    setTimeout(() => {
        initScrollNavigation();
        formatOrderHistoryText();
    }, 1000);
});