// Las funcionalidades implementadas en este script fueron con el apoyo de ChatGPT, como ultimo recurso para completar la interfaz, como tambien consultado previamente con un docente para verificar que este sea legal, por lo cual fue aprobado.

// La cantidad excesiva de comentarios en el código es para facilitar nuestro entendimiento, ya que es esencial saber lo que estamos haciendo.

let contador = 0; // El contador comienza en cero para comenzar a contar
const contadorSpan = document.getElementById("contador");
const container = document.getElementById("container");
const globos = document.querySelectorAll(".globo");
let globosRestantes = globos.length;  // Número total de globos pinchados
const explosionSound = new Audio("audio/explosion.mp3"); // Carga el sonido de explosión
const backgroundSound = new Audio("audio/circus.mp3"); // Carga el sonido de fondo

// Sonido de fondo
backgroundSound.loop = true; // El sonido se reproduce en bucle
backgroundSound.volume = 0.4; // Ajusta el volumen del sonido

// Función que se ejecuta cuando se hace click en un globo
function explotarGlobo(event) {
    const globo = event.target;

    // Si el elemento clickeado no es un globo, o si ya está oculto o ya ha explotado, no hace nada
    if (!globo.classList.contains('globo') || globo.classList.contains('oculto') || globo.classList.contains('explosion')) {
        return; // Sale de la función sin hacer nada
    }

    // Reproduce el sonido de fondo solo al explotar el primer globo
    if (contador === 0 && backgroundSound.paused) {
        backgroundSound.play();
    }

    // Incrementa el contador de globos explotados y actualiza el texto en pantalla
    contador++;
    contadorSpan.textContent = contador;

    // Reproduce el sonido de explosión
    explosionSound.currentTime = 0; // Reinicia el sonido
    explosionSound.play(); // Reproduce el sonido

    // Añade la clase "explosion" al globo para que se active la animación de explosión
    globo.classList.add("explosion");

    // Espera 5s antes de ocultar el globo después de la animación
    setTimeout(() => {
        globo.classList.add("oculto");
    }, 500);

    // Decrementa el número de globos restantes
    globosRestantes--;

    // Verifica si todos los globos han sido pinchados
    // Si todos los globos han sido pinchados, reaparecen luego de 1s
    if (globosRestantes === 0) {
        setTimeout(reaparecerGlobos, 1000); 
    }
}

// Función para reaparecer los globos
function reaparecerGlobos() {
    const globosOcultos = document.querySelectorAll('.globo.oculto'); // Selecciona los globos que están ocultos

    // Si todos los globos están ocultos, los hacemos reaparecer
    if (globosOcultos.length === globos.length) {
        globosRestantes = globos.length; // Restablece el contador de globos restantes

        // Reaparecen todos los globos y se restauran las animaciones
        globos.forEach(globo => {
            globo.classList.remove("oculto", "explosion"); // Elimina las clases 'oculto' y 'explosion' para que los globos reaparezcan

            // Restaura la animación de los globos en css
            globo.style.WebkitAnimation = '';
            globo.style.animation = '';
        });
    }
}

// Asigna el evento "click" al contenedor de los globos
container.addEventListener("click", explotarGlobo);
