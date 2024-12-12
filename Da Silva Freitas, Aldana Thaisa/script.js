const playBoard = document.querySelector(".play-board");
const conteopasajerosElement = document.querySelector(".conteopasajeros"); 
const eatSound = new Audio('./sonido/macaco.mp3'); // Ruta del archivo de sonido

let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;  
let conteopasajeros = 0;

const personImages = ["macaco-amarillo.png", "macaco-rojo.png", "macaco-verde.png", "macaco-violeta.png"];
let currentPersonImage = "";


const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    currentPersonImage = personImages[Math.floor(Math.random() * personImages.length)];
};


const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over!");
    location.reload();
};


const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

// Inicializar el juego
const initGame = () => {
    // Mostrar la comida
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}; background-image: url('./img/${currentPersonImage}')"></div>`;

    
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push({ x: foodX, y: foodY, img: currentPersonImage });
        changeFoodPosition();
        conteopasajeros++;
        eatSound.play();
        conteopasajerosElement.innerHTML = `${conteopasajeros}`;
    }


    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i].x = snakeBody[i - 1].x;
        snakeBody[i].y = snakeBody[i - 1].y;
    }
    if (snakeBody.length) {
        snakeBody[0].x = snakeX;
        snakeBody[0].y = snakeY;
    }


    snakeX += velocityX;
    snakeY += velocityY;


    if (snakeX <= 0) snakeX = 30;
    else if (snakeX > 30) snakeX = 1;

    if (snakeY <= 0) snakeY = 30;
    else if (snakeY > 30) snakeY = 1;


    htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}; background-image: url('./img/bondi-1.png')"></div>`;


    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i].y} / ${snakeBody[i].x}; background-image: url('./img/${snakeBody[i].img}')"></div>`;
    }


    playBoard.innerHTML = htmlMarkup;


    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
            handleGameOver();
        }
    }
};

// Inicialización del juego
changeFoodPosition(); // Generar la primera comida
setIntervalId = setInterval(initGame, 125); // Configurar el intervalo del juego
document.addEventListener("keydown", changeDirection);


