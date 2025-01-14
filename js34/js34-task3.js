const listUser = document.querySelector("#task6");

function startFunc() {
  while(true) {
    const user = prompt("Write some text");
    const list = document.createElement("li")
    list.innerHTML = user;
    listUser.appendChild(list)
    if (user === null) {
      listUser.lastChild.remove();
      break;
    }
  }
  
}

startFunc()
