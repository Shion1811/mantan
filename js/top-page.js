document.addEventListener('DOMContentLoaded' , () => {
    const langButtons = document.querySelectorAll('.others-langu');
    langButtons.forEach(lang => {
        lang.addEventListener('click' , () => {
            // reset button
            langButtons.forEach(elem => {
                elem.style.backgroundColor = '#d9d9d9';
                elem.style.color = '#000';
            });
            // セレクトされたボタンの背景を変更
            lang.style.backgroundColor = '#ff8438';
            lang.style.color = '#fff';
        })
    })
})