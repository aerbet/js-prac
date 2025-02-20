function openText () {
    document.querySelector('#textBlock').style.display = 'block';
    const textArea = document.querySelector('#textarea');
    const saveBtn = document.querySelector('#save');
    const clearBtn = document.querySelector('#clear');

    saveBtn.addEventListener('click', (e) => {
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

    clearBtn.addEventListener('click', (e) => {
        localStorage.removeItem('text');
        textArea.value = '';
        localStorage.clear();
    })
}

const userName = document.querySelector('#login');
const loginBtn = document.querySelector('#loginBtn');

loginBtn.addEventListener('click', (e) => {
    if (userName.value !== null && userName.value !== '')  {

        localStorage.setItem('user', userName.value);
        if (localStorage.getItem('user') === '123') {
            openText();
        }
    }
})