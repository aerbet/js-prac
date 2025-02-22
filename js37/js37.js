function openText () {
    document.querySelector('#textBlock').style.display = 'block';
    const textArea = document.querySelector('#textarea');
    const saveBtn = document.querySelector('#save');
    const clearBtn = document.querySelector('#clear');

    saveBtn.addEventListener('click', () => {
        localStorage.setItem('text', textArea.value);
        const table = document.createElement('li');
        table.innerHTML = `${textArea.value}`;
        document.body.appendChild(table);
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
        userArr.push(userName.value)
        localStorage.setItem('userNames', JSON.stringify(userArr));
    }
});

loginBtn.addEventListener('click', () => {
    let userInfo = JSON.parse(localStorage.getItem('userNames'));

    if (userInfo.includes(userName.value)) {
        openText();
    } else {
        document.querySelector('#textBlock').style.display = 'none';
    }
})