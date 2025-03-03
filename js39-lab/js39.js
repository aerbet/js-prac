const content = document.querySelector('.content');
const input = document.querySelector('#textInput');
const date = document.querySelector('#dateInput');
const select = document.querySelector('#select');
const btn = document.querySelector('#saveBtn');
let postId = 1;

btn.addEventListener('click', () => {
  console.log(date.value)
  console.log(select.value)

  const contentItem = document.createElement('div');
  contentItem.classList.add('content__item');

  contentItem.innerHTML = `
              <div class="contentItems">Post №${postId++}</div>
              <div class="contentItems">at ${date.value.split('')}</div>
              <div class="contentItems">being in: ${select.value}</div>
              `;

  content.appendChild(contentItem);
});
