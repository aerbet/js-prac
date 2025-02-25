const name = document.querySelector('#name');
const region = document.querySelector('#region');
const subregion = document.querySelector('#subregion');
const capital = document.querySelector('#capital');
const flag = document.querySelector('#flag');

const xhr = new XMLHttpRequest();
xhr.addEventListener('load', function () {
    const response = JSON.parse(xhr.responseText);
    response.forEach(el => name.innerHTML = el.name);
    response.forEach(el => region.innerHTML = el.region);
    response.forEach(el => subregion.innerHTML = el.subregion);
    response.forEach(el => capital.innerHTML = el.capital);
    response.forEach(el => flag.innerHTML = `<img src="${el.flag}" alt="flag">`);
});
xhr.open('GET', 'https://restcountries.com/v2/name/Kyrgyzstan');
xhr.send();