const listUser = $("#task6");

function startFunc() {
  while(true) {
    const user = prompt("Write some text");
    const list = $("<li></li>").text(user);
    list.html(user);
    listUser.append(list)
    if (user === null) {
      listUser.children().last().remove();
      break;
    }
  }
  
}

startFunc()
