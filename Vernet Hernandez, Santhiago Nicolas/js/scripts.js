// Esperar el primer clicl para los autoplay
document.addEventListener("click", function() {
    checkSeasonAndPlayAudio(season);
}, { once: true });  // Solo una cvez

// Sonidos
let springAudio = new Audio('aud/p_a.mp3');
let summerAudio = new Audio('aud/v_a.mp3');
let otoAudio = new Audio('aud/o_a.mp3');
let winterAudio = new Audio('aud/i_a.mp3');
let arbolCae = new Audio('aud/arbol_caida.mp3');
springAudio.loop = false;
const regaderaAudios = ['aud/regar1.mp3', 'aud/regar2.mp3', 'aud/regar3.mp3'];  // audios de regaders
const arbolSacudidaAudios = [ 'aud/s_3.mp3'];  // audios de hojas

// Sonidos por estacion
function checkSeasonAndPlayAudio(season) {

    if (season === 0) {  

        document.body.classList.add('spring-body');  
        document.body.classList.remove('summer-body', 'autumn-body', 'winter-body');  
        springAudio.play();
        summerAudio.pause();
        summerAudio.currentTime = 0;
        winterAudio.pause();
        winterAudio.currentTime = 0;
    } else if (season === 1) {  // Verano

        document.body.classList.add('summer-body');  
        document.body.classList.remove('spring-body', 'autumn-body', 'winter-body');  
        summerAudio.play();
        springAudio.pause();
        springAudio.currentTime = 0;
    } else if (season === 2) {  // Otoño

        document.body.classList.add('autumn-body');  
        document.body.classList.remove('spring-body', 'summer-body', 'winter-body');  
        otoAudio.play();
        summerAudio.pause();
        summerAudio.currentTime = 0;
    } else if (season === 3) {  // Invierno

        document.body.classList.add('winter-body');  
        document.body.classList.remove('spring-body', 'summer-body', 'autumn-body');  
        winterAudio.play();
        otoAudio.pause();
        otoAudio.currentTime = 0;
    }
}

let health = 100;  // Vida inicial del árbol
let season = 0;  // Estacion actual, empezando en 0
console.log('Season changed to:', season);
checkSeasonAndPlayAudio(season);
const seasons = ['#4da43a', '#29ad25', '#a4603a', '#25ada7'];  // Colores actualizados para las estaciones
console.log('Season changed to:', season);
checkSeasonAndPlayAudio(season);
const seasonNames = ['Primavera', 'Verano', 'Otoño', 'Invierno'];  // Nombres de las estaciones (aparecen arriba)
console.log('Season changed to:', season);
checkSeasonAndPlayAudio(season);
let clickCount = 0;  // Contador de clics
let growthPhase = 0;  // Fase inicial de crecimiento (0 a 10)
let paused = false;  // Controla si el tiempo está pausado o no
let plantingMode = false;  // Indica si el usuario está plantando una flor
const flowerImages = ['flor1.png', 'flor2.png', 'flor3.png', 'flor4.png', 'flor5.png', 'flor6.png'];  // Lista de imágenes de flores

const buttonContainer = document.getElementById('button-container');
const treeContainer = document.getElementById('tree');

function playFinalAnimation() {
    const tree = document.getElementById('tree');
    const animationPhases = ['fase11.png', 'fase12.png', 'fase13.png', 'fase14.png', 'fase15.png']; // Las fases de la animación
    let currentPhaseIndex = 0;

    function nextAnimationFrame() {
        if (currentPhaseIndex < animationPhases.length) {
            springAudio.play();
            tree.style.backgroundImage = `url('img/${animationPhases[currentPhaseIndex]}')`;  // Cambia la imagen del árbol
            currentPhaseIndex += 1;
            setTimeout(nextAnimationFrame, 200);  // Espera 200 ms antes de cambiar a la siguiente fase
        } else {
            // Cuando termina la animación, deja la fase final
            tree.style.backgroundImage = `url('img/fase15.png')`;  // Asegura que quede en la fase 15
            growthPhase = 15;  // Fija la fase en 15 para mantener la imagen final
        }
    }

    nextAnimationFrame();  
}


