// Evento para iniciar el juego al hacer clic en el botón "Comenzar Juego"
document.getElementById('startButton').addEventListener('click', function () {
    // Ocultar el cartel de inicio
    document.getElementById('startScreen').style.display = 'none';

    // Iniciar el juego
    updateCounter();
    moveFlies();
});

/// Contador para las moscas atrapadas
let counter = 0;
const counterDisplay = document.getElementById('counter');

// Selecciona el camaleón en PNG
const chameleon = document.getElementById('chameleon');

// IDs de las moscas (deben coincidir con los elementos del HTML)
const flyIds = [
    'randomObject2', 'randomObject3', 'randomObject4', 
    'randomObject', 'randomObject5', 'randomObject6', 
    'randomObject7', 'randomObject8', 'randomObject9', 'randomObject10', 
    'randomObject11', 'randomObject12', 'randomObject13', 'randomObject14', 'randomObject15'
];

// Cargar el sonido "Eatfly"
const eatFlySound = new Audio('sounds/eatFly.mp3'); 

// Función para generar una posición aleatoria
function getRandomPosition() {
    return {
        x: Math.random() * (window.innerWidth - 50),
        y: Math.random() * (window.innerHeight - 50)
    };
}

// Función para generar un ángulo aleatorio de hue-rotate
function getRandomHue() {
    return Math.floor(Math.random() * 360); // Ángulo entre 0 y 360 grados
}

// Inicializa las moscas con posiciones y colores aleatorios
const flies = flyIds.map(flyId => {
    const flyElement = document.getElementById(flyId);
    const hueValue = getRandomHue();

    // Aplica el filtro hue-rotate para el color de la mosca
    flyElement.style.filter = `hue-rotate(${hueValue}deg)`;

    // Asigna una posición aleatoria inicial
    const position = getRandomPosition();
    flyElement.style.left = `${position.x}px`;
    flyElement.style.top = `${position.y}px`;

    return {
        element: flyElement,
        hue: hueValue,
        x: position.x,
        y: position.y,
        speedX: (Math.random() - 0.5) * 5, // Velocidad aleatoria en X
        speedY: (Math.random() - 0.5) * 5  // Velocidad aleatoria en Y
    };
});

// Evento de clic para cada mosca
flies.forEach(fly => {
    fly.element.addEventListener('click', () => {
        // Cambia el color del camaleón
        chameleon.style.filter = `hue-rotate(${fly.hue}deg)`;

        // Incrementa el contador
        counter++;
        counterDisplay.textContent = `Contador: ${counter}`;

        // Reproduce el sonido de comer la mosca
        eatFlySound.currentTime = 0; // Reinicia el sonido
        eatFlySound.play();

        // Reposiciona la mosca aleatoriamente tras el clic
        const newPosition = getRandomPosition();
        fly.x = newPosition.x;
        fly.y = newPosition.y;
        fly.element.style.left = `${newPosition.x}px`;
        fly.element.style.top = `${newPosition.y}px`;
    });
});

// Función para mover las moscas continuamente
function moveFlies() {
    flies.forEach(fly => {
        // Actualiza la posición de la mosca
        fly.x += fly.speedX;
        fly.y += fly.speedY;

        // Rebotar en los límites de la pantalla
        if (fly.x < 0 || fly.x > window.innerWidth - 50) {
            fly.speedX *= -1; // Invierte la dirección en X
        }
        if (fly.y < 0 || fly.y > window.innerHeight - 50) {
            fly.speedY *= -1; // Invierte la dirección en Y
        }

        // Actualiza la posición en la pantalla
        fly.element.style.left = `${fly.x}px`;
        fly.element.style.top = `${fly.y}px`;
    });
}

// Inicia el movimiento continuo de las moscas
setInterval(moveFlies, 20);
// Función para generar confeti detrás del camaleón
function generateConfetti(x, y) {
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Estilo y posición inicial aleatoria para los confeti
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Color aleatorio
        confetti.style.left = `${y}px`; // Alrededor del camaleón
        confetti.style.top = `${y}px`; // Detrás del camaleón
        confetti.style.width = `${Math.random() * 10 + 5}px`; // Tamaño aleatorio
        confetti.style.height = confetti.style.width;

        // Agregar al contenedor del DOM
        document.body.appendChild(confetti);

        // Eliminar el confeti después de la animación
        setTimeout(() => {
            confetti.remove();
        }, 1500);
    }
}

// Evento de clic para cada mosca (modificado para incluir confeti)
flies.forEach(fly => {
    fly.element.addEventListener('click', () => {
        // Cambia el color del camaleón
        chameleon.style.filter = `hue-rotate(${fly.hue}deg)`;

        // Incrementa el contador
        counter++;
        counterDisplay.textContent = `Contador: ${counter}`;

        // Reproduce el sonido de comer la mosca
        eatFlySound.currentTime = 0; // Reinicia el sonido
        eatFlySound.play();

        // Genera confeti en la posición del camaleón
        const chameleonRect = chameleon.getBoundingClientRect();
        generateConfetti(chameleonRect.left + chameleonRect.width / 2, chameleonRect.top);

        // Reposiciona la mosca aleatoriamente tras el clic
        const newPosition = getRandomPosition();
        fly.x = newPosition.x;
        fly.y = newPosition.y;
        fly.element.style.left = `${newPosition.x}px`;
        fly.element.style.top = `${newPosition.y}px`;
    });
});
// Función para generar confeti en forma de explosión
function generateConfetti(x, y) {
    const numberOfConfetti = 40; // Cantidad de confeti
    for (let i = 0; i < numberOfConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

   
confetti.style.backgroundColor = `hsl(${Math.random() * 15 + 45}, 100%, 50%)`;
confetti.style.opacity = 0.3; // 


        


        // Coordenadas iniciales
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;

        // Dirección de movimiento aleatoria
        const angle = Math.random() * 7 * Math.PI; 
        const distance = Math.random() * 90; // Distancia aleatoria de explosión
        const xOffset = Math.cos(angle) *1* distance; 
        const yOffset = Math.sin(angle) *1* distance; 

        
        confetti.style.setProperty('--x', xOffset);
        confetti.style.setProperty('--y', yOffset);

        // Agregar el confeti al cuerpo del documento
        document.body.appendChild(confetti);

        // Eliminar el confeti después de la animación
        setTimeout(() => {
            confetti.remove();
        }, 1000); // Duración de la animación
    }
}

// Evento de clic para cada mosca (modificado para incluir explosión de confeti)
flies.forEach(fly => {
    fly.element.addEventListener('click', () => {
        
        chameleon.style.filter = `hue-rotate(${fly.hue}deg)`;

        
        counter++;
        counterDisplay.textContent = `Contador: ${counter}`;

        // Reproduce el sonido de comer la mosca
        eatFlySound.currentTime = 0; // Reinicia el sonido
        eatFlySound.play();

        // Genera confeti en la posición del camaleón
        const chameleonRect = chameleon.getBoundingClientRect();
        generateConfetti(
            chameleonRect.left + chameleonRect.width / 2, 
            chameleonRect.top + chameleonRect.height / 1
        );

        // Reposiciona la mosca aleatoriamente tras el clic
        const newPosition = getRandomPosition();
        fly.x = newPosition.x;
        fly.y = newPosition.y;
        fly.element.style.left = `${newPosition.x}px`;
        fly.element.style.top = `${newPosition.y}px`;
    });
});
