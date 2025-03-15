const input = document.querySelector('#countryName');
const btn = document.querySelector('#findBtn');

const request = config => {
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load', function () {
    
    if (this.status >= 200 && this.status < 300) {
      config.success(this.responseText);
    } else {
      config.error(this.status)
    }
  });
  
  xhr.addEventListener('timeout', () => console.log(config.error('No internet')));
  xhr.addEventListener('error', () => console.log(config.error('Error')));
  
  xhr.open(config.method, config.url);
  xhr.send();
}

btn.addEventListener('click', () => {
  request({
    method: 'GET',
    url: `https://restcountries.com/v2/name/${input.value}`,
    success: jsonResponse => {
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
    },
    error: message => {
      console.log(`Error: ${message}`)
    }
  })
});
