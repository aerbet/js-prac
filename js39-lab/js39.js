const content = document.querySelector('#userList');
const input = document.querySelector('#textInput');
const date = document.querySelector('#dateInput');
const select = document.querySelector('#select');
const btn = document.querySelector('#saveBtn');
let postId = 1;
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
        const contentItem = document.createElement('div');
        contentItem.classList.add('content__item');

        contentItem.innerHTML = `
          <div class="contentHeader">
            <div class="contentItems">Post <b>№${postId++}</b></div>
            <div class="contentItems">at <b>${date.value.split('-').reverse().join('.')}</b></div>
            <div class="contentItems flagContent">being in: <b>${select.value}</b>
            <img class="flagImg" src="${response[0].flag}" alt=""></div>
          </div>
          <div class="contentBody">
            <div class="contentItems">${input.value}</div>
          </div>
          <button class="contentBtn">Remove</button>
          `;

        content.appendChild(contentItem);

        const contentBtn = contentItem.querySelector('.contentBtn');

        contentBtn.addEventListener('click', () => {
          contentItem.remove();
        })
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
