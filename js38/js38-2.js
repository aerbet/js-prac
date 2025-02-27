const tableName = document.querySelector('#tableName');
const tableCapital = document.querySelector('#tableCapital');
const tableFlag = document.querySelector('#tableFlag');
const tablePop = document.querySelector('#tablePop');
const tableCode = document.querySelector('#tableCode');

const request = config => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        if (this.status >= 200 && this.status < 300) {
            response.forEach(el => tableName.innerHTML = el.name);
            response.forEach(el => tableCapital.innerHTML = el.capital);
            response.forEach(el => tableCode.innerHTML = el.alpha2Code);
            response.forEach(el => tablePop.innerHTML = el.population);
            response.forEach(el => tableFlag.innerHTML = `<img src="${el.flag}" alt="flag">`);
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
    url: `https://restcountries.com/v2/name/Kyrgyzstan`,
    error: message => {
        alert(`Error ${message}`);
    },
})
