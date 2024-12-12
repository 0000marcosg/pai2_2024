// Configuración inicial y selección de elementos
var contenedorMono = document.getElementById('contenedor-mono');
var monoPrincipal = document.getElementById('mono-principal');
var objetos = document.querySelectorAll('.objetos');

// Configuración de imgenes, tiempos y sonido
var imagenesObjetos = [
    { 
        id: 'banana', 
        img: 'img/banana.png', 
        imgObjetivo: 'img/mono.comiendo.png', 
        tiempo: 3000, 
        sonido: 'sonidos/comiendo.mp3',
        animacion: 'comiendo-animacion'
    },
    { 
        id: 'coco', 
        img: 'img/coco.png', 
        imgObjetivo: 'img/mono.bobo.png', 
        tiempo: 2000, 
        sonido: 'sonidos/golpe.mp3',
        animacion: 'coco-animacion'
    },
    { 
        id: 'celular', 
        img: 'img/celular.png', 
        imgObjetivo: 'img/mono.celular.png', 
        tiempo: 2000, 
        sonido: 'sonidos/mensaje.mp3',
        animacion: 'celular-animacion'
    },
    { 
        id: 'vaso-de-agua', 
        img: 'img/agua.png', 
        imgObjetivo: 'img/mono.agua.png', 
        tiempo: 2000, 
        sonido: 'sonidos/agua.mp3',
        animacion: 'agua-animacion'
    },
    { 
        id: 'plata', 
        img: 'img/billete.png', 
        imgObjetivo: ['img/mono.bailando1.png', 'img/mono.bailando2.png'], 
        tiempo: 7000, 
        sonido: 'sonidos/obsesion.cortado.mp3',
        animacion: 'bailando-animacion'
    },
    { 
        id: 'lentes', 
        img: 'img/lentes.png', 
        imgObjetivo: 'img/mono.lentes.png', 
        tiempo: 2000, 
        sonido: 'sonidos/w.side.cortado.mp3',
        animacion: 'lentes-animacion'
    }
];

var IMAGEN_INICIAL = 'img/mono.normal.png';

// Audio
var audioActual = null;
var audioPool = {};

var interaccionEnCurso = false;

// Reprduccion de sonidos
function reproducirSonido(rutaSonido) {
    // Arreglar audio en bcle
    if (audioActual) {
        audioActual.pause();
        audioActual.currentTime = 0;
    }

    if (!audioPool[rutaSonido]) {
        audioPool[rutaSonido] = new Audio(rutaSonido);
        audioPool[rutaSonido].volume = 0.5; 
    }

    audioActual = audioPool[rutaSonido];
    
    try {
        audioActual.play().catch(error => {
            console.warn('Error al reproducir sonido:', error);
        });
    } catch (error) {
        console.error('Excepción al reproducir sonido:', error);
    }
}

// Arrastre
var objetoActivo = null;
var offsetX = 0;
var offsetY = 0;
var temporizadorRestauracion = null;

function iniciarJuego() {
    imagenesObjetos.forEach(function(objeto) {
        var elemento = document.getElementById(objeto.id);
        elemento.style.backgroundImage = 'url("' + objeto.img + '")';
        elemento.style.cursor = 'grab';
    });

    return obtenerPosicionesIniciales();
}

function obtenerPosicionesIniciales() {
    var posiciones = {};
    var esMovil = window.innerWidth <= 768;

    for (var i = 0; i < objetos.length; i++) {
        var objeto = objetos[i];
        
        if (esMovil) {
            // Posiciones para media screen
            objeto.style.position = 'static';
            posiciones[objeto.id] = { top: 0, left: 0 };
        } else {
            // Posiciones originales de escritorio
            posiciones[objeto.id] = {
                top: objeto.offsetTop,
                left: objeto.offsetLeft
            };
        }
    }
    return posiciones;
}

var posicionesIniciales = iniciarJuego();

// Arrastre media

document.addEventListener('mousedown', function(event) {
    var esMovil = window.innerWidth <= 768;
    
    if (esMovil) {
        var objetoClickeado = event.target.closest('.objetos');
        if (!objetoClickeado) return;
    }
    
    iniciarArrastre(event);
});

function iniciarArrastre(event) {
    event.preventDefault();
    
    objetoActivo = event.target.closest('.objetos');
    if (!objetoActivo) return;
    
    objetoActivo.style.cursor = 'grabbing';
    
    var esMovil = window.innerWidth <= 768;
    var rect = objetoActivo.getBoundingClientRect();
    
    if (esMovil) {
        // Posicin de objetos 
        objetoActivo.style.position = 'absolute';
        objetoActivo.style.left = rect.left + 'px';
        objetoActivo.style.top = rect.top + 'px';
        objetoActivo.style.margin = '0';  
        objetoActivo.style.transform = 'none';  
        
        // Arrastre libre
        contenedorMono.appendChild(objetoActivo);
        
      
        offsetX = rect.width / 2;
        offsetY = rect.height / 2;
    } else {
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
    }
}

document.addEventListener('mousemove', function(event) {
    if (!objetoActivo) return;

    var esMovil = window.innerWidth <= 768;
    var contenedorRect = contenedorMono.getBoundingClientRect();
    
    var nuevoX, nuevoY;
    
    if (esMovil) {
        // Centrar el objeto en el cursor
        nuevoX = event.clientX - contenedorRect.left - offsetX;
        nuevoY = event.clientY - contenedorRect.top - offsetY;
        
        objetoActivo.style.position = 'absolute';
        objetoActivo.style.left = nuevoX + 'px';
        objetoActivo.style.top = nuevoY + 'px';
        objetoActivo.style.zIndex = '1000';
    } else {
        nuevoX = event.clientX - contenedorRect.left - offsetX;
        nuevoY = event.clientY - contenedorRect.top - offsetY;

        objetoActivo.style.position = 'absolute';
        objetoActivo.style.left = nuevoX + 'px';
        objetoActivo.style.top = nuevoY + 'px';
        objetoActivo.style.zIndex = '1000';
    }

    verificarColisionConMonoPrincipal();
});

document.addEventListener('mouseup', function() {
    if (!objetoActivo) return;

    var esMovil = window.innerWidth <= 768;
    var id = objetoActivo.id;
    
    if (esMovil) {
        // En media screen encontrar el contenedor
        var objetosSuperiores = ['banana', 'coco', 'celular'];
        var objetosInferiores = ['vaso-de-agua', 'plata', 'lentes'];
        
        var contenedorOriginal;
        if (objetosSuperiores.includes(id)) {
            contenedorOriginal = document.querySelector('.objetos-superior');
        } else if (objetosInferiores.includes(id)) {
            contenedorOriginal = document.querySelector('.objetos-inferior');
        }
        
        // Resetear y volver a posicion inical
        objetoActivo.style.position = 'static';
        objetoActivo.style.left = '';
        objetoActivo.style.top = '';
        objetoActivo.style.zIndex = '';
        objetoActivo.style.margin = '';
        objetoActivo.style.transform = '';
        
        contenedorOriginal.appendChild(objetoActivo);
    } else {
        var posicion = posicionesIniciales[id];
        objetoActivo.style.top = posicion.top + 'px';
        objetoActivo.style.left = posicion.left + 'px';
    }
    
    objetoActivo.style.cursor = 'grab';
    objetoActivo = null;
});

function buscarObjetoData(id) {
    for (var i = 0; i < imagenesObjetos.length; i++) {
        if (imagenesObjetos[i].id === id) {
            return imagenesObjetos[i];
        }
    }
    return null;
}

function aplicarEfectoColision(objetoData) {
    if (interaccionEnCurso) return;

    // Marcar que una interacción está en curso
    interaccionEnCurso = true;

    // Reproducir sonido
    reproducirSonido(objetoData.sonido);

    monoPrincipal.classList.add(objetoData.animacion);

    if (Array.isArray(objetoData.imgObjetivo)) {
        alternarImagenesMonoPrincipal(objetoData.imgObjetivo, objetoData.tiempo);
    } else {
        monoPrincipal.style.backgroundImage = 'url("' + objetoData.imgObjetivo + '")';
    }

    clearTimeout(temporizadorRestauracion);
    temporizadorRestauracion = setTimeout(function() {
        monoPrincipal.style.backgroundImage = 'url("' + IMAGEN_INICIAL + '")';
        monoPrincipal.classList.remove(objetoData.animacion);
        
        interaccionEnCurso = false;
    }, objetoData.tiempo);
}

function alternarImagenesMonoPrincipal(imagenes, duracionTotal) {
    var intervalo = 1000;
    var tiempoTranscurrido = 0;
    var indice = 0;

    var intercalar = setInterval(function() {
        monoPrincipal.style.backgroundImage = 'url("' + imagenes[indice] + '")';
        indice = (indice + 1) % imagenes.length;
        tiempoTranscurrido += intervalo;

        if (tiempoTranscurrido >= duracionTotal) {
            clearInterval(intercalar);
            monoPrincipal.style.backgroundImage = 'url("' + IMAGEN_INICIAL + '")';
            
            interaccionEnCurso = false;
        }
    }, intervalo);
}

function verificarColisionConMonoPrincipal() {
    if (objetoActivo && verificarColision(objetoActivo, monoPrincipal)) {
        var objetoData = buscarObjetoData(objetoActivo.id);
        if (objetoData) {
            aplicarEfectoColision(objetoData);
        }
    }
}

function verificarColision(el1, el2) {
    if (!el1 || !el2) return false;
    var rect1 = el1.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}