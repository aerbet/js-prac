const tableBody = document.querySelector('#tableBody');
const tableBtn = document.querySelector('#tableShow');

tableBtn.addEventListener('click', () => {

    const request = config => {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', function () {
            const response = JSON.parse(xhr.responseText);

            if (this.status >= 200 && this.status < 300) {
                for (let i = 0; i < response.length; i ++) {
                    const country = response[i];
                    const tableContent = document.createElement('tr');
                    tableContent.classList.add('tableContent');

                    tableContent.innerHTML = `
                    <td class="tableCode">${country.alpha2Code}</td>
                    <td class="tableFlag"><img style="width: 30px; height: 20px;" src="${country.flag}" alt="flag"></td>
                    <td class="tableName">${country.name}</td>
                    <td class="tableCapital">${country.capital}</td>
                    <td class="tablePop">${country.population}</td>
                    `;

                    tableBody.appendChild(tableContent);
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
        url: `https://restcountries.com/v2/all?fields=alpha2Code,flag,name,capital,population`,
        error: message => {
            alert(`Error ${message}`);
        },
    })
})
