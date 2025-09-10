function buttonYesAction(){
    const yesButton = document.getElementById('button-yes');
    const noButton = document.getElementById('button-no');

    yesButton.addEventListener('click',()=>{
        // 仮でindex.htmlに飛ぶようにしている
        window.location.href = '/pages/components/SelectProduct/index.html';
    });
    noButton.addEventListener('click',()=>{
        window.location.href = 'productCheck.html';
    });
}

document.addEventListener('DOMContentLoaded',()=>{
    buttonYesAction();
});