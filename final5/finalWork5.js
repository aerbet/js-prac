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
        const cancelBtn = content.querySelector('.cancelBtn');

        doneBtn.addEventListener('click', () => {
          content.style.border = '1px solid #8bf199';
          doneBtn.hidden = true;
          cancelBtn.style.background = '#8bf199';
          done.appendChild(content);
        });

        cancelBtn.addEventListener('click', () => {
          content.style.border = '1px solid #BFEDEF';
          doneBtn.style.background = '#BFEDEF';
          cancelBtn.style.background = '#BFEDEF';
          doneBtn.hidden = false;
          todo.appendChild(content);
        });
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