function arbolSounds(){
    const arbolrandomaudio = Math.floor(Math.random() * arbolSacudidaAudios.length);
    const arbolaudioelegido = arbolSacudidaAudios[arbolrandomaudio];

    let arbolasonido = new Audio(arbolaudioelegido);
    arbolasonido.play();

}


function waterTree() {
    if (paused) return;  // No se puede regar cuando está pausado
    clickCount += 1;  // Aumenta el contador de clics

    if (clickCount % 2 === 0 && growthPhase < 10) {  // Cada 2 clics, el árbol pasa a la siguiente fase (hasta 10 fases)
        growthPhase += 1;
        changeTreeImage();  // Cambia la imagen del árbol
        
    } else if (growthPhase === 10) {  // Al alcanzar la fase 10, inicia la animación de 11 a 15
        growthPhase = 11;
        arbolCae.play();
        playFinalAnimation();
    } else if (growthPhase >= 15 && growthPhase < 18) {  // Avanza a la fase 16, 17 o 18 después de la fase 15
        growthPhase += 1;
        changeTreeImage();  // Cambia la imagen del árbol a la siguiente fase
        
    } else if (growthPhase >= 18) {  // Después de la fase 18, permite el riego y crecimiento indefinido
        const currentHeight = parseInt(window.getComputedStyle(treeContainer).height, 10);
        const currentWidth = parseInt(window.getComputedStyle(treeContainer).width, 10);
        treeContainer.style.height = (currentHeight * 1.2) + "px"; // Multiplica altura por 1.2 (20% más)
        treeContainer.style.width = (currentWidth * 1.2) + "px"; // Multiplica ancho por 1.2 (20% más)
    }

    adjustHealth(10);  // Aumenta la salud cuando se riega

    // Animaciones visuales para el riego
    const waterButtonImg = document.getElementById('water-button').querySelector('img');
    changeButtonImage('water-button', 'regadera_click.png', 'regadera.png');
    const randomaudio = Math.floor(Math.random() * regaderaAudios.length);
    const audioelegido = regaderaAudios[randomaudio];
    let regaderasonido = new Audio(audioelegido);
    regaderasonido.play();
    arbolSounds();

    waterButtonImg.classList.add('rotating');  // Añadir la clase de rotación
    setTimeout(() => {
        waterButtonImg.classList.remove('rotating');  // Eliminar la clase de rotación después de 300ms
    }, 300);

    setTimeout(() => {
        const tree = document.getElementById('tree');
        tree.classList.add('shake');  // Añadir la clase de agitación
        setTimeout(() => {
            tree.classList.remove('shake');
            tree.classList.add('shake-back');  // Mover hacia el otro lado
        }, 100);
        setTimeout(() => {
            tree.classList.remove('shake-back');  // Volver a la posición normal
        }, 200);
    }, 200);
}


// Aumenta el tamaño del botón buttonId
function buttonGrowEffect(buttonId) {
    const buttonImg = document.getElementById(buttonId).querySelector('img');
    buttonImg.classList.add('grow');  // Añadir la clase de crecimiento

    // Eliminar la clase después de 200ms para que vuelva al tamaño original
    setTimeout(() => {
        buttonImg.classList.remove('grow');
    }, 200);  // Duraión del efecto
}



// Cambiar la imagen del árbol según la fase
function changeTreeImage() {
    const tree = document.getElementById('tree');
    tree.style.backgroundImage = `url('img/fase${growthPhase}.png')`;  // Cambia la imagen del árbol
}

