
function drawCircle(num) {
    const colors = ["red", "green", "yellow", "blue", "purple", "pink"];
    const min = 50;
    const max = 400;
    for (let j = 0; j < num; j++) {
        const circle = document.createElement("div");
        const size = Math.floor(Math.random() * max + 50);

        const top = Math.floor(Math.random() * 100 + 1);
        const left = Math.floor(Math.random() * 100 + 1);

        circle.style.width = size + "px";
        circle.style.height = size + "px";
        circle.style.top = top + "%";
        circle.style.left = left + "%";

        circle.classList.add("circle");
        document.body.style.width = "1280px"
        document.body.appendChild(circle);
    }
}

drawCircle(5)