function drawBoard() {
    const board = document.getElementById("board")
    function drawWhite() {
        for (let i = 0; i < 4; i++) {
            const white = document.createElement("div")
            const black = document.createElement("div")
            white.classList.add('white')
            black.classList.add('black')

            board.appendChild(white)
            board.insertBefore(black, white);
        }
    }
    function drawBlack() {
        for (let i = 0; i < 4; i++) {
            const white = document.createElement("div")
            const black = document.createElement("div")
            white.classList.add('white')
            black.classList.add('black')

            board.appendChild(black)
            board.insertBefore(white, black);
        }
    }
    drawWhite();
    drawBlack();
    drawWhite();
    drawBlack();
    drawWhite();
    drawBlack();
}

drawBoard();