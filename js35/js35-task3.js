document.addEventListener("DOMContentLoaded", () => {
    let minutes = 0;
    let seconds = 0;
    let isRunning = false;
    let interval;

    function padZero(number) {
        return number < 10 ? `0${number}` : number;
    }

    function drawNumbers() {
        document.querySelector("#minutes").textContent = padZero(minutes);
        document.querySelector("#seconds").textContent = padZero(seconds);
    }

    function incTimer() {
        seconds++;
        if (seconds > 60) {
            seconds = 0;
            minutes++
        }
        drawNumbers();
    }

    interval = setInterval(() => {
        incTimer();
    }, 1000);

    function startTimer() {
        interval = setInterval(incTimer, 1000);
    }

    function pauseTimer() {
        if (!isRunning) {
            isRunning = false;
            clearInterval(interval);
        }
    }

    function resetTimer() {
        pauseTimer();
        minutes = 0;
        seconds = 0;
        drawNumbers();
    }

    const begin = document.querySelector("#begin");
    const pause = document.querySelector("#pause");
    const reset = document.querySelector("#reset");

    begin.addEventListener("click", startTimer);
    pause.addEventListener("click", pauseTimer);
    reset.addEventListener("click", resetTimer);
})