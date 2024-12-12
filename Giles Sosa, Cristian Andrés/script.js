const elementos = document.querySelectorAll(".elemento");
const intervalos = [];
const velocidades = {};
const contadores = {
    Elemento1: 0,
    Elemento2: 0,
    Elemento3: 0,
    Elemento4: 0
};

const sonidoPostInicio = new Audio("sounds/musica1.mp3");
sonidoPostInicio.loop = true;

const sonidoClick = new Audio("sounds/poit.mp3");

function asignarPosicionInicial(elemento) {
    const anchoPantalla = window.innerWidth - elemento.offsetWidth;
    const altoPantalla = window.innerHeight - elemento.offsetHeight;

    const posX = Math.floor(Math.random() * anchoPantalla);
    const posY = Math.floor(Math.random() * altoPantalla);

    elemento.style.left = posX + "px";
    elemento.style.top = posY + "px";
}

function moverAleatoriamente(elemento) {
    const anchoPantalla = window.innerWidth;
    const altoPantalla = window.innerHeight;
    const anchoElemento = elemento.offsetWidth;
    const altoElemento = elemento.offsetHeight;

    let nuevaPosX = elemento.offsetLeft + velocidades[elemento.id].x;
    let nuevaPosY = elemento.offsetTop + velocidades[elemento.id].y;

    if (nuevaPosX <= 0 || nuevaPosX + anchoElemento >= anchoPantalla) {
        velocidades[elemento.id].x *= -1;
    }
    if (nuevaPosY <= 0 || nuevaPosY + altoElemento >= altoPantalla) {
        velocidades[elemento.id].y *= -1;
    }

    elemento.style.left = nuevaPosX + "px";
    elemento.style.top = nuevaPosY + "px";
}

function crearFragmentos(elemento) {
    const contenedor = document.createElement("div");
    contenedor.className = "fragment-container";
    contenedor.style.left = `${elemento.offsetLeft}px`;
    contenedor.style.top = `${elemento.offsetTop}px`;

    for (let i = 0; i < 6; i++) {
        const fragmento = document.createElement("div");
        fragmento.className = "fragment";
        fragmento.style.backgroundImage = elemento.style.backgroundImage;

        const angulo = Math.random() * 2 * Math.PI;
        const distancia = Math.random() * 100;

        fragmento.style.transform = `translate(${Math.cos(angulo) * distancia}px, ${Math.sin(angulo) * distancia}px)`;

        contenedor.appendChild(fragmento);
    }

    document.body.appendChild(contenedor);

    setTimeout(() => {
        contenedor.remove();
    }, 800);
}

function explotarElemento(elemento) {
    elemento.classList.add("explosion");

    setTimeout(() => {
        elemento.style.display = "none";
        elemento.classList.remove("explosion");
    }, 500);

    crearFragmentos(elemento);
}

function reposicionarElemento(elemento) {
    sonidoClick.currentTime = 0; 
    sonidoClick.play();

    explotarElemento(elemento);

    const anchoPantalla = window.innerWidth - elemento.offsetWidth;
    const altoPantalla = window.innerHeight - elemento.offsetHeight;

    const posX = Math.floor(Math.random() * anchoPantalla);
    const posY = Math.floor(Math.random() * altoPantalla);

    setTimeout(() => {
        elemento.style.left = posX + "px";
        elemento.style.top = posY + "px";
        elemento.style.display = "block";
    }, 500);

    velocidades[elemento.id].velocidad += 1;
    velocidades[elemento.id].x = velocidades[elemento.id].velocidad * (Math.random() < 0.5 ? -1 : 1);
    velocidades[elemento.id].y = velocidades[elemento.id].velocidad * (Math.random() < 0.5 ? -1 : 1);

    contadores[elemento.id]++;
    document.getElementById('Contador' + elemento.id.slice(-1)).textContent = contadores[elemento.id];

    clearInterval(intervalos[elemento.id]);
    intervalos[elemento.id] = setInterval(() => moverAleatoriamente(elemento), 20);
}

function posicionInicialAleatoria() {
    elementos.forEach(elemento => {
        asignarPosicionInicial(elemento);
    });
}

function iniciarJuego() {
    document.getElementById("botonInicio").style.display = "none";

    
    sonidoPostInicio.play();

   
    elementos.forEach(elemento => {
        elemento.style.display = "block"; 
    });

    posicionInicialAleatoria(); 

    elementos.forEach(elemento => {
        velocidades[elemento.id] = { velocidad: 2, x: 2, y: 2 };
        intervalos[elemento.id] = setInterval(() => moverAleatoriamente(elemento), 20);
        elemento.addEventListener("click", () => reposicionarElemento(elemento));
    });
}


function ajustarElementos() {
    const anchoPantalla = window.innerWidth;
    const altoPantalla = window.innerHeight;

    elementos.forEach(elemento => {
        const maxX = anchoPantalla - elemento.offsetWidth;
        const maxY = altoPantalla - elemento.offsetHeight;

        let nuevaX = parseInt(elemento.style.left) || 0;
        let nuevaY = parseInt(elemento.style.top) || 0;

        
        if (nuevaX < 0) nuevaX = 0;
        if (nuevaY < 0) nuevaY = 0;
        if (nuevaX > maxX) nuevaX = maxX;
        if (nuevaY > maxY) nuevaY = maxY;

        elemento.style.left = `${nuevaX}px`;
        elemento.style.top = `${nuevaY}px`;
    });
}


window.addEventListener("resize", ajustarElementos);

document.getElementById("botonInicio").addEventListener("click", iniciarJuego);


