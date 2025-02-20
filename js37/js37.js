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
        localStorage.clear();
    })
}

const userName = document.querySelector('#login');
const loginBtn = document.querySelector('#loginBtn');

loginBtn.addEventListener('click', () => {
    let userCount = localStorage.getItem('userCount') || 1;
    
    if (userName.value !== '') {
        userCount++;
        localStorage.setItem('userCount', userCount)
        localStorage.setItem(`user${userCount}`, userName.value)
        
        console.log(localStorage.key(0)) // i'll find out why i'm getting random numbers of localStorage keys
    }
    
    if (userName.value === localStorage.key(0)) {
        openText();
    }
})