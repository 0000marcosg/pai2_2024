// Variables del juego
let numeroSecreto = Math.floor(Math.random() * 10); // Número aleatorio
let intentosRestantes = 3;
let numeroSeleccionado = null; // Variable para guardar el número seleccionado

// Función para mostrar el número en la pantalla "pantalla-numeros"
function mostrarNumero(rutaImagen) {
    // Mapa de nombres de fotos a números
    const imagenesMap = {
        "uno.png": 1,
        "dos.png": 2,
        "tres.png": 3,
        "cuatro.png": 4,
        "cinco.png": 5,
        "seis.png": 6,
        "siete.png": 7,
        "ocho.png": 8,
        "nueve.png": 9,
        "cero.png": 0,
    };

    // Extraer el nombre del archivo
    const nombreArchivo = rutaImagen.split("/").pop();

    // Asignar el número
    numeroSeleccionado = imagenesMap[nombreArchivo] !== undefined ? imagenesMap[nombreArchivo] : null;

    // Mostrar el número seleccionado en la pantalla llamada "pantalla-numeros"
    const pantallaNumero = document.getElementById("pantalla-numeros");
    pantallaNumero.textContent = numeroSeleccionado !== null ? numeroSeleccionado : "";
}

// Función para mostrar intentos
function mostrarMensaje(mensaje) {
    const intentoSection = document.querySelector('.attempt-section');
    intentoSection.textContent = mensaje;  // Esto inserta el mensaje como texto dentro del contenedor
}

// Función para enviar la selección y verificar si el jugador adivinó el número
function enviarBoton() {
    // Verificar si el jugador ha seleccionado un número
    if (numeroSeleccionado === null) {
        mostrarMensaje("Selecciona un número.");
        return;
    }

    // Verificar si el número está bien, mayor o menor
    if (numeroSeleccionado === numeroSecreto) {
        mostrarMensaje("¡Adivinaste el número! 🎉");
        reiniciarJuego();
    } else {
        intentosRestantes--;
        if (intentosRestantes > 0) {
            let pista = numeroSeleccionado < numeroSecreto ? "Es mayor." : "Es menor.";
            mostrarMensaje(`${pista} Intentos restantes: ${intentosRestantes}`);
        } else {
            mostrarMensaje(`Fin del juego. El número era ${numeroSecreto}.`);
            reiniciarJuego();
        }
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    numeroSecreto = Math.floor(Math.random() * 10); // Crear otro número aleatorio nuevo
    intentosRestantes = 3;
    numeroSeleccionado = null;

    // Limpiar la pantalla del número
    const pantallaNumero = document.getElementById("pantalla-numeros");
    pantallaNumero.textContent = "";
}

// Crear un objeto de audio para los números
const sonidoTecla = new Audio('./imagenes/ui-click-43196.mp3');

// Crear un objeto de audio para el botón "enviar"
const sonidoEnviar = new Audio('./imagenes/menu-button-89141.mp3');

// Función para reproducir el sonido de las teclas numéricas
function reproducirSonido() {
    sonidoTecla.currentTime = 0; // Reinicia el sonido
    sonidoTecla.play().catch(error => console.error('Error al reproducir el sonido:', error));
}

// Función para reproducir el sonido del botón "enviar"
function reproducirSonidoEnviar() {
    sonidoEnviar.currentTime = 0; // Reinicia el sonido
    sonidoEnviar.play().catch(error => console.error('Error al reproducir el sonido:', error));
}

// Asignar el evento de clic a las imágenes de números
document.querySelectorAll('.number-display img').forEach(img => {
    img.addEventListener('click', reproducirSonido);
});

// Asignar el evento de clic a la imagen "enviar"
document.querySelector('.send-button img[alt="Botón Enviar"]').addEventListener('click', reproducirSonidoEnviar);
