let minutos = 10; // Minutos iniciales
let segundos = 0; // Segundos iniciales
let bombaDesactivada = false;
let velocidad = 1; // Velocidad inicial del cronómetro en milisegundos
let cuentaAtras; // Declaramos cuentaAtras como variable global
let intervaloMovimiento; // Intervalo para mover la imagen flotante

const cronometro = document.getElementById("cronometro");

// Sonidos
const audioCorte = document.getElementById("audioCorte");
const audioExplosion = document.getElementById("audioExplosion");
const audioVictoria = document.getElementById("audioVictoria");
const audioTemporizador = document.getElementById("audioTemporizador");

// Función para actualizar el cronómetro en pantalla en formato MM:SS
function actualizarCronometro() {
    const minutosTexto = minutos < 10 ? `0${minutos}` : minutos;
    const segundosTexto = segundos < 10 ? `0${segundos}` : segundos;
    cronometro.textContent = `${minutosTexto}:${segundosTexto}`;
}

// Función para iniciar el cronómetro
function iniciarCronometro() {
    cuentaAtras = setInterval(() => {
        if (!bombaDesactivada) {
            if (segundos === 0) {
                if (minutos === 0) {
                    clearInterval(cuentaAtras);
                    explotarBomba();
                } else {
                    minutos--;
                    segundos = 59;
                }
            } else {
                segundos--;
            }
            actualizarCronometro();
        }
    }, velocidad);
}

// Función para mostrar y mover la imagen flotante
function mostrarImagenFlotante() {
    const imagenFlotante = document.getElementById("imagenFlotante");
    imagenFlotante.style.display = "block"; // Muestra el div

    // Mueve el div a posiciones aleatorias cada segundo
    intervaloMovimiento = setInterval(() => {
        const pantallaAncho = window.innerWidth - imagenFlotante.clientWidth;
        const pantallaAlto = window.innerHeight - imagenFlotante.clientHeight;
        
        // Posición aleatoria
        const posicionX = Math.random() * pantallaAncho;
        const posicionY = Math.random() * pantallaAlto;

        // Actualiza la posición del div
        imagenFlotante.style.left = `${posicionX}px`;
        imagenFlotante.style.top = `${posicionY}px`;
    }, 1000); // Cambia cada segundo
}

// Función para cortar cables
function cortarCable(cableId) {
    if (bombaDesactivada) return;

    audioCorte.play();
    const cable = document.getElementById(`cable${['amarillo', 'azul', 'rojo', 'verde', 'violeta'][cableId - 1]}`);
    cable.style.opacity = '0.5'; // Cambia apariencia para indicar que está "cortado"

    // Acciones para cada cable
    if (cableId === 2) {
        // Si se corta el cable azul, muestra la imagen flotante
        mostrarImagenFlotante();
    } else if (cableId === 3) {
        // Cable rojo desactiva la bomba
        desactivarBomba();
    } else if (cableId === 4) {
        // Si se corta el cable verde, cambia los minutos a 3 sin reiniciar el cronómetro
        minutos = 3;
        actualizarCronometro(); // Actualiza la pantalla para mostrar el nuevo tiempo
    } else if (cableId === 5) {
        // Si se corta el cable violeta, activa el movimiento del cable rojo
        const cableRojo = document.getElementById("cablerojo");
        cableRojo.classList.add("mover"); // Aplica la clase CSS para el movimiento
    } else {
        explotarBomba();
    }
}

// Función para desactivar la bomba
function desactivarBomba() {
    bombaDesactivada = true;
    clearInterval(cuentaAtras); // Detiene el cronómetro
    audioTemporizador.pause();
    audioVictoria.play();
    mostrarResultado("¡Desactivaste la bomba! ¡Ganaste!");
}

// Función para explotar la bomba
function explotarBomba() {
    bombaDesactivada = true;
    clearInterval(cuentaAtras); // Detiene el cronómetro
    audioTemporizador.pause();
    audioExplosion.play();
    mostrarResultado("¡BOOM! La bomba explotó.");
}

// Función para mostrar el resultado
function mostrarResultado(mensaje) {
    const resultado = document.getElementById("resultado");
    const mensajeResultado = document.getElementById("mensajeResultado");
    mensajeResultado.textContent = mensaje;
    resultado.style.display = "block";
}

// Función para reiniciar el juego
function reiniciarJuego() {
    clearInterval(intervaloMovimiento); // Detiene el movimiento de la imagen flotante
    window.location.reload();
}

// Inicia el cronómetro y el sonido del temporizador al cargar la página
window.onload = function() {
    actualizarCronometro(); // Muestra el tiempo inicial
    audioTemporizador.play();
    iniciarCronometro();
};
function mostrarImagenFlotante() {
    const imagenFlotante = document.getElementById("imagenFlotante");
    imagenFlotante.style.display = "block";
    imagenFlotante.classList.add("moving"); // Adds moving class to trigger animation
}