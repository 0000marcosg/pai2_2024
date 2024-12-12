document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const gameContainer = document.getElementById('game-container');
    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button');
    const player = document.getElementById('player');
    const enemy = document.getElementById('enemy');
    const heartsContainer = document.getElementById('hearts');
    const scoreElement = document.getElementById('score-value');
    const gameOverScreen = document.getElementById('game-over');
    const finalScoreElement = document.getElementById('final-score');
    const restartButton = document.getElementById('restart-button');
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Variables del juego
    let lives = 3;
    let score = 0;
    let gameOver = false;
    let playerX = 300;
    let playerY = 200;
    let enemyX = 100;
    let enemyY = 100;
    const enemySpeed = 10; // Aumentado de 6 a 10 para hacer el enemigo mucho más rápido
    let scoreInterval;
    let moveStartTime = Date.now() + 1000; // Tiempo cuando debe empezar a moverse

    // Colores de fondo para cada vida
    const backgroundColors = [
        '#d40101',  // 1 vida
        '#ff7f27',  // 2 vidas
        '#fce030'   // 3 vidas
    ];

    // Inicializar corazones
    function updateHearts() {
        heartsContainer.innerHTML = '';
        for (let i = 0; i < lives; i++) {
            heartsContainer.innerHTML += '<i class="fas fa-heart heart"></i>';
        }
        gameContainer.style.backgroundColor = backgroundColors[lives - 1];
    }

    // Iniciar contador de puntuación
    function startScoreCounter() {
        scoreInterval = setInterval(() => {
            if (!gameOver) {
                score += 10;
                scoreElement.textContent = score;
            }
        }, 1000); // Actualiza cada segundo
    }

    // Detener contador de puntuación
    function stopScoreCounter() {
        clearInterval(scoreInterval);
    }

    // Mostrar pantalla de game over
    function showGameOver() {
        gameOverScreen.classList.remove('hidden');
        finalScoreElement.textContent = score;
        stopScoreCounter();
    }

    // Ocultar pantalla de game over
    function hideGameOver() {
        gameOverScreen.classList.add('hidden');
    }

    // Mostrar pantalla de inicio
    function showStartScreen() {
        startScreen.classList.remove('hidden');
        gameContainer.classList.add('hidden');
        gameOverScreen.classList.add('hidden');
        stopScoreCounter();
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }

    // Control del jugador con el mouse
    gameContainer.addEventListener('mousemove', (e) => {
        if (gameOver) return;

        const rect = gameContainer.getBoundingClientRect();
        playerX = e.clientX - rect.left - 80; // Ajustado para el nuevo tamaño (160/2)
        playerY = e.clientY - rect.top - 80;  // Ajustado para el nuevo tamaño (160/2)

        playerX = Math.max(0, Math.min(playerX, gameContainer.offsetWidth - 160));
        playerY = Math.max(0, Math.min(playerY, gameContainer.offsetHeight - 160));

        player.style.left = playerX + 'px';
        player.style.top = playerY + 'px';
    });

    // Mover enemigo
    function moveEnemy() {
        if (gameOver) return;
        
        // No mover hasta que pasen 3 segundos
        if (Date.now() < moveStartTime) return;

        const dx = playerX - enemyX;
        const dy = playerY - enemyY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            enemyX += (dx / distance) * enemySpeed;
            enemyY += (dy / distance) * enemySpeed;
        }

        enemy.style.left = enemyX + 'px';
        enemy.style.top = enemyY + 'px';

        // Detectar colisión
        if (distance < 190) {
            lives--;
            updateHearts();

            // Cambiar la imagen y tamaño según las vidas restantes
            const playerImg = document.querySelector('#player img');
            const player = document.getElementById('player');
            
            if (lives === 2) {
                playerImg.src = 'saraylu.png';
                player.className = 'size-2';  // 210px
            } else if (lives === 1) {
                playerImg.src = 'sara.png';
                player.className = 'size-1';  // 260px
            }

            if (lives <= 0) {
                gameOver = true;
                showGameOver();
            } else {
                // Reposicionar enemigo aleatoriamente
                enemyX = Math.random() * (gameContainer.offsetWidth - 120);
                enemyY = Math.random() * (gameContainer.offsetHeight - 120);
                moveStartTime = Date.now() + 1000; // Esperar 3 segundos antes de moverse
            }
        }
    }

    // Reiniciar juego
    function restartGame() {
        showStartScreen();
    }

    // Preparar nuevo juego
    function prepareNewGame() {
        lives = 3;
        score = 0;
        gameOver = false;
        moveStartTime = Date.now() + 1000;
        
        // Restaurar la imagen original y tamaño
        const playerImg = document.querySelector('#player img');
        const player = document.getElementById('player');
        playerImg.src = 'todas.png';
        player.className = '';
        
        enemyX = Math.random() * (gameContainer.offsetWidth - 120);
        enemyY = Math.random() * (gameContainer.offsetHeight - 120);
        
        updateHearts();
        hideGameOver();
        scoreElement.textContent = '0';
        startScoreCounter();
        
        // Reiniciar y reproducir la música
        backgroundMusic.currentTime = 0;
        backgroundMusic.play().catch(error => console.log("Error al reproducir música:", error));
    }

    restartButton.addEventListener('click', restartGame);

    // Función para iniciar el juego
    function startGame() {
        startScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        prepareNewGame();
    }

    startButton.addEventListener('click', startGame);

    // Game loop
    function gameLoop() {
        moveEnemy();
        requestAnimationFrame(gameLoop);
    }

    // Iniciar juego
    hideGameOver();
    updateHearts();
    startScoreCounter();
    gameLoop();
});