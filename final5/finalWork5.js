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
        const content = document.createElement('div');
        content.classList.add('content')
        content.innerHTML = `
          <div class="contentInfo">
            <div>Category: ${response.type}</div>
            <div>Task: ${response.activity}</div>
          </div>
          <div class="contentBtn">
            <button class="doneBtn">Done</button>
            <button class="cancelBtn">Cancel</button>
          </div>
        `
          todo.appendChild(content);

        const doneBtn = content.querySelector('.doneBtn');

        doneBtn.addEventListener('click', () => {
          done.appendChild(content);
        })
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