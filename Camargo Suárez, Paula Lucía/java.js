const fish = document.getElementById("fish");
const pond = document.querySelector(".pond");
const moveSound = new Audio('sonidos/movimiento.mp3');
const music = document.getElementById('background-music');
const carTypesByLane = {
    lane2:[ 'car1', 'car2', 'car3'],
    lane3:[ 'car4', 'car5'],
    lane4:[ 'car1'],
    lane5:[ 'car6'],
    lane6:[ 'car2']
};

const speed = 20;
let initialPos = { x: fish.offsetLeft, y: fish.offsetTop };

document.addEventListener('click', () => {
    if (music.paused) {
        music.play();
    }  else {
        music.pause(); 
    }
})

document.addEventListener("keydown", (event) => {
    let currentTop = parseInt(fish.offsetTop)
    let currentLeft = parseInt(fish.offsetLeft)
    let fishPosition = { x: currentLeft, y: currentTop};
    switch (event.key) {
        case "ArrowUp":
            if (fishPosition.y > 0) {
                fishPosition.y -= speed;
                playMoveSound(); 
            }
            break;
        case "ArrowDown":
            if (fishPosition.y < 100) {
                fishPosition.y += speed;
                playMoveSound(); 
            }
            break;
        case "ArrowLeft":
            if (fishPosition.x > 0) {
                    fishPosition.x -= speed;
                    playMoveSound(); 
                }
             break;
        case "ArrowRight":
            if (fishPosition.x < 100) {
                    fishPosition.x += speed;
                    playMoveSound();
                }
                break;
    }
    updateFishPosition(fishPosition.x, fishPosition.y);
    checkIfReachedPond();
});

function playMoveSound() {
    moveSound.currentTime = 0;
    moveSound.play().catch((error) => {
        console.error("Error al reproducir el sonido:", error);
    });
}

document.addEventListener("keydown", (event) => {

    let currentTop = parseInt(fish.offsetTop);
    let currentLeft = parseInt(fish.offsetLeft);
    let fishPosition = { x: currentLeft, y: currentTop };

    switch (event.key) {
        case "ArrowUp":
            if (fishPosition.y > 0) fishPosition.y -= speed;
            break;
        case "ArrowDown":
            if (fishPosition.y < 500) fishPosition.y += speed;
            break;
        case "ArrowLeft":
            if (fishPosition.x > 0) fishPosition.x -= speed;
            break;
        case "ArrowRight":
            if (fishPosition.x < 500) fishPosition.x += speed;
            break;
    }
    updateFishPosition(fishPosition.x, fishPosition.y);
    checkIfReachedPond();
});

function updateFishPosition(x, y) {
    fish.style.top = `${y}px`;
    fish.style.left = `${x}px`;
}

function checkIfReachedPond() {
    const fishRect = fish.getBoundingClientRect();
    const pondRect = pond.getBoundingClientRect();

    if (
        fishRect.bottom > pondRect.top &&
        fishRect.top < pondRect.bottom &&
        fishRect.right > pondRect.left &&
        fishRect.left < pondRect.right
    ) {
        alert("¡Llegaste, el pececito es feliz!");
        resetGame();
    }
};


function createMultipleCars(laneId, speed, direction) {
    const lane = document.getElementById(laneId);
    const carTypes = carTypesByLane[laneId];   
    carTypes.forEach((carType, index) => {
        const car = document.createElement("div");
        car.classList.add("car", carType);
    lane.appendChild(car);

    let carPosition = direction === "right" ? -100 - index * 150 : 1000 + index * 150;

    function moveCar() {
        carPosition += direction === "right" ? speed : -speed;
       
        if (direction === "right" && carPosition > 1000){
            carPosition = -100 - index * 120;}
            else if(direction === "left" && carPosition < -100){
                carPosition = 1000 + index * 30
            }

        car.style.left = `${carPosition}%`;

        if (checkCollisionWithCar(car)) {
            resetGame();
        }

        requestAnimationFrame(moveCar);
    }

    moveCar();
});
}

function checkCollisionWithCar(car) {
    const fishRect = fish.getBoundingClientRect();
    const carRect = car.getBoundingClientRect();

    return !(
        fishRect.top > carRect.bottom ||
        fishRect.bottom < carRect.top ||
        fishRect.left > carRect.right ||
        fishRect.right < carRect.left
    );
}

// Reinicia el juego
function resetGame() {
    
    updateFishPosition(initialPos.x, initialPos.y);
}

createMultipleCars("lane2", 3, "left");
createMultipleCars("lane3", 3, "right");
createMultipleCars("lane4", 5, "left");
createMultipleCars("lane5", 7, "right");
createMultipleCars("lane6", 8, "left")