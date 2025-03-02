
const request = config => {
    const todoBody = document.querySelector('.todo')
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
        const response = JSON.parse(xhr.responseText);

        if (this.status >= 200 && this.status < 300) {
            for (let i = 0; i < response.length - 197; i++) {
                const todos = response[i];
                const todosList = document.createElement('div');
                todosList.classList.add('todosBody');
                
                todosList.innerHTML = `
                    <div class="todosItems id">${todos.id}</div>
                    <div class="todosItems userTitle">${todos.title}</div>
                    <div class="todosItems userStatus">in progress</div>
                    <button class="todoBtn">Complete</button>
                    `;
                
                todoBody.appendChild(todosList);

                const btn = todosList.querySelector('.todoBtn');

                btn.addEventListener('click', () => {
                    if (todos.completed !== true) {
                        todos.completed = true;
                        todosList.querySelector('.userStatus').innerHTML = 'completed';
                        todosList.querySelector('.userStatus').style.background = '#8CB369';
                    } else {
                        todos.completed = false;
                        todosList.querySelector('.userStatus').innerHTML = 'in progress';
                        todosList.querySelector('.userStatus').style.background = '';
                    }
                })
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