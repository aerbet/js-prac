const date = document.querySelector('#dateInput');
const select = document.querySelector('#select');
const btn = document.querySelector('#saveBtn');

btn.addEventListener('click', () => {
  console.log(date.value)
  console.log(select.value)
});