// pausar/despausar el tiempo con retroalimentación visual
function togglePause() {
    paused = !paused;
    const pauseIcon = document.getElementById('pause-icon');

    if (paused) {
        changeButtonImage('pause-button', 'pausa_click.png', 'despausa.png');
    } else {
        changeButtonImage('pause-button', 'despausa_click.png', 'pausa.png');
    }

    // Aplicar el efecto de agrandar en el botón
    buttonGrowEffect('pause-button');
}


// cmbiar la imagen de los botones al hacer clic
function changeButtonImage(buttonId, clickImage, originalImage) {
    const button = document.getElementById(buttonId).querySelector('img');
    button.src = `img/${clickImage}`;
    setTimeout(() => {
        button.src = `img/${originalImage}`;
    }, 200);  // Vuelve a la imagen original después de 200ms
}

// Función para ajustar la salud del árbol
function adjustHealth(amount) {
    health = Math.max(0, health + amount);  // Asegura que la salud no caiga por debajo de 0
    const healthBar = document.getElementById('health');
    healthBar.style.width = health + '%';  // Actualiza la barra de salud

    if (health > 50) {
        healthBar.style.backgroundColor = 'green';
    } else if (health > 20) {
        healthBar.style.backgroundColor = 'orange';
    } else {
        healthBar.style.backgroundColor = 'red';
    }

    if (health === 0) {
        
    }
}

// Función para reducir la salud automáticamente con el tiempo
setInterval(() => {
    if (!paused) {
        adjustHealth(-7);
    }
}, 2000);

// Cambiar de estación cada 15 segundos
setInterval(() => {
    if (!paused) {
        season = (season + 1) % 4;
console.log('Season changed to:', season);
checkSeasonAndPlayAudio(season);
        document.body.style.backgroundColor = seasons[season];
console.log('Season changed to:', season);
checkSeasonAndPlayAudio(season);
        document.getElementById('season-text').innerText = seasonNames[season];
console.log('Season changed to:', season);
checkSeasonAndPlayAudio(season);
    }
}, 15000);

// Mostrar fase0 desde el inicio
window.onload = function() {
    changeTreeImage();
    const blackScreen = document.getElementById('black-screen');
    blackScreen.style.display = 'block'; // Asegúrate de que sea visible inicialmente
    blackScreen.style.animation = 'slide-out-right 1.5s ease-in-out'; // Aplica la animación

    // Opcional: Ocultar el div después de que termine la animación
    blackScreen.addEventListener('animationend', () => {
        blackScreen.style.display = 'none'; // Oculta el div cuando termina la animación
    });
};


// Animar el div negro al cargar la página
window.onload = function() {
    const blackScreen = document.getElementById('black-screen');
    blackScreen.style.display = 'block'; // Asegurar que sea visible
    blackScreen.style.animation = 'slide-right 1.5s ease-in-out';
    blackScreen.addEventListener('animationend', () => {
        blackScreen.style.display = 'none'; // Ocultar después de la animación
    });
};


// Al cargar la página, animar el div negro para moverse hacia la derecha
window.onload = function() {
    const blackScreen = document.getElementById('black-screen');
    blackScreen.style.display = 'block'; // Mostrar el div
    blackScreen.style.animation = 'slide-out-center 1.5s ease-in-out';

    // Ocultar el div después de la animación
    blackScreen.addEventListener('animationend', () => {
        blackScreen.style.display = 'none';
    });
};

// Revisar si la vida del árbol llega a 0 y recargar la página explícitamente
function checkTreeHealth() {
    if (health === 0) {
        location.reload(); // Recargar la página
    }
}

// Llamar a la función en el intervalo principal para monitorear la vida del árbol
setInterval(checkTreeHealth, 1000); // Verificar cada segundo

// Mostrar la fase 0 del árbol al cargar la página
window.onload = function() {
    const treeElement = document.getElementById('tree'); // Asegúrate de que el ID sea correcto
    if (treeElement) {
        treeElement.src = 'img/tree_phase_0.png'; // Cambia esto al nombre real de la imagen de la fase 0
    }
};
