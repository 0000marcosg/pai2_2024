const gotasColores = [
    'img/amarilla.png',
    'img/celeste.png',
    'img/roja.png',
    'img/rosada.png',
    'img/violeta.png'
];

// Reproducir sonido de fondo después de un clic en la página
document.body.addEventListener('click', function() {
    const sonidoFondo = document.getElementById('sonidoFondo');
    sonidoFondo.play();
}, { once: true });

function crearGota() {
    const container = document.querySelector('.container');
    const gota = document.createElement('img');
    
    const indiceAleatorio = Math.floor(Math.random() * gotasColores.length);
    gota.src = gotasColores[indiceAleatorio]; 
    gota.classList.add('gota');

    const tamaño = Math.floor(Math.random() * 100) + 10;
    gota.style.width = `${tamaño}px`;

    gota.style.left = `${Math.random() * 100}vw`;
    const velocidad = Math.random() * 4 + 3;
    gota.style.animationDuration = `${velocidad}s`;

    gota.onclick = explotar;

    container.appendChild(gota);

    setTimeout(() => {
        gota.remove();
    }, velocidad * 1000);
}

function explotar(event) {
    const gota = event.target;
    const sonidoExplosión = document.getElementById('sonidoExplosión');

    sonidoExplosión.play();

    gota.classList.add('explota');

    crearMancha(event.clientX, event.clientY, obtenerColor(gota.src));

    setTimeout(() => {
        gota.remove();
    }, 100);
}

function crearMancha(x, y, color) {
    const container = document.querySelector('.container');
    const mancha = document.createElement('div');
    mancha.classList.add('mancha');
    mancha.style.width = "50px";
    mancha.style.height = "50px";
    mancha.style.left = `${x}px`; 
    mancha.style.top = `${y}px`; 
    mancha.style.backgroundColor = color;

    container.appendChild(mancha);

    setTimeout(() => {
        mancha.remove();
    }, 2000);
}

function obtenerColor(src) {
    switch (src) {
        case '../img/amarilla.png':
            return '#ffaa00';
        case '../img/celeste.png':
            return '#00aaff'; 
        case '../img/roja.png':
            return '#ff007f'; 
        case '../img/rosada.png':
            return '#ff00ff'; 
        case '../img/violeta.png':
            return '#ff00ff'; 
        default:
            return '#ffffff'; 
    }
}

// Genera gotas constantemente
setInterval(crearGota, 500);
