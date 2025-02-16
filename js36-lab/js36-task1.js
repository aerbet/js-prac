function customModal(title, text, showInput = false, callback = null) {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0, 0, 0, 0.82)';
  overlay.style.opacity = '0';
  overlay.style.zIndex = '999';

  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.padding = '10px';
  div.style.width = '400px';
  div.style.height = '200px';
  div.style.background = '#9F9FED';
  div.style.border = '1px solid black';
  div.style.top = '50%';
  div.style.left = '50%';
  div.style.transform = 'translate(-50%, 22%) scale(0.8)';
  div.style.borderRadius = '10px';
  div.style.zIndex = '1000';
  div.style.opacity = '0';
  div.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
  
  let inputField = showInput ? `<input type="text" id="input">` : '';
  
  div.innerHTML = `
  <h1 style="margin: 0">${title}</h1>
  <h3 style="margin: 10px 0">${text}</h3>
  ${inputField}
  <button id="confirm">Confirm</button>
  <button id="cancel">Cancel</button>
`
  document.body.appendChild(overlay)
  document.body.appendChild(div)
  
  setTimeout(() => {
    overlay.style.opacity = '1';
    div.style.opacity = '1';
    div.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 10)
  
  function closeAlert(result) {
    overlay.style.opacity = '0';
    div.style.opacity = '0';
    div.style.transform = 'translate(-50%, 22%) scale(0.8)';
    setTimeout(() => {
      overlay.remove();
      div.remove();
      if(callback) callback(result)
      document.querySelector('#btnAlert').style.opacity = '1';
      document.querySelector('#btnConfirm').style.opacity = '1';
      document.querySelector('#btnPrompt').style.opacity = '1';
    }, 77)
  }
  
  document.getElementById('confirm').addEventListener('click', () => {
    let result = showInput ? document.getElementById('input').value : true;
    closeAlert(result);
  });
  
  document.getElementById('cancel').addEventListener('click', () => closeAlert(showInput ? null : false))
  
  overlay.addEventListener('click', () => closeAlert(showInput ? null : false));
}

function customAlert(title, text) {
  customModal(title, text);
}

function customConfirm(title, text, callback) {
  customModal(title, text, false, callback);
}

function customPrompt(title, text, callback) {
  customModal(title, text, true, callback);
}
