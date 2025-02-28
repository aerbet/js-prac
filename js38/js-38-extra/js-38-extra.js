
const request = config => {
    const todoBody = document.querySelector('.container')
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
        const response = JSON.parse(xhr.responseText);

        if (this.status >= 200 && this.status < 300) {
            for (let i = 0; i < response.length - 199; i++) {
                const todos = response[i];
                const todosList = document.createElement('div');

                todosList.innerHTML = `
                    <div class="id">id: ${todos.id}</div>
                    <div class="userTitle">title: ${todos.title}</div>
                    <div class="userStatus">status: ${todos.completed}</div>
                    `;

                todoBody.appendChild(todosList);
            }

            const btn = document.querySelector('#todoBtn');
            btn.addEventListener('click', () => {
                document.querySelector('.userStatus').style.border = '3px solid green';
                document.querySelector('.userStatus').innerHTML = 'status: true';
            })
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