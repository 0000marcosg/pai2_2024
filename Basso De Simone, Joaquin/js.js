
//contador y timer//

let score = -2; 
let timeLeft = 30; 
let timerInterval;


function startTimer() {
    
    timerInterval = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--; 
            document.getElementById('timer').innerText = `Tiempo: ${timeLeft}`; 
        } else {
            clearInterval(timerInterval); 
            endGame(); 
        }
    }, 1000); 
}

//final del tiempo//

function endGame() {
    document.getElementById('areadejuego').style.display = 'none'; 
    reiniciar.style.display = "block";
    
}

//movimiento de los aliens//

function cambiarPosicion1() {
    let imagen = document.getElementById('alien1');
    let areaDeJuego = document.getElementById('areadejuego');
    
    let anchoMaximo = areaDeJuego.clientWidth - imagen.width;
    let altoMaximo = areaDeJuego.clientHeight - imagen.height;
    
    let nuevaPosicionX = Math.random() * anchoMaximo;
    let nuevaPosicionY = Math.random() * altoMaximo;

    imagen.style.position = 'absolute';
    imagen.style.left = `${nuevaPosicionX}px`;
    imagen.style.top = `${nuevaPosicionY}px`;

    
    score++;
    document.getElementById('score').innerText = `Puntos: ${score}`;
}


function cambiarPosicion2() {
    let imagen = document.getElementById('alien2');
    let areaDeJuego = document.getElementById('areadejuego');
    
    let anchoMaximo = areaDeJuego.clientWidth - imagen.width;
    let altoMaximo = areaDeJuego.clientHeight - imagen.height;
    
    let nuevaPosicionX = Math.random() * anchoMaximo;
    let nuevaPosicionY = Math.random() * altoMaximo;

    imagen.style.position = 'absolute';
    imagen.style.left = `${nuevaPosicionX}px`;
    imagen.style.top = `${nuevaPosicionY}px`;

    
    score++;
    document.getElementById('score').innerText = `Puntos: ${score}`;
}

//sonidos//

function disparar(event) {
    const disparo = document.getElementById('disparo'); 
    disparo.play(); 
}

document.addEventListener('click', disparar);

document.addEventListener('DOMContentLoaded', () => {
    
    function reproducirSonido() {
        const acierto = document.getElementById('acierto'); 
        if (acierto) {
            acierto.play(); 
        } else {
            console.error('Elemento de audio no encontrado');
        }
    }

    document.getElementById('alien1').addEventListener('click', reproducirSonido);
    document.getElementById('alien2').addEventListener('click', reproducirSonido);
});

//iniciar todo de nuevo al recargar//

window.onload = function() {
    startTimer(); 
    cambiarPosicion1(); 
    cambiarPosicion2(); 
}

//Reiniciar//

function recargarpagina() {
    location.reload(); 
  }