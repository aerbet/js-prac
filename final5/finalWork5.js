const todo = document.querySelector('.todoList');
const done = document.querySelector('.doneList');
const point = document.querySelector('#point')
const select = document.querySelector('#taskSelect');
const btn = document.querySelector('#submitBtn');

const data = JSON.parse(localStorage.getItem('data')) || {
  todo: [],
  done: [],
  points: 0,
};

let postId = JSON.parse(localStorage.getItem('postId')) || 0;
let points = data.points;

const saveData = () => {
  localStorage.setItem('data', JSON.stringify(data));
}

const addEvents = (content, contentObj, isDone) => {
  const doneBtn = content.querySelector('.doneBtn');
  const cancelBtn = content.querySelector('.cancelBtn');
  
  doneBtn.addEventListener('click', () => {
    data.todo = data.todo.filter(el => el.id !== contentObj.id)
    data.done.push(contentObj);
    saveData();
    
    data.points++;
    point.innerHTML = `${points}`
    
    content.style.border = '1px solid #8bf199';
    doneBtn.hidden = true;
    cancelBtn.style.background = '#8bf199';
    
    done.appendChild(content);
  });
  
  cancelBtn.addEventListener('click', () => {
    data.done = data.done.filter(el => el.id !== contentObj.id)
    data.todo.push(contentObj);
    saveData();
    
    data.points--;
    point.innerHTML = `${points}`
    
    content.style.border = '1px solid #BFEDEF';
    doneBtn.style.background = '#BFEDEF';
    cancelBtn.style.background = '#BFEDEF';
    doneBtn.hidden = false;
    
    todo.appendChild(content)
  });
  
  if (isDone) {
    content.style.border = '1px solid #8bf199';
    doneBtn.hidden = true;
    cancelBtn.style.background = '#8bf199';
  }
}

const createHtml = (res, isDone = false) => {
  const content = document.createElement('div');
  content.classList.add('content');
  content.innerHTML = `
          <div class="contentInfo">
            <div>Category: ${res.type}</div>
            <div>Task: ${res.activity}</div>
          </div>
          <div class="contentBtn">
            <button class="doneBtn">Done</button>
            <button class="cancelBtn">Cancel</button>
          </div>
        `
  
  if (isDone) {
    done.appendChild(content);
  } else {
    todo.appendChild(content);
  }
  
  addEvents(content, res, isDone)
}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  const request = config => {
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener('load', function() {
      const response = JSON.parse(this.responseText)
      
      if (this.status >= 200 && this.status < 300) {
        const contentObj = {
          activity: `${response.activity}`,
          type: `${response.type}`,
          id: `${postId}`,
        }
        
        createHtml(contentObj);
        
        data.todo.push(contentObj);
        saveData();
        postId++;
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
  data.todo.forEach(item => createHtml(item, false));
  data.done.forEach(item => createHtml(item, true))
}

displayDone();