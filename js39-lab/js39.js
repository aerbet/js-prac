const content = document.querySelector('#userList');
const text = document.querySelector('#textArea');
const date = document.querySelector('#dateInput');
const select = document.querySelector('#select');
const btn = document.querySelector('#saveBtn');
let postId = JSON.parse(localStorage.getItem('postId')) || 1;
const postArr = [];

const request = config => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function () {
    const response = JSON.parse(xhr.responseText);

    if (this.status >= 200 && this.status < 300) {
      for (let i = 0; i < response.length; i++) {
        const option = document.createElement('option');

        option.textContent = `${response[i].name}`;

        select.appendChild(option);
      }
      const parsed = JSON.parse(localStorage.getItem('content')) || [];
      
      if (localStorage.getItem('content')) {
        parsed.forEach((item) => {
          const contentItem = document.createElement('div');
          contentItem.classList.add('content__item');

          contentItem.innerHTML = `
          <div class="contentHeader">
            <div class="contentItems" data-id="${item.id}">Post <b>№${item.id}</b></div>
            <div class="contentItems">at <b>${item.date.split('-').reverse().join('.')}</b></div>
            <div class="contentItems flagContent">being in: <b>${item.country}</b>
            <img class="flagImg" src="${item.flag}" alt=""></div>
            <button class="contentBtn">✖</button>
          </div>
          <div class="contentBody">
            <div class="contentItems">${item.text}</div>
          </div>
          `;

          content.appendChild(contentItem);
          
          const contentBtn = contentItem.querySelector('.contentBtn');

          contentBtn.addEventListener('click', () => {
            let parsed = JSON.parse(localStorage.getItem('content')) || [];
            parsed = parsed.filter(el => el.id !== item.id);
            localStorage.setItem('content', JSON.stringify(parsed));
            postId--;
            localStorage.setItem('postId', JSON.stringify(postId));
            contentItem.remove();
          });
        })
      }
    } else {
      config.error(this.status)
    }
  });

  xhr.addEventListener('error', () => console.log('No Internet'));
  xhr.addEventListener('timeout', () => console.log('Timeout'));

  xhr.open(config.method, config.url);
  xhr.send();
}

request({
  method: 'GET',
  url: `https://restcountries.com/v2/all?fields=name,flag`,
  error: message => {
    alert(`Error ${message}`);
  },
});

btn.addEventListener('click', (e) => {
  e.preventDefault();
  const request = config => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      const response = JSON.parse(xhr.responseText);

      if (this.status >= 200 && this.status < 300) {
        const contentObj = {
          id: postId,
          date: date.value,
          country: select.value,
          flag: response[0].flag,
          text: text.value,
        }

        const parsed = JSON.parse(localStorage.getItem('content')) || [];
        parsed.push(contentObj);

        localStorage.setItem('content', JSON.stringify(parsed));
        postId++;
        localStorage.setItem('postId', JSON.stringify(postId));

        const contentItem = document.createElement('div');
        contentItem.classList.add('content__item');

        contentItem.innerHTML = `
          <div class="contentHeader">
            <div class="contentItems" data-id="${contentObj.id}">Post <b>№${contentObj.id}</b></div>
            <div class="contentItems">at <b>${date.value.split('-').reverse().join('.')}</b></div>
            <div class="contentItems flagContent">being in: <b>${select.value}</b>
            <img class="flagImg" src="${response[0].flag}" alt=""></div>
            <button class="contentBtn">✖</button>
          </div>
          <div class="contentBody">
            <div class="contentItems">${text.value}</div>
          </div>
          `;

        content.appendChild(contentItem);
        text.value = '';

        const contentBtn = contentItem.querySelector('.contentBtn');
        contentBtn.addEventListener('click', () => {
          let parsed = JSON.parse(localStorage.getItem('content')) || [];
          parsed = parsed.filter(el => el.id !== contentObj.id);
          localStorage.setItem('content', JSON.stringify(parsed));
          postId--;
          localStorage.setItem('postId', JSON.stringify(postId));
          contentItem.remove();
        });
      } else {
        config.error(this.status)
      }
    });

    xhr.addEventListener('error', () => console.log('No Internet'));
    xhr.addEventListener('timeout', () => console.log('Timeout'));

    xhr.open(config.method, config.url);
    xhr.send();
  }

  request({
    method: 'GET',
    url: `https://restcountries.com/v2/name/${select.value}`,
    error: message => {
      alert(`Error ${message}`);
    },
  });
});