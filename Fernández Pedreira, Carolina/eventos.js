let contador = 0;
const contadorSpan = document.getElementById("contador");
const audio = new Audio("sfx/nam.mp3");

// Función genérica para manejar la desaparición de las moscas
function manejarMosca(moscaId, moscaElement) {
    // Si la mosca ya ha desaparecido, no hacer nada
    if (window[moscaId]) return;

    // Reproduce sonido "ñam"
    audio.play();

    // Mosca desaparece
    const mosca = document.getElementById(moscaElement);
    mosca.style.opacity = "0%";

    // Manejar el salto del sapo
    const sapo = document.getElementById("sapo");
    sapo.classList.remove("saltando"); // Eliminar clase para reiniciar la animación
    void sapo.offsetWidth; // Forzar un reflow (necesario para reiniciar la animación)
    sapo.classList.add("saltando"); // Volver a aplicar la animación

    // Incrementar el contador
    contador++;
    contadorSpan.textContent = contador;

    // Cambiar la imagen del sapo según el contador
    cambiarImagenSapo(sapo, contador);

    // Restablecer la mosca después de 1.5 segundos
    setTimeout(() => {
        mosca.style.opacity = "100%";
        window[moscaId] = false;
    }, 1500);

    // Evitar doble clic en la misma mosca
    window[moscaId] = true;
}

// Función para cambiar la imagen del sapo
function cambiarImagenSapo(sapo, contador) {
    if (contador === 2) {
        sapo.style.backgroundImage = "url('img/casco.png')"; // UN CASCO PORQUE TENES TREMENDA CARA DE BOBO CUANDO ENTRAS
    } else if (contador === 4) {
        sapo.style.backgroundImage = "url('img/invierno.png')"; // HACE FRÍO
    } else if (contador === 8) {
        sapo.style.backgroundImage = "url('img/gorro-holandes.png')"; // Y ESTÁS LEJOS DE CASA
    } else if (contador === 16) {
        sapo.style.backgroundImage = "url('img/pirata.png')"; // PORQUE ADOBE SE LO MERECE ¡¡¡¡¡VIVAN LOS PROGRAMAS LIBRES!!!!! dijo Horacio
    } else if (contador === 32) {
        sapo.style.backgroundImage = "url('img/elfo.png')"; // PORQUE PINTÓ
    } else if (contador === 64) {
        sapo.style.backgroundImage = "url('img/verano.png')"; // SE VAN ACABANDO LAS CLASES
    } else if (contador === 128) {
        sapo.style.backgroundImage = "url('img/navidad.png')"; // ALL I WANT FOR CHRISTMAS IIIIIIIS YOUUUUUUUUUUUU!~~~~~~~~~~
    } else if (contador === 256) {
        sapo.style.backgroundImage = "url('img/graduado.png')"; // RECIBIDOS
    } else if (contador === 512) {
        sapo.style.backgroundImage = "url('img/formal.png')"; // AHORA SE PAGA ADOBE (o no)
    } else if (contador === 1024) {
        sapo.style.backgroundImage = "url('img/facherito.png')"; // VAMOS PAI VAMOS PAI
    }
}

// Funciones específicas para cada mosca
function nam() {
    manejarMosca("moscaDesaparecida", "mosca");
}

function nami() {
    manejarMosca("moscaDesaparecidaDos", "mosca2");
}

function namii() {
    manejarMosca("moscaDesaparecidaTres", "mosca3");
}

function namiii() {
    manejarMosca("moscaDesaparecidaCuatro", "mosca4");
}
