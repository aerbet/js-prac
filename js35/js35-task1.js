document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#container");
    const btn = document.querySelector("#add-item-btn");

    btn.addEventListener("click", () => {
        const div = document.createElement("div");
        div.innerHTML = "Element";
        div.classList.add("element");

        container.appendChild(div);
    });
});
