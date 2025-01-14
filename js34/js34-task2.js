
function drawCircle(num) {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFF5", "#FF5733", "#FFC300", "#DAF7A6", "#C70039",
        "#900C3F", "#581845", "#1ABC9C", "#2ECC71", "#3498DB",
        "#9B59B6", "#34495E", "#16A085", "#27AE60", "#2980B9",
        "#8E44AD", "#2C3E50", "#F1C40F", "#E67E22", "#E74C3C",
        "#ECF0F1", "#95A5A6", "#7F8C8D", "#F39C12", "#D35400"];
    const min = 50;
    const max = 400;
    const userScreen = window.innerWidth;
    document.body.maxWidth = "1200px";
    for (let j = 0; j < num; j++) {
        const circle = document.createElement("div");
        const size = Math.floor(Math.random() * max + min);
        
        const top = Math.floor(Math.random() * 100 + 1);
        const left = Math.floor(Math.random() * 100 + 1);
        
        const randCol = Math.floor(Math.random() * colors.length);

        circle.style.width = size + "px";
        circle.style.height = size + "px";
        circle.style.top = top + "%";
        circle.style.left = left + "%";
        circle.style.background = `${colors[randCol]}`

        circle.classList.add("circle");
        
        document.body.appendChild(circle);
    }
}

drawCircle(10)