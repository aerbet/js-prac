const textBlock = document.querySelector('#textBlock');
const userBlock = document.querySelector('#userBlock');

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
    const exitBtn = document.querySelector('#exit');

    saveBtn.addEventListener('click', () => {
        localStorage.setItem(`${userName.value}`, textArea.value);
    })

    if (textArea.value !== null) {
        textArea.value = `${localStorage.getItem(`${userName.value}`)}`;
    }

    if (textArea.value === 'null') {
        textArea.value = '';
    }

    clearBtn.addEventListener('click', () => {
        localStorage.removeItem('text');
        textArea.value = '';
    })
    
    exitBtn.addEventListener('click', () => {
        if (textArea.value !== '' && textArea.value !== null)  {
            localStorage.setItem(`${userName.value}`, textArea.value);
        }
        textBlock.style.visibility = 'none';
        textBlock.style.pointerEvents = 'none';
        textBlock.style.opacity = '0';
        textBlock.style.transform = 'translate(0%, 22%) scale(0.8)';
        userBlock.style.visibility = 'visible';
        userBlock.style.pointerEvents = 'visible';
        userBlock.style.opacity = '1';
        userBlock.style.transform = 'translate(0%, 0%) scale(1)';
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
        userBlock.style.visibility = 'none';
        userBlock.style.pointerEvents = 'none';
        userBlock.style.opacity = '0';
        userBlock.style.transform = 'translate(0%, 22%) scale(0.8)';
    } else {
        textBlock.style.visibility = 'none';
        textBlock.style.pointerEvents = 'none';
        textBlock.style.opacity = '0';
        textBlock.style.transform = 'translate(0%, 22%) scale(0.8)';
    }
})

