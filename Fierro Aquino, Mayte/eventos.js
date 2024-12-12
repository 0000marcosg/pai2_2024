// Variables del juego
var colores = ["red", "yellow", "blue"];
var colorCorrecto;
var tiempoRestante;
var temporizador;
var jugando = false;
var contadorAciertos = 0;

// Selecciona los audios
const correctoSound = document.getElementById('correct-sound');
const incorrectoSound = document.getElementById('incorrect-sound');

// Función para reproducir el sonido adecuado
function playSound(isCorrect) {
    if (isCorrect) {
        correctoSound.currentTime = 0; // Reinicia el audio si ya se estaba reproduciendo
        correctoSound.play().catch((err) => {
            console.error("Error al reproducir el audio correcto:", err);
        });
    } else {
        incorrectoSound.currentTime = 0; // Reinicia el audio si ya se estaba reproduciendo
        incorrectoSound.play().catch((err) => {
            console.error("Error al reproducir el audio incorrecto:", err);
        });
    }
}

// Inicia el juego
function iniciarJuego() {
    jugando = true;
    document.getElementById("game-over").style.display = "none";
    document.getElementById("start-button").style.display = "none";
    
    // Define los nombres de los colores en español
    var nombresTexto = ["ROJO", "AMARILLO", "AZUL"];
    var coloresMap = {
        "ROJO": "red",
        "AMARILLO": "yellow",
        "AZUL": "blue"
    };
    
    var nombreTexto = nombresTexto[Math.floor(Math.random() * nombresTexto.length)];
    colorCorrecto = coloresMap[nombreTexto];
    
    var colorTexto = colores[Math.floor(Math.random() * colores.length)];
    var colorTextoVisual = colorTexto === "blue" ? "royalblue" : colorTexto;
    
    var colorTextElement = document.getElementById("color-text");
    colorTextElement.innerText = nombreTexto;
    colorTextElement.style.color = colorTextoVisual;
    
    tiempoRestante = 4;
    actualizarTiempo();
    temporizador = setInterval(actualizarTiempo, 1000);
}

// Actualiza el tiempo restante
function actualizarTiempo() {
    tiempoRestante -= 1;
    if (tiempoRestante <= 0) {
        finDelJuego();
        playSound(false);
    }
}

// Verifica el color seleccionado
function verificarColor(colorSeleccionado) {
    if (!jugando) return;

    if (colorSeleccionado === colorCorrecto) {
        contadorAciertos++; // Incrementa los aciertos
        playSound(true);
        clearInterval(temporizador);
        iniciarJuego();
    } else {
        playSound(false);
        finDelJuego();
    }
}

function finDelJuego() {
    jugando = false;
    clearInterval(temporizador);

    // Actualiza el texto del elemento para mostrar los aciertos
    const gameOverElement = document.getElementById("game-over");
    gameOverElement.innerText = `Aciertos: ${contadorAciertos}`;
    gameOverElement.style.display = "block"; // Asegúrate de que sea visible

    // Reinicia el botón de inicio
    document.getElementById("start-button").style.display = "inline-block";

    // Reinicia el contador de aciertos para el próximo juego
    contadorAciertos = 0;
}
