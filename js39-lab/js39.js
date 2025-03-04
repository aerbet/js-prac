const content = document.querySelector('.content');
const input = document.querySelector('#textInput');
const date = document.querySelector('#dateInput');
const btn = document.querySelector('#saveBtn');
let postId = 1;

const request = config => {
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load', function () {
    const response = JSON.parse(xhr.responseText);
    console.log(response.length)
    for (let i = 0; i < response.length; i++) {
      let country = response[i];
      const select = document.createElement('select');
      
      content.innerHTML = `
        <option>${country.flag}</option>
      `
    }
    
    if (this.status >= 200 && this.status < 300) {
      
      
      
      btn.addEventListener('click', () => {
        const contentItem = document.createElement('div');
        contentItem.classList.add('content__item');
        
        contentItem.innerHTML = `
              <div class="contentHeader">
                <div class="contentItems">Post <b>№${postId++}</b></div>
                <div class="contentItems">at <b>${date.value.split('-').reverse().join('.')}</b></div>
                <div class="contentItems flagContent">being in: <b style="margin-left: 5px">${select.value}</b><div class="flag"></div></div>
              </div>
              <div class="contentBody">
                <div class="contentItems">${input.value}</div>
              </div>
              `;
        
        content.appendChild(contentItem);
        
        response.forEach(el => document.querySelector('.flag').innerHTML = `<img class="flagImg" src="${el.flag}" alt="flag">`);
      });
    } else {
      config.error(this.status)
    }
  });
  
  xhr.addEventListener('error', () => {
    console.log('No Internet');
  })
  
  xhr.addEventListener('timeout', () => {
    console.log('Timeout');
  })
  
  xhr.open(config.method, config.url);
  xhr.send();
}

request({
  method: 'GET',
  url: `https://restcountries.com/v2/all?fields=name,flag`,
  error: message => {
    alert(`Error ${message}`);
  },
})
