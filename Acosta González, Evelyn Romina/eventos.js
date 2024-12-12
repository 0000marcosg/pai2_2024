let temporizadorApagado;
const imagenesEspeciales = [
    'img/ventanafamilia.png',
    'img/ventanagato.png',
    'img/ventanaperro.png',
    'img/ventanalibro.png',
    'img/ventanapareja.png'
];

let ventanasAsignadas = new Set();
let seAsignaronEspeciales = false;
let probabilidadLadron = 0.15;

var audio = new Audio('audio/ambiente.mp3');
var audio1 = new Audio('audio/sirena.mpeg');
var audio2 = new Audio('audio/perro.mp3');
var audio3 = new Audio('audio/gato.mp3');

audio.volume = 0.1;
audio1.volume = 0.1;

function reproducirSonidoGato() {
    audio3.play();
    audio3.volume = 0.1;
}

function reproducirSonidoPerro() {
    audio2.play();
    audio2.volume = 0.1;
}

function reproducirSonidoAmbiente() {
    audio.play();
    audio.volume = 0.1;
}

function reproducirSonidoSirena() {
    audio1.play();
    audio1.volume = 0.1;
}

function pararSonidoSirena() {
    audio1.pause();
}

function pararSonidoAmbiente() {
    audio.pause();
}

function ajustarProbabilidadResponsive() {
    if (window.innerWidth <= 1200) {
        probabilidadLadron = 0.6;
    } else {
        probabilidadLadron = 0.15;
    }
}

function asignarImagenesEspeciales() {
    const ventanas = document.querySelectorAll('#ventana1 img, #ventana2 img, #ventana3 img, #ventana4 img, #ventana5 img, #ventana6 img, #ventana7 img, #ventana8 img, #ventana9 img, #ventana10 img, #ventana11 img, #ventana12 img, #ventana13 img, #ventana14 img, #ventana15 img');

    const ventanasDisponibles = Array.from(ventanas).filter(ventana => !ventanasAsignadas.has(ventana));
    const ventanasElegidas = ventanasDisponibles.sort(() => Math.random() - 0.5).slice(0, imagenesEspeciales.length);

    ventanasElegidas.forEach((ventana, index) => {
        ventana.dataset.imagenEspecial = imagenesEspeciales[index];
        ventanasAsignadas.add(ventana);
        ventana.src = 'img/ventanaoff.PNG';
    });

    seAsignaronEspeciales = true;
}

function obtenerImagenAleatoria() {
    reproducirSonidoAmbiente();
    const imagenes = ['img/ventanaon.PNG', 'img/ventanaladron.PNG'];

    const pesoVentanaOn = 1 - probabilidadLadron;

    const aleatorio = Math.random();

    if (aleatorio < pesoVentanaOn) {
        return imagenes[0];
    } else {
        return imagenes[1];
    }
}

function cambiarImagen(imgElement) {
    if (!seAsignaronEspeciales) {
        asignarImagenesEspeciales();
    }

    if (ventanasAsignadas.has(imgElement) && imgElement.src.includes('ventanaoff.PNG')) {
        imgElement.src = imgElement.dataset.imagenEspecial;

        if (imgElement.src.includes('ventanaperro.png')) {
            reproducirSonidoPerro();
        } else if (imgElement.src.includes('ventanagato.png')) {
            reproducirSonidoGato();
        }
        return;
    }

    if (ventanasAsignadas.has(imgElement)) {
        return;
    }

    imgElement.src = obtenerImagenAleatoria();

    const ventanas = document.querySelectorAll('#ventana1 img, #ventana2 img, #ventana3 img, #ventana4 img, #ventana5 img, #ventana6 img, #ventana7 img, #ventana8 img, #ventana9 img, #ventana10 img, #ventana11 img, #ventana12 img, #ventana13 img, #ventana14 img, #ventana15 img');

    ventanas.forEach(ventana => {
        if (!ventanasAsignadas.has(ventana) && ventana !== imgElement) {
            ventana.src = 'img/ventanaoff.PNG';
        }
    });

    clearTimeout(temporizadorApagado);

    if (imgElement.src.includes('ventanaladron.PNG')) {
        pararSonidoAmbiente();

        document.getElementById('boton').style.display = 'block';
        document.getElementById('rojo').style.display = 'block';

        reproducirSonidoSirena();
    } else if (imgElement.src.includes('ventanaon.PNG')) {
        temporizadorApagado = setTimeout(() => {
            ventanas.forEach(ventana => {
                if (!ventanasAsignadas.has(ventana)) {
                    ventana.src = 'img/ventanaoff.PNG';
                }
            });
        }, 500);
    }
}

function reiniciarJuego() {
    pararSonidoSirena();
    reproducirSonidoAmbiente();

    document.getElementById('boton').style.display = 'none';
    document.getElementById('rojo').style.display = 'none';

    const ventanas = document.querySelectorAll('#ventana1 img, #ventana2 img, #ventana3 img, #ventana4 img, #ventana5 img, #ventana6 img, #ventana7 img, #ventana8 img, #ventana9 img, #ventana10 img, #ventana11 img, #ventana12 img, #ventana13 img, #ventana14 img, #ventana15 img');
    ventanas.forEach(ventana => {
        ventana.src = 'img/ventanaoff.PNG';
        delete ventana.dataset.imagenEspecial;
    });

    ventanasAsignadas.clear();
    seAsignaronEspeciales = false;
    clearTimeout(temporizadorApagado);
}

window.onload = function () {
    ajustarProbabilidadResponsive();
    const ventanas = document.querySelectorAll('#ventana1 img');
    ventanas.forEach(ventana => ventana.onclick = () => cambiarImagen(ventana));
};

window.onresize = ajustarProbabilidadResponsive;
