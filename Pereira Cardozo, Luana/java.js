const boardRows = 3; 
const boardCols = 6; 
const mineCount = 2; 
let minePositions = new Set();

document.addEventListener("DOMContentLoaded", generateBoard);

function generateBoard() {
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = ""; 

    boardContainer.style.gridTemplateColumns = `repeat(${boardCols}, 1fr)`; 

    for (let i = 0; i < boardRows * boardCols; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", revealCell);
        boardContainer.appendChild(cell);
    }

    placeMines();
}

function placeMines() {
    const totalCells = boardRows * boardCols;
    minePositions.clear();
    while (minePositions.size < mineCount) {
        const randomIndex = Math.floor(Math.random() * totalCells);
        minePositions.add(randomIndex);
    }
}

function revealCell(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (minePositions.has(index)) {
        cell.classList.add("mine");

        const gameContainer = document.getElementById("game-container");
        const background = document.getElementById("background");
        gameContainer.classList.add("blackout"); 
        background.style.visibility = "hidden"; 


        const explosionSound = document.getElementById("explosion-sound");
        explosionSound.play();

        setTimeout(() => {
            gameContainer.classList.remove("blackout");
            background.style.visibility = "visible"; 
            generateBoard();
        }, 2000);
    } else {

        if (isNearbyMine(index)) {
            const nearbySound = document.getElementById("nearby-sound");
            nearbySound.play();
            cell.classList.add("revealed", "nearby");
        } else {
            cell.classList.add("revealed", "empty");
        }
        checkWin();
    }
}

function isNearbyMine(index) {
    const row = Math.floor(index / boardCols);
    const col = index % boardCols;

    const directions = [
        [-1, 0], // Arriba
        [1, 0],  // Abajo
        [0, -1], // Izquierda
        [0, 1],  // Derecha
    ];

    return directions.some(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < boardRows && newCol >= 0 && newCol < boardCols) {
            const adjacentIndex = newRow * boardCols + newCol;
            return minePositions.has(adjacentIndex);
        }
        return false;
    });
}

function checkWin() {
    const totalCells = boardRows * boardCols;
    const revealedCells = document.querySelectorAll(".cell.revealed").length;
    const mineCells = minePositions.size;

    if (revealedCells === totalCells - mineCells) {



        const winSound = document.getElementById("win-sound");
        winSound.play();

        const gameContainer = document.getElementById("game-container");
        const winGifContainer = document.getElementById("win-gif-container");

        gameContainer.style.display = "none"; 
        winGifContainer.classList.add("show"); 

        setTimeout(() => {
            restartGame();
        }, 12000);
    }
}

function restartGame() {
    generateBoard();

    const gameContainer = document.getElementById("game-container");
    const winGifContainer = document.getElementById("win-gif-container");

    gameContainer.style.display = "flex";
    winGifContainer.classList.remove("show");

    const winSound = document.getElementById("win-sound");
    winSound.pause();
    winSound.currentTime = 0;
}
