document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameOverScreen = document.getElementById('game-over');
    const player = document.getElementById('player');
    const enemy = document.getElementById('enemy');
    const scoreElement = document.getElementById('score');
    const finalScoreElement = document.getElementById('final-score');

    const sounds = {
        background: new Audio('sounds/background.mp3'),
        collect: new Audio('sounds/collect.mp3'),
        freeze: new Audio('sounds/freeze.mp3'),
        gameover: new Audio('sounds/gameover.mp3')
    };

    sounds.background.volume = 0.25;
    sounds.background.loop = true;
    sounds.collect.volume = 0.05;
    sounds.freeze.volume = 0.025;
    sounds.gameover.volume = 0.2;

    function playSound(soundName) {
        const sound = sounds[soundName];
        if (sound) {
            try {
                sound.currentTime = 0;
                let playPromise = sound.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Error playing sound:", error);
                    });
                }
            } catch (error) {
                console.log("Error playing sound:", error);
            }
        }
    }

    let score = 0;
    let highScore = localStorage.getItem('highScore') || 0;
    let gameLoop;
    let enemies = [enemy];
    let powerUpElement = null;
    const BASE_ENEMY_SPEED = 5;
    const ENEMY_SIZE = 90;
    let isGameOver = false;

    function createPowerUpElement() {
        const powerUp = document.createElement('img');
        powerUp.id = 'power-up';
        powerUp.src = 'img/comida.png';
        powerUp.style.position = 'absolute';
        powerUp.style.zIndex = '1000';
        return powerUp;
    }

    function spawnPowerUp() {
        if (powerUpElement) {
            powerUpElement.remove();
        }

        powerUpElement = createPowerUpElement();
        powerUpElement.style.left = Math.random() * (window.innerWidth - 200) + 'px';
        powerUpElement.style.top = Math.random() * (window.innerHeight - 200) + 'px';
        gameScreen.appendChild(powerUpElement);
    }

    function startGame() {
        isGameOver = false;
        score = 0;
        updateScore();
        enemies = [enemy];
        enemy.style.left = '100px';
        enemy.style.top = '100px';
        enemy.style.width = ENEMY_SIZE + 'px';
        enemy.style.height = ENEMY_SIZE + 'px';
        enemy.dataset.randomMove = 'false';
        enemy.dataset.speed = BASE_ENEMY_SPEED.toString();
        if (powerUpElement) {
            powerUpElement.remove();
            powerUpElement = null;
        }
        spawnPowerUp();
        gameLoop = requestAnimationFrame(updateGame);
        
        try {
            sounds.background.currentTime = 0;
            let playPromise = sounds.background.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Error playing background music:", error);
                });
            }
        } catch (error) {
            console.log("Error playing background music:", error);
        }
    }

    function handleMove(e) {
        const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const y = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        
        player.style.left = x - player.offsetWidth / 2 + 'px';
        player.style.top = y - player.offsetHeight / 2 + 'px';
    }

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove, { passive: true });
    document.addEventListener('touchstart', handleMove, { passive: true });

    function updateScore() {
        scoreElement.innerHTML = `
            <div class="score-container">
                <img src="img/comida.png">
                <span>${score}</span>
            </div>
        `;
    }

    function activatePowerUp() {
        if (isGameOver) return;

        score++;
        updateScore();
        spawnPowerUp();

        if (score % 7 === 0) {
            const mainEnemy = enemies[0];
            const mainEnemyRect = mainEnemy.getBoundingClientRect();
            
            const newEnemy = enemy.cloneNode();
            newEnemy.style.width = ENEMY_SIZE + 'px';
            newEnemy.style.height = ENEMY_SIZE + 'px';
            newEnemy.style.left = mainEnemyRect.left + 'px';
            newEnemy.style.top = mainEnemyRect.top + 'px';
            newEnemy.dataset.randomMove = 'true';
            newEnemy.dataset.speed = BASE_ENEMY_SPEED.toString();
            newEnemy.dataset.direction = JSON.stringify({
                x: Math.random() * 2 - 1,
                y: Math.random() * 2 - 1
            });
            gameScreen.appendChild(newEnemy);
            enemies.push(newEnemy);
        }

        if (score % 5 === 0) {
            const randomEffect = Math.random() < 0.5;
            
            if (randomEffect) {
                enemies.forEach(e => {
                    e.dataset.speed = (BASE_ENEMY_SPEED * 0.5).toString();
                });
                setTimeout(() => {
                    if (!isGameOver) {
                        enemies.forEach(e => {
                            e.dataset.speed = BASE_ENEMY_SPEED.toString();
                        });
                    }
                }, 5000);
            } else {
                enemies.forEach(e => {
                    e.dataset.speed = '0';
                });
                setTimeout(() => {
                    if (!isGameOver) {
                        enemies.forEach(e => {
                            e.dataset.speed = BASE_ENEMY_SPEED.toString();
                        });
                    }
                }, 5000);
                playSound('freeze');
            }
        }
    }

    function updateGame() {
        if (isGameOver) return;

        enemies.forEach(enemy => {
            const speed = parseFloat(enemy.dataset.speed || BASE_ENEMY_SPEED.toString());
            const enemyRect = enemy.getBoundingClientRect();
            
            if (enemy.dataset.randomMove === 'true') {

                let direction = enemy.dataset.direction ? JSON.parse(enemy.dataset.direction) : { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
                
                if (enemyRect.left <= 0 || enemyRect.right >= window.innerWidth) {
                    direction.x *= -1;
                }
                if (enemyRect.top <= 0 || enemyRect.bottom >= window.innerHeight) {
                    direction.y *= -1;
                }
                
                enemy.style.left = (enemyRect.x + direction.x * speed) + 'px';
                enemy.style.top = (enemyRect.y + direction.y * speed) + 'px';
                
                enemy.dataset.direction = JSON.stringify(direction);
                
                if (Math.random() < 0.02) {
                    direction = {
                        x: Math.random() * 2 - 1,
                        y: Math.random() * 2 - 1
                    };
                    enemy.dataset.direction = JSON.stringify(direction);
                }
            } else {
                const playerRect = player.getBoundingClientRect();
                let dx = playerRect.x - enemyRect.x;
                let dy = playerRect.y - enemyRect.y;

                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 0) {
                    enemy.style.left = (enemyRect.x + (dx / distance) * speed) + 'px';
                    enemy.style.top = (enemyRect.y + (dy / distance) * speed) + 'px';
                }
            }

            const playerRect = player.getBoundingClientRect();
            if (isColliding(playerRect, enemyRect)) {
                gameOver();
                return;
            }
        });

        if (powerUpElement) {
            const powerUpRect = powerUpElement.getBoundingClientRect();
            const playerRect = player.getBoundingClientRect();
            
            if (isColliding(playerRect, powerUpRect)) {
                powerUpElement.remove();
                powerUpElement = null;
                activatePowerUp();
                playSound('collect');
            }
        }

        gameLoop = requestAnimationFrame(updateGame);
    }

    function isColliding(rect1, rect2) {
        const margin = 15;
        return !(
            rect1.right - margin < rect2.left + margin || 
            rect1.left + margin > rect2.right - margin || 
            rect1.bottom - margin < rect2.top + margin || 
            rect1.top + margin > rect2.bottom - margin
        );
    }

    function gameOver() {
        isGameOver = true;
        cancelAnimationFrame(gameLoop);
        
        sounds.background.pause();
        sounds.background.currentTime = 0;
        playSound('gameover');

        gameScreen.classList.add('hidden');
        gameOverScreen.classList.remove('hidden');
        
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
        
        finalScoreElement.innerHTML = `
            <div class="score-container">
                <img src="img/comida.png">
                <div class="score-text">${score}</div>
            </div>
            <div class="score-container">
                <img src="img/record.png">
                <div class="score-text">${highScore}</div>
            </div>
        `;
    }

    startScreen.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        startGame();
    });

    startScreen.addEventListener('touchstart', () => {
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        startGame();
    }, { passive: true });

    gameOverScreen.addEventListener('click', () => {
        gameOverScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        enemies.slice(1).forEach(e => e.remove());
        enemies = [enemy];
        enemy.style.left = '0px';
        enemy.style.top = '0px';
        enemy.dataset.speed = BASE_ENEMY_SPEED.toString();
        enemy.dataset.randomMove = 'false';
        if (powerUpElement) {
            powerUpElement.remove();
            powerUpElement = null;
        }
        startGame();
    });

    gameOverScreen.addEventListener('touchstart', (e) => {
        e.preventDefault();
        gameOverScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        enemies.slice(1).forEach(e => e.remove());
        enemies = [enemy];
        enemy.style.left = '0px';
        enemy.style.top = '0px';
        enemy.dataset.speed = BASE_ENEMY_SPEED.toString();
        enemy.dataset.randomMove = 'false';
        if (powerUpElement) {
            powerUpElement.remove();
            powerUpElement = null;
        }
        startGame();
    }, { passive: false });

    window.addEventListener('load', () => {
        Object.values(sounds).forEach(sound => {
            sound.load();
        });
    });

    document.addEventListener('click', () => {
        if (!sounds.background.playing) {
            sounds.background.play().catch(error => {
                console.log("Error playing background music:", error);
            });
        }
    });
});
