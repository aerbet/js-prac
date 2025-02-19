const textArea = document.querySelector('#textarea');
const saveBtn = document.querySelector('#save');
const clearBtn = document.querySelector('#clear');

saveBtn.addEventListener('click', (e) => {
    localStorage.setItem('text', textArea.value);
    console.log(textArea.value)
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