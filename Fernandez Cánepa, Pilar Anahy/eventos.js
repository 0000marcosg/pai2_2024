
const contenedorGlobos = document.getElementById('contenedor-globos');
const contadorPuntos = document.getElementById('contador-puntos');
const contenedorCielo = document.querySelector('.cielo');

// Configuración inicial
let maxGlobos = 3; // número inicial máximo de globos
let intervaloGlobos = 2000; // tiempo inicial entre globos 

// Variables para los puntos y niveles
let puntos = 0;
let nivel = 1;

// sonido de explosión para los globos
const sonidoExplosion = new Audio('sonidos/explosion1.mp3');

// función para reproducir sonido de explosión
function reproducirSonido() {
    sonidoExplosion.currentTime = 0; // reinicia el sonido
    sonidoExplosion.play();
}

// Función para crear un globo
function crearGlobo() {
    if (document.querySelectorAll('.globo').length >= maxGlobos) return; // Respetar el límite de globos

    const globo = document.createElement('div');
    globo.classList.add('globo');

    // Selección de imagen aleatoria para el globo
    const globosImagenes = [
        'img/globo1.png', 'img/globo2.png', 'img/globo3.png', 'img/globo4.png',
        'img/globo5.png', 'img/globo6.png', 'img/globo7.png', 'img/globo8.png',
        'img/globo9.png', 'img/globo10.png'
    ];
    globo.style.backgroundImage = `url(${globosImagenes[Math.floor(Math.random() * globosImagenes.length)]})`;

    // Posición aleatoria en el contenedor
    globo.style.left = Math.random() * 90 + 'vw';

    // Velocidad fija de flotación
    globo.style.animation = 'flotar 5s linear';

    // Evento al hacer clic en el globo (explotar)
    globo.addEventListener('click', () => {
        reproducirSonido();  // reproduce el sonido de explosión
        globo.remove();  // elimina el globo al hacer clic
        puntos++;  // aumenta los puntos
        contadorPuntos.textContent = puntos;

        // Cambia de nivel cada 15 globos explotados
        if (puntos % 15 === 0) {
            actualizarNivel();
        }
    });

    contenedorGlobos.appendChild(globo);

    // Remover el globo una vez termina la animación de flotación
    globo.addEventListener('animationend', () => {
        globo.remove();
    });
}

// Función para actualizar el nivel
function actualizarNivel() {
    nivel++;
    maxGlobos += 2; // aumenta el número máximo de globos 
    intervaloGlobos = Math.max(500, intervaloGlobos - 200); // reduce el tiempo entre globos hasta un límite

    // Cambia el color del fondo según el nivel
    contenedorCielo.style.backgroundColor = `hsl(${nivel * 20}, 70%, 80%)`;

    // Reinicia el intervalo de creación de globos para aplicar los cambios
    reiniciarIntervaloGlobos();
}

// Función para reiniciar el intervalo de creación de globos
let intervaloCreacion;

function reiniciarIntervaloGlobos() {
    clearInterval(intervaloCreacion); // Detiene el intervalo anterior
    intervaloCreacion = setInterval(crearGlobo, intervaloGlobos); // Reinicia el intervalo con el nuevo tiempo
}

// Crea nubes en el fondo
function crearNubes() {
    const nubesImagenes = ['img/nube1.png', 'img/nube2.png'];

    for (let i = 1; i <= 5; i++) {  // Se crean 5 nubes
        const nube = document.createElement('div');
        nube.classList.add('nube');
        nube.style.backgroundImage = `url(${nubesImagenes[Math.floor(Math.random() * nubesImagenes.length)]})`;

        // Colocación aleatoria de las nubes en la pantalla
        nube.style.left = Math.random() * 100 + 'vw'; // dispersa las nubes a lo largo del ancho de la pantalla
        nube.style.top = Math.random() * 60 + 'vh';  // aumenta el rango vertical entre nubes

        contenedorCielo.appendChild(nube);

        // elimina la nube cuando termina la animación
        nube.addEventListener('animationend', () => {
            nube.remove();
        });
    }
}


// Función para reiniciar la animación de las nubes
function reiniciarNubes() {
    // Elimina todas las nubes existentes
    document.querySelectorAll('.nube').forEach(nube => nube.remove());

    // Vuelve a crear las nubes con la animación inicial
    crearNubes();
}

// Inicializa el juego
crearNubes();
intervaloCreacion = setInterval(crearGlobo, intervaloGlobos); // Intervalo inicial para la creación de globos
