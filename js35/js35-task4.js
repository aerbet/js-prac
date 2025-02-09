document.addEventListener("DOMContentLoaded", () => {
  const name = document.querySelector('#name');
  const password = document.querySelector('#pass')
  const button = document.querySelector('#buttonIn')
  
  function validate() {
    if (name.value.length >= 6 && password.value.length >= 6) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }
  
  name.addEventListener('keyup', validate)
  password.addEventListener('keyup', validate)
  
  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    alert(`login: ${name.value}\npassword: ${password.value}`);
  });
});