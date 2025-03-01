
const request = config => {
    const todoBody = document.querySelector('.container')
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
        const response = JSON.parse(xhr.responseText);
        
        
        if (this.status >= 200 && this.status < 300) {
            for (let i = 0; i < response.length - 197; i++) {
                const todos = response[i];
                const todosList = document.createElement('div');
                todosList.classList.add('todosBody');
                
                todosList.innerHTML = `
                    <div class="todosItems id">id: ${todos.id}</div>
                    <div class="todosItems userTitle">title: ${todos.title}</div>
                    <div class="todosItems userStatus">status: ${todos.completed}</div>
                    <button id="todoBtn">Complete</button>
                    `;
                
                todoBody.appendChild(todosList);
                
            }
            const btn = document.querySelector('#todoBtn');
            for (let i = 0; i < response.length; i++) {
                const status = response[i];
                if (status.completed === true) {
                    btn.addEventListener('click', () => {
                        status.completed = true;
                        document.querySelector('.userStatus').style.border = '3px solid green';
                    })
                }
            }
            
        } else {
            console.log(this.errorCode)
        }
    })

    xhr.open(config.method, config.url);
    xhr.send();
}

request({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/todos'
})