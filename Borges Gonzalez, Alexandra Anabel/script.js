const movingImage = document.getElementById("moving-image");
const centerImage = document.getElementById("center-image");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const finalScore = document.getElementById("final-score");

// Agregar elemento de audio
const audio = new Audio("torero.mp3");

// Variables del juego
let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let score = 0;
let timer = 30;
let isPlaced = false;
let gameOver = false;
let placedPosition = { left: null, top: null };
let timerStarted = false;
let randomMoveInterval;
let timerInterval;

// Preparar el audio tras la interacción del usuario
document.addEventListener("click", function initAudio() {
    audio.play()
        .then(() => {
            audio.pause();
            audio.currentTime = 0;
        })
        .catch(() => {
            console.warn("El usuario debe interactuar para habilitar el audio.");
        });
    document.removeEventListener("click", initAudio);
});

// Movimiento inicial
randomMoveInterval = setInterval(moveRandomly, 800);

// Iniciar el temporizador al primer clic
document.addEventListener("click", function startTimer() {
    if (timerStarted) return;

    timerStarted = true;
    timerInterval = setInterval(() => {
        if (timer <= 0) {
            clearInterval(timerInterval);
            clearInterval(randomMoveInterval);

            gameOver = true;
            timerDisplay.style.display = "none";
            scoreDisplay.style.display = "none";

            finalScore.innerHTML = `Tu nivel de torero es:<br><strong>${score}</strong>`;
            finalScore.classList.add("game-over");
            finalScore.style.display = "block";

            restoreImagePosition();

            audio.play().catch(() => {
                console.error("No se pudo reproducir el audio.");
            });
        } else {
            timer--;
            timerDisplay.innerText = timer;
        }
    }, 1000);

    document.removeEventListener("click", startTimer);
});

function moveRandomly() {
    if (isDragging || isPlaced || gameOver) return;

    const containerRect = document.body.getBoundingClientRect();
    const movingRect = movingImage.getBoundingClientRect();
    const randomX = Math.random() * (containerRect.width - movingRect.width);
    const randomY = Math.random() * (containerRect.height - movingRect.height);

    movingImage.style.left = `${randomX}px`;
    movingImage.style.top = `${randomY}px`;
}

function isOverlapping() {
    const movingRect = movingImage.getBoundingClientRect();
    const centerRect = centerImage.getBoundingClientRect();
    return (
        movingRect.left < centerRect.right &&
        movingRect.right > centerRect.left &&
        movingRect.top < centerRect.bottom &&
        movingRect.bottom > centerRect.top
    );
}

movingImage.addEventListener("mousedown", (event) => {
    if (isPlaced || gameOver) return;

    isDragging = true;

    // Calcular el desplazamiento del clic respecto a la imagen
    const rect = movingImage.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
});

document.addEventListener("mousemove", (event) => {
    if (!isDragging || isPlaced || gameOver) return;

    // Mover la imagen calculando la nueva posición
    const newX = event.clientX - offsetX;
    const newY = event.clientY - offsetY;
    movingImage.style.left = `${newX}px`;
    movingImage.style.top = `${newY}px`;
});

document.addEventListener("mouseup", () => {
    if (!isDragging || isPlaced || gameOver) return;
    isDragging = false;

    if (isOverlapping()) {
        score++;
        updateScoreDisplay();
        placeImageOnHead();
        clearInterval(randomMoveInterval);
    }
});

function updateScoreDisplay() {
    scoreDisplay.innerText = `Puntaje: ${score}`;
}

function placeImageOnHead() {
    const centerRect = centerImage.getBoundingClientRect();
    const movingWidth = movingImage.offsetWidth;
    const movingHeight = movingImage.offsetHeight;

    const newLeft = centerRect.left + (centerRect.width / 2) - (movingWidth / 2);
    const newTop = centerRect.top - movingHeight / 2 + 225;

    placedPosition = { left: newLeft, top: newTop };

    movingImage.style.left = `${newLeft}px`;
    movingImage.style.top = `${newTop}px`;
    movingImage.style.pointerEvents = "none";
    isPlaced = true;

    setTimeout(() => {
        isPlaced = false;
        randomMoveInterval = setInterval(moveRandomly, 800);
        movingImage.style.pointerEvents = "auto";
    }, 500);
}

function restoreImagePosition() {
    if (placedPosition.left !== null && placedPosition.top !== null) {
        movingImage.style.left = `${placedPosition.left}px`;
        movingImage.style.top = `${placedPosition.top}px`;
        movingImage.style.pointerEvents = "none";
        isPlaced = true;
    }
}
