const todo = document.querySelector('.todoList');
const done = document.querySelector('.doneList');

const select = document.querySelector('#taskSelect');
const btn = document.querySelector('#submitBtn');
const data = JSON.parse(localStorage.getItem('content')) || {};

btn.addEventListener('click', () => {
  const request = config => {
    
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener('load', function() {
      const response = JSON.parse(this.responseText)
      
      if (this.status >= 200 && this.status < 300) {
        const div = document.createElement('div');
        const div1 = document.createElement('div');
        div.innerHTML = `Task: ${response.activity}`;
        div1.innerHTML = `Category: ${response.type}`;
        todo.appendChild(div1);
        todo.appendChild(div);
        console.log(response);
      }
    });
    
    xhr.open(config.method, config.url);
    xhr.send();
  }
  
  if (select.value === 'random') {
    request({
      method: 'GET',
      url: `https://bored.api.lewagon.com/api/activity`
    })
  } else {
    request({
      method: 'GET',
      url: `https://bored.api.lewagon.com/api/activity?type=${select.value}`
    })
  }
})