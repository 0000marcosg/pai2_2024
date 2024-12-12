let tiempoRestante = 10;
let timerInterval;
let pollitoIndex;
const huevos = document.querySelectorAll('.huevo');
const mensaje = document.getElementById('message');
const tiempoElemento = document.getElementById('time');
const audio = new Audio('sonidohuevo.mp3');

function iniciarJuego() {
    mensaje.textContent = '';
    tiempoRestante = 10;
    tiempoElemento.textContent = tiempoRestante;

    pollitoIndex = Math.floor(Math.random() * huevos.length);
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        tiempoRestante--;
        tiempoElemento.textContent = tiempoRestante;

        if (tiempoRestante <= 0) {
            clearInterval(timerInterval);
            mostrarSuperposicion('overlay2');
        }
    }, 1000);

    huevos.forEach((huevo, index) => {
        huevo.src = 'imagenes/huevo.png';
        huevo.alt = 'Huevo cerrado';
        huevo.onclick = () => romperHuevo(index);
        huevo.ontouchstart = () => romperHuevo(index);
    });
}

function romperHuevo(index) {
    reproducirAudio();

    if (index === pollitoIndex) {
        clearInterval(timerInterval);
        huevos[index].src = 'imagenes/pollito.png';
        huevos[index].alt = 'Pollito';
        mostrarSuperposicion('overlay', 'happy');
    } else {
        huevos[index].src = 'imagenes/roto.png';
        huevos[index].alt = 'Huevo roto';

        setTimeout(() => {
            huevos[index].src = 'imagenes/huevo.png';
            huevos[index].alt = 'Huevo cerrado';
        }, 1000);
    }
}

function reproducirAudio() {
    if (audio.paused || audio.ended) {
        audio.play().catch((error) => console.warn('El audio no se pudo reproducir:', error));
    }
}

function mostrarSuperposicion(overlayId, tipo) {
    const overlay = document.getElementById(overlayId);
    const gifTriste = document.getElementById('gif-triste');
    const gifFeliz = document.getElementById('gif-feliz');

    overlay.style.display = 'flex';

    if (overlayId === 'overlay2') {
        gifTriste.style.display = 'block';
        gifFeliz.style.display = 'none';
    } else if (tipo === 'happy') {
        gifTriste.style.display = 'none';
        gifFeliz.style.display = 'block';
    }

    setTimeout(() => {
        ocultarSuperposicion(overlayId);
        iniciarJuego();
    }, 2000);
}

function ocultarSuperposicion(overlayId) {
    const overlay = document.getElementById(overlayId);
    overlay.style.display = 'none';
}

iniciarJuego();
