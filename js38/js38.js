const name = document.querySelector('#name');
const region = document.querySelector('#region');
const subregion = document.querySelector('#subregion');
const capital = document.querySelector('#capital');
const flag = document.querySelector('#flag');

const country = document.querySelector('#country-name');
const btn = document.querySelector('#show');

btn.addEventListener('click', () => {

    if (country.value !== '' && country.value !== null && country.value.length > 2) {
        const countryBlock = document.querySelector('.countryBlock');

        setTimeout(() => {
            countryBlock.style.visibility = 'visible';
            countryBlock.style.pointerEvents = 'visible';
            countryBlock.style.opacity = '1';
            countryBlock.style.transform = 'translate(0%, 0%) scale(1)';
        }, 100);

        const request = config => {
            const xhr = new XMLHttpRequest();

            xhr.addEventListener('load', function () {
                const response = JSON.parse(xhr.responseText);

                if (this.status >= 200 && this.status < 300) {
                    response.forEach(el => name.innerHTML = el.name);
                    response.forEach(el => region.innerHTML = el.region);
                    response.forEach(el => subregion.innerHTML = el.subregion);
                    response.forEach(el => capital.innerHTML = el.capital);
                    response.forEach(el => flag.innerHTML = `<img src="${el.flag}" alt="flag">`);
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
            url: `https://restcountries.com/v2/name/${country.value}`,
            error: message => {
                alert(`Error ${message}`);
            },
        })
    }
})