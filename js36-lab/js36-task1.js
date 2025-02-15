function customAlert(bool) {
  if (bool) {
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
    
    div.innerHTML = `
    <h1 style="margin: 0">Title</h1>
    <h3 style="margin: 0">Some text</h3>
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
    
    function closeAlert() {
      overlay.style.opacity = '0';
      div.style.opacity = '0';
      div.style.transform = 'translate(-50%, 22%) scale(0.8)';
      setTimeout(() => {
        overlay.remove();
        div.remove();
        document.querySelector('#btn').style.opacity = '1';
      }, 77)
    }
    
    document.getElementById('confirm').addEventListener('click', () => {
      console.log(true)
      closeAlert();
    });
    
    document.getElementById('cancel').addEventListener('click', () => {
      console.log(false)
      closeAlert();
    });
    
    overlay.addEventListener('click', closeAlert);
  }
}