function showTab() {
  const tabs = document.querySelectorAll('.item');
  const content = document.querySelectorAll('.tabs_item');
  
  tabs.forEach((item) => {
    item.addEventListener('click', () => {
      tabs.forEach((item) => {
        item.classList.remove('active')
      })

      item.classList.add('active')
    })
  })

  content.forEach((item, index) => {
    tabs[index].addEventListener('click', () => {
      content.forEach((item) => {
        item.classList.remove('active')
      })

      item.classList.add('active')
    })
  })
}

showTab();