document.getElementById("tituloPrincipal").addEventListener("click", cerrarTitulo);

function cerrarTitulo() {
    document.getElementById("tituloPrincipal").style.display = "none";
    document.getElementById("tituloSecundario").style.display = "block";
}

function playAudio() { 
    document.getElementById("musica fondo").play();  
}

let timeRemaining, cocoSpeed, gameInterval;
        let dx, dy, cocoX, cocoY, cocoSize;
        const coco = document.getElementById('coco');
        const timeDisplay = document.getElementById('time-remaining');
        const resultMessage = document.getElementById('result-message');

        function startGame(difficulty) {
            document.getElementById('start-screen').style.display = 'none';
            document.getElementById('game-screen').style.display = 'block';

            if (difficulty === 'facil') {
                timeRemaining = 60;
                cocoSpeed = 3;
                cocoSize = 160;
            } else if (difficulty === 'normal') {
                timeRemaining = 60;
                cocoSpeed = 5;
                cocoSize = 180;
            } else if (difficulty === 'dificil') {
                timeRemaining = 40;
                cocoSpeed = 7;
                cocoSize = 200;
            }

            timeDisplay.textContent = timeRemaining;
            cocoX = 0;
            cocoY = 0;
            dx = cocoSpeed;
            dy = cocoSpeed;
            coco.style.width = `${cocoSize}px`;

            moveCoco();
            gameInterval = setInterval(updateTime, 1000);
        }

        function moveCoco() {
            const gameScreen = document.getElementById('game-screen');
            const maxX = gameScreen.offsetWidth - coco.offsetWidth;
            const maxY = gameScreen.offsetHeight - coco.offsetHeight;

            cocoX += dx;
            cocoY += dy;

            
            if (cocoX <= 0 || cocoX >= maxX) {
                dx = -dx;
            }
            if (cocoY <= 0 || cocoY >= maxY) {
                dy = -dy;
            }

            
            coco.style.left = `${cocoX}px`;
            coco.style.top = `${cocoY}px`;

            
            setTimeout(moveCoco, 10);
        }

        function updateTime() {
            timeRemaining--;
            timeDisplay.textContent = timeRemaining;

            if (timeRemaining <= 0) {
                endGame(false);
            }
        }

        function catchCoco() {
            endGame(true);
        }

        function endGame(won) {
            clearInterval(gameInterval);
            document.getElementById('game-screen').style.display = 'none';
            document.getElementById('result-screen').style.display = 'block';
            resultMessage.textContent = won ? '¡Ganaste!' : 'Perdiste :(';
        }

        function restartGame() {
            document.getElementById('result-screen').style.display = 'none';
            document.getElementById('start-screen').style.display = 'block';
        }

