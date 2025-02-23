const textBlock = document.querySelector('#textBlock');

function openText () {
    setTimeout(() => {
        textBlock.style.visibility = 'visible';
        textBlock.style.pointerEvents = 'visible';
        textBlock.style.opacity = '1';
        textBlock.style.transform = 'translate(0%, 0%) scale(1)';
    }, 22);
    
    const textArea = document.querySelector('#textarea');
    const saveBtn = document.querySelector('#save');
    const clearBtn = document.querySelector('#clear');

    saveBtn.addEventListener('click', () => {
        localStorage.setItem('text', textArea.value);
    })

    if (textArea.value !== null) {
        textArea.value = `${localStorage.getItem('text')}`;
    }

    if (textArea.value === 'null') {
        textArea.value = '';
    }

    clearBtn.addEventListener('click', () => {
        localStorage.removeItem('text');
        textArea.value = '';
    })
}

const userName = document.querySelector('#login');
const loginBtn = document.querySelector('#loginBtn');
const saveBtn = document.querySelector('#saveBtn');
const userArr = JSON.parse(localStorage.getItem('userNames')) || [];

saveBtn.addEventListener('click', () => {
    if (userName.value !== '') {
        userArr.push(userName.value);
        localStorage.setItem('userNames', JSON.stringify(userArr));
    }
});

loginBtn.addEventListener('click', () => {
    let userInfo = JSON.parse(localStorage.getItem('userNames'));

    if (userInfo.includes(userName.value)) {
        openText();
    } else {
        textBlock.style.visibility = 'none';
        textBlock.style.pointerEvents = 'none';
        textBlock.style.opacity = '0';
        textBlock.style.transform = 'translate(0%, 22%) scale(0.8)';
    }
})