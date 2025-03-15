const input = document.querySelector('#countryName');
const btn = document.querySelector('#findBtn');

const request = config => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener('load', function () {
      
      if (this.status >= 200 && this.status < 300) {
        resolve(this.responseText);
      } else {
        reject(this.status);
      }
    });
    
    xhr.addEventListener('timeout', () => reject('Timeout'));
    xhr.addEventListener('error', () => reject('No internet'));
    
    xhr.open(config.method || 'GET', config.url);
    xhr.send();
  })
}

btn.addEventListener('click', () => {
  request({
    method: 'GET',
    url: `https://restcountries.com/v2/name/${input.value}`,
  }).then(jsonResponse => {
    const data = JSON.parse(jsonResponse)
    const country = document.createElement('div');
    country.innerHTML = `Страна: ${data[0].name} граничит с:`;
    
    document.body.appendChild(country)
    
    const alpha = data[0].borders;
    alpha.forEach(item => {
      let url = `https://restcountries.com/v2/alpha/${item}`
      const xhr = new XMLHttpRequest();
      
      xhr.addEventListener('load', function () {
        const response = JSON.parse(this.responseText)
        
        if (this.status >= 200 && this.status < 300) {
          const names = document.createElement('li');
          names.innerHTML = response.name
          
          document.body.appendChild(names)
        } else {
          console.log(this.status)
        }
      });
      
      xhr.addEventListener('timeout', () => console.log(this.status));
      xhr.addEventListener('error', () => console.log(this.status));
      
      xhr.open('GET', url);
      xhr.send();
    })
  }).catch(error => {
    console.log(`Error: ${error}`)
  })
});
