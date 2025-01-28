document.addEventListener("DOMContentLoaded", () => {
    function startList() {
        const container = document.querySelector("#container");
        const start = document.querySelector("#start");
        const stop = document.querySelector("#stop");

        const interval = setInterval(() => {
            const div = document.createElement("div");
            const randNum = Math.floor(Math.random() * 20);
            div.innerHTML = `${randNum}`;
            div.classList.add("element");

            container.appendChild(div);
        }, 5000);

        start.addEventListener("click", () => {
            setInterval(() => {
                const div = document.createElement("div");
                const randNum = Math.floor(Math.random() * 20);
                div.innerHTML = `${randNum}`;
                div.classList.add("element");

                container.appendChild(div);
            }, 5000)
        })

        stop.addEventListener("click", () => {
            clearInterval(interval);
        })
    }
})