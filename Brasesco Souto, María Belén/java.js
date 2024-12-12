var sonidoMovimiento = new Audio("sonidos/movimiento.mp3");
var sonidoPunto = new Audio("sonidos/punto.mp3");
var sonidoObstaculo = new Audio("sonidos/obstaculo.wav");

var musicaFondo = document.getElementById('musica-fondo');
musicaFondo.volume = 0.5;
musicaFondo.loop = true;

function reproducirSonido(sonido) {
    sonido.currentTime = 0;
    sonido.play().catch((error) => {
        console.error("Error al reproducir sonido:", error);
    });
}

function pausarSonido(sonido) {
    sonido.pause();
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        if (musicaFondo.paused) {
            musicaFondo.play();
        }
        reproducirSonido(sonidoMovimiento);
    }
});

var pacman = document.getElementById('pacman');
var flexContainer = document.getElementById('flex-container');
var contadorElement = document.getElementById('contador');

var pacmanY = 180;
var pacmanX = 100;
var puntos = 0;

document.addEventListener('keydown', function (s) {
    if (s.key === 'ArrowUp' && pacmanY > 0) {
        pacmanY -= 40;
        reproducirSonido(sonidoMovimiento);
    } else if (s.key === 'ArrowDown' && pacmanY < flexContainer.offsetHeight - pacman.offsetHeight) {
        pacmanY += 40;
        reproducirSonido(sonidoMovimiento);
    }
    pacman.style.top = pacmanY + 'px';
});

function detectarColision(objeto1, objeto2) {
    var rect1 = objeto1.getBoundingClientRect();
    var rect2 = objeto2.getBoundingClientRect();
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}


function cambiarImagenConAnimacion(tipo) {
    if (tipo === 'obstaculo') {
        pacman.style.backgroundImage = "url('imagenes/rojo.png')"
    } else if (tipo === 'punto') {
        pacman.style.backgroundImage = "url('imagenes/verde.png')";
    }
    pacman.classList.add('shake');

    setTimeout(() => {
        pacman.style.backgroundImage = "url('imagenes/personaje.png')";
        pacman.classList.remove('shake');
    }, 500);
   
}



function generarPunto() {
    var punto = document.createElement('div');
    punto.classList.add('punto');
    var randomY = Math.floor(Math.random() * (flexContainer.offsetHeight - 15));
    punto.style.top = `${randomY}px`;
    flexContainer.appendChild(punto);

    var puntoX = flexContainer.offsetWidth;

    function moverPunto() {
        puntoX -= 10;
        punto.style.left = `${puntoX}px`;

        if (puntoX <= -15) {
            punto.remove();
        }

        if (detectarColision(pacman, punto)) {
            punto.remove();
            puntos++;
            contadorElement.textContent = `Puntos: ${puntos}`;
            reproducirSonido(sonidoPunto);
            cambiarImagenConAnimacion('punto');
        } else {
            requestAnimationFrame(moverPunto);
        }
    }

    moverPunto();
}

function generarObstaculo() {
    var obstaculo = document.createElement('div');
    obstaculo.classList.add('obstaculo');
    var randomY = Math.floor(Math.random() * (flexContainer.offsetHeight - 30));
    obstaculo.style.top = randomY + 'px';
    obstaculo.style.left = flexContainer.offsetWidth + 'px';
    flexContainer.appendChild(obstaculo);

    var obstaculoX = flexContainer.offsetWidth;

    function moverObstaculo() {
        obstaculoX -= 5;
        obstaculo.style.left = obstaculoX + 'px';

        if (obstaculoX <= -30) {
            obstaculo.remove();
        }

        if (detectarColision(pacman, obstaculo)) {
            obstaculo.remove();
            puntos--;
            contadorElement.textContent = "Puntos: " + puntos;
            reproducirSonido(sonidoObstaculo);
            cambiarImagenConAnimacion('obstaculo');
        } else {
            requestAnimationFrame(moverObstaculo);
        }
    }

    moverObstaculo();
}

setInterval(function () {
    generarPunto();
    if (Math.random() > 0.1) {
        generarObstaculo();
    }
}, 2500);
