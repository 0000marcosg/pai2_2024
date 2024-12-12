// Selecciona el contenedor de estrellas
const starsContainer = document.getElementById('stars-container');
const numberOfStars = 30;
const numberOfImages = 5; // Número de imágenes de estrellas disponibles
const numberOfSounds = 24; // Número total de sonidos disponibles

// Variable para mantener referencia al audio que se está reproduciendo actualmente
let currentlyPlayingAudio = null;
let currentlyPlayingStar = null;

// Tamaño de las estrellas y espacio mínimo entre ellas
const starSize = 45; // px
const minDistance = 55; // px

// Array para almacenar las posiciones de las estrellas
let starPositions = [];

// Array para almacenar los índices de sonidos disponibles
let availableSoundIndices = Array.from({length: numberOfSounds}, (_, i) => i + 1);

// Función para convertir vh/vw a pixels
function vhToPx(vh) {
    return (vh * window.innerHeight) / 100;
}

function vwToPx(vw) {
    return (vw * window.innerWidth) / 100;
}

// Función para convertir pixels a vh/vw
function pxToVh(px) {
    return (px * 100) / window.innerHeight;
}

function pxToVw(px) {
    return (px * 100) / window.innerWidth;
}

// Función para verificar si una posición está demasiado cerca de las existentes
function isTooClose(x, y) {
    for (let pos of starPositions) {
        const dx = x - pos.x;
        const dy = y - pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
            return true;
        }
    }
    return false;
}

// Función para obtener una posición válida
function getValidPosition() {
    const headerHeight = vhToPx(15); // 15vh para el encabezado
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
        const x = Math.random() * (window.innerWidth - starSize);
        const y = headerHeight + Math.random() * (window.innerHeight - headerHeight - starSize);
        
        if (!isTooClose(x, y)) {
            return { x, y };
        }
        attempts++;
    }
    
    // Si no encontramos una posición después de muchos intentos, aumentamos la distancia entre el último intento
    return { 
        x: Math.random() * (window.innerWidth - starSize),
        y: headerHeight + Math.random() * (window.innerHeight - headerHeight - starSize)
    };
}

// Función para obtener un índice de sonido aleatorio no utilizado
function getUniqueSoundIndex() {
    if (availableSoundIndices.length === 0) {
        // Si se acabaron los sonidos, reiniciar el array
        availableSoundIndices = Array.from({length: numberOfSounds}, (_, i) => i + 1);
    }
    const randomIndex = Math.floor(Math.random() * availableSoundIndices.length);
    return availableSoundIndices.splice(randomIndex, 1)[0];
}

// Genera la disposición de las estrellas
for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('img');

    // Selecciona aleatoriamente una de las 5 imágenes de estrellas
    const randomImageIndex = Math.floor(Math.random() * numberOfImages) + 1;
    star.src = `img/estrella${randomImageIndex}.png`;
    star.classList.add('star');

    // Obtener una posición válida
    const position = getValidPosition();
    starPositions.push(position);

    // Asignar la posición en vh/vw
    star.style.top = `${pxToVh(position.y)}vh`;
    star.style.left = `${pxToVw(position.x)}vw`;

    // Asocia un sonido único a cada estrella usando la nueva función
    const soundIndex = getUniqueSoundIndex();
    const audio = new Audio(`sonidos/meme${soundIndex}.mp3`);
    
    // Asegurarse de que el audio se cargue correctamente
    audio.load();

    // Añadir evento para cuando termine el audio
    audio.addEventListener('ended', () => {
        star.classList.remove('playing');
        currentlyPlayingAudio = null;
        currentlyPlayingStar = null;
    });

    // Controla la reproducción del sonido al hacer clic
    star.addEventListener('click', () => {
        // Si hay otro audio reproduciéndose, lo detenemos y quitamos la clase playing
        if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
            currentlyPlayingAudio.pause();
            currentlyPlayingAudio.currentTime = 0;
            if (currentlyPlayingStar) {
                currentlyPlayingStar.classList.remove('playing');
            }
        }

        if (audio.paused) {
            audio.currentTime = 0; // Reinicia el sonido
            audio.play().catch(error => {
                console.error('Error al reproducir el sonido:', error);
            });
            star.classList.add('playing');
            currentlyPlayingAudio = audio;
            currentlyPlayingStar = star;
        } else {
            audio.pause();
            audio.currentTime = 0;
            star.classList.remove('playing');
            currentlyPlayingAudio = null;
            currentlyPlayingStar = null;
        }
    });

    // Agrega la estrella al contenedor
    starsContainer.appendChild(star);
}
