const todo = document.querySelector('.todoList');
const done = document.querySelector('.doneList');
const point = document.querySelector('#point')
const select = document.querySelector('#taskSelect');
const btn = document.querySelector('#submitBtn');
const data = JSON.parse(localStorage.getItem('data')) || [];


let postId = localStorage.getItem('postId') || 0;
let points = 0;
point.innerHTML = `${points}`;

btn.addEventListener('click', (e) => {
  e.preventDefault();
  
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
          points++;
          point.innerHTML = `${points}`
          
          const contentObj = {
            activity: `${response.activity}`,
            type: `${response.type}`,
            id: `${postId}`,
          }
          
          const doneData = JSON.parse(localStorage.getItem('done')) || [];
          doneData.push(contentObj)
          
          localStorage.setItem('done', JSON.stringify(doneData));
          postId++;
          localStorage.setItem('postId', JSON.stringify(postId));
          
          const parsedTodo = JSON.parse(localStorage.getItem('todo')) || [];
          parsedTodo.forEach(item => {
            const parsed = parsedTodo.filter(e => e.id !== item.id);
            localStorage.setItem('todo', JSON.stringify(parsed));
            postId--;
            localStorage.setItem('postId', JSON.stringify(postId));
          })
          
          content.style.border = '1px solid #8bf199';
          doneBtn.hidden = true;
          cancelBtn.style.background = '#8bf199';
          done.appendChild(content);
        });

        cancelBtn.addEventListener('click', () => {
          const contentObj = {
            activity: `${response.activity}`,
            type: `${response.type}`,
            id: `${postId}`,
          }
          
          const todoData = JSON.parse(localStorage.getItem('todo')) || [];
          todoData.push(contentObj)
          
          localStorage.setItem('todo', JSON.stringify(todoData));
          postId++;
          localStorage.setItem('postId', JSON.stringify(postId));
          
          const parsedDone = JSON.parse(localStorage.getItem('done')) || [];
          parsedDone.forEach(item => {
            const parsed = parsedDone.filter(e => e.id !== item.id);
            localStorage.setItem('done', JSON.stringify(parsed));
            postId--;
            localStorage.setItem('postId', JSON.stringify(postId));
          })
          
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
});

function displayDone() {
  const parsedDone = JSON.parse(localStorage.getItem('done')) || [];
  
  parsedDone.forEach(item => {
    const content = document.createElement('div');
    content.classList.add('content')
    content.innerHTML = `
          <div class="contentInfo">
            <div>Category: ${item.type}</div>
            <div>Task: ${item.activity}</div>
          </div>
          <div class="contentBtn">
            <button class="doneBtn">Done</button>
            <button class="cancelBtn">Cancel</button>
          </div>
        `
    
    const doneBtn = content.querySelector('.doneBtn');
    const cancelBtn = content.querySelector('.cancelBtn');
    
    content.style.border = '1px solid #8bf199';
    doneBtn.hidden = true;
    cancelBtn.style.background = '#8bf199';
    done.appendChild(content);
    
    doneBtn.addEventListener('click', () => {
      const doneData = JSON.parse(localStorage.getItem('done')) || [];
      parsedDone.forEach(item => {
        doneData.push(item);
      })
      
      localStorage.setItem('done', JSON.stringify(doneData));
      postId++;
      localStorage.setItem('postId', JSON.stringify(postId));
      
      const parsedTodo = JSON.parse(localStorage.getItem('todo')) || [];
      parsedTodo.forEach(item => {
        const parsed = parsedTodo.filter(e => e.id !== item.id);
        localStorage.setItem('todo', JSON.stringify(parsed));
        postId--;
        localStorage.setItem('postId', JSON.stringify(postId));
      })
      
      content.style.border = '1px solid #8bf199';
      doneBtn.hidden = true;
      cancelBtn.style.background = '#8bf199';
      done.appendChild(content);
    });
    
    cancelBtn.addEventListener('click', () => {
      const todoData = JSON.parse(localStorage.getItem('todo')) || [];
      parsedDone.forEach(item => {
        todoData.push(item);
      })
      
      localStorage.setItem('todo', JSON.stringify(todoData));
      postId++;
      localStorage.setItem('postId', JSON.stringify(postId));
      
      const parsed = parsedDone.filter(e => e.id !== item.id);
      localStorage.setItem('done', JSON.stringify(parsed));
      
      content.style.border = '1px solid #BFEDEF';
      doneBtn.style.background = '#BFEDEF';
      cancelBtn.style.background = '#BFEDEF';
      doneBtn.hidden = false;
      todo.appendChild(content);
    });
  })
}

displayDone();