// VARIABLES
const objeto1 = document.getElementById('objeto1');
const timerDiv = document.getElementById('timer');
const colisionSonido = new Audio('./sounds/papel.mp3');
const sonidosPajaros = [new Audio('./sounds/pajaro1.mp3'), new Audio('./sounds/pajaro2.mp3')];
let velocidadMinima = 7, velocidadMaxima = 10, cantidadInicialPajaros = 1.5;
let offsetX, offsetY, dragging = false, animacionesIniciadas = false;
let tiempo = 0, intervaloPajaros, intervaloTimer, intervaloColisiones, intervaloNubes;

// SONIDO DE PAJAROS____________________________________________________________________________________
function reproducirSonidoPajaro() {
    if (sonidosPajaros.some(sonido => !sonido.paused)) return; 
    const sonidoSeleccionado = sonidosPajaros[Math.floor(Math.random() * sonidosPajaros.length)];
    sonidoSeleccionado.play().catch(console.error);
}
setInterval(reproducirSonidoPajaro, 8500); // 8.5 segundos

// COLISION ORIGINAL
function detectarColision(objeto1, objeto2) {
    const rect1 = objeto1.getBoundingClientRect();
    const rect2 = objeto2.getBoundingClientRect();
    const centroX1 = rect1.left + rect1.width / 2;
    const centroY1 = rect1.top + rect1.height / 2;
    const centroX2 = rect2.left + rect2.width / 2;
    const centroY2 = rect2.top + rect2.height / 2;
    const distanciaX = centroX1 - centroX2;
    const distanciaY = centroY1 - centroY2;
    const distanciaEntreCentros = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
    const rangoColision = (rect1.width + rect2.width) / 4;
    return distanciaEntreCentros < rangoColision;
}

// INICIO DEL ARRASTRE DEL AVION ________________________________________________________________
function iniciarArrastre(event) {
    offsetX = event.clientX - objeto1.getBoundingClientRect().left;
    offsetY = event.clientY - objeto1.getBoundingClientRect().top;
    dragging = true;
    objeto1.classList.add('inclinacion');
    if (!animacionesIniciadas) iniciarAnimaciones();
}

// MANEJO DEL ARRASTRE_____________________________________________________________________________
function arrastrarObjeto(event) {
    if (!dragging) return;
    const anchoAvion = (objeto1.offsetWidth / window.innerWidth) * 100;
    const altoAvion = (objeto1.offsetHeight / window.innerHeight) * 100;
    const nuevaIzquierda = Math.min(Math.max(((event.clientX - offsetX) / window.innerWidth) * 100, 0), 100 - anchoAvion);
    const nuevaArriba = Math.min(Math.max(((event.clientY - offsetY) / window.innerHeight) * 100, 0), 100 - altoAvion);
    objeto1.style.left = `${nuevaIzquierda}%`;
    objeto1.style.top = `${nuevaArriba}%`;
}

// DETIENE EL ARRASTRE, SACA LA INCLINACION_________________________________________________________
function detenerArrastre() {
    dragging = false;
    objeto1.classList.remove('inclinacion');
}

// ANIMACIONES
function iniciarAnimaciones() {
    animacionesIniciadas = true;
    intervaloPajaros = setInterval(() => {
        crearPajaros(Math.floor(cantidadInicialPajaros), 'pajaro1');
        crearPajaros(Math.floor(cantidadInicialPajaros), 'pajaro2');
        incrementarDificultad();
    }, 10000);
    intervaloTimer = setInterval(() => {
        tiempo++;
        timerDiv.textContent = `Tiempo: ${tiempo} s`;
    }, 1000);
    intervaloNubes = setInterval(crearNubes, 5000);
    intervaloColisiones = setInterval(detectarColisiones, 100);
}

// FUNCION DE LA CREACION DE PAJAROS__________________________________________________________________
function crearPajaros(cantidad, clasePajaro) {
    for (let i = 0; i < cantidad; i++) {
        const pajaro = document.createElement('div');
        pajaro.classList.add(clasePajaro, 'pajaro');
        pajaro.style.top = `${Math.random() * (100 - 5)}%`;
        pajaro.style.right = '-50px';
        pajaro.style.animationDuration = `${Math.random() * (velocidadMaxima - velocidadMinima) + velocidadMinima}s`;
        document.body.appendChild(pajaro);
    }
}

// FUNCION DE LA CREACION DE NUBES___________________________________________________________________
function crearNubes() {
    const nube = document.createElement('div');
    nube.classList.add('nube');
    nube.style.left = `${Math.random() * 100}%`;
    document.body.appendChild(nube);
    nube.addEventListener('animationend', () => nube.remove());
}

// FUNCION PARA INCREMENTAR LA DIFICULTAD_________________________________________________________
function incrementarDificultad() {
    cantidadInicialPajaros += 0.25;
    velocidadMinima = Math.max(3, velocidadMinima - 0.1);
    velocidadMaxima = Math.max(6, velocidadMaxima - 0.1);
}

// REINICIO DE NIVEL_______________________________________________________________________________
function reiniciarNivel() {
    objeto1.style.left = '0px';
    objeto1.style.top = '0px';
    tiempo = 0;
    timerDiv.textContent = `Tiempo: ${tiempo} s`;
    clearInterval(intervaloPajaros);
    clearInterval(intervaloTimer);
    clearInterval(intervaloColisiones);
    clearInterval(intervaloNubes);
    document.querySelectorAll('.pajaro, .nube').forEach(el => el.remove());
    animacionesIniciadas = false;
    sonidosPajaros.forEach(sonido => {
        sonido.pause();
        sonido.currentTime = 0;
    });
}

// DETECTOR DE COLISIONES con mensaje___________________________________________________________________________
function detectarColisiones() {
    document.querySelectorAll('.pajaro').forEach(pajaro => {
        if (detectarColision(objeto1, pajaro)) {
            clearInterval(intervaloPajaros);
            clearInterval(intervaloTimer);
            clearInterval(intervaloColisiones);
            clearInterval(intervaloNubes);
            colisionSonido.play();
            alert(`¡Perdiste! Duraste ${tiempo} segundos.`);
            reiniciarNivel();
        }
    });
}

// EVENTLISTENERS____________________________________________________________________________________
objeto1.addEventListener('mousedown', iniciarArrastre);
document.addEventListener('mousemove', arrastrarObjeto);
document.addEventListener('mouseup', detenerArrastre);
