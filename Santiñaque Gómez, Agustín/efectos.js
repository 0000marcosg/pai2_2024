const pelota = document.getElementById("pelota");
const arco = document.querySelector(".arco");
const botonDisparo = document.getElementById("boton disparo");
const marcador = document.getElementById("marcador");

let contadorColisiones = 0;

const sonidoColision = new Audio('audio/Gol de Ale Silva a Mineiro (sonido ambiente).mp3');

botonDisparo.addEventListener("click", function () {
    pelota.style.animation = "none"; 
    pelota.offsetHeight; 
    pelota.style.animation = "dispararpelota 2s forwards";
    pelota.addEventListener("animationend", function handleAnimationEnd(event) {
        if (event.animationName === "dispararpelota") {
            pelota.removeEventListener("animationend", handleAnimationEnd); 
        }
    });

    const intervaloColision = setInterval(() => {
        if (detectarColision(pelota, arco)) {
            contadorColisiones++; 
            marcador.textContent = `GOLES: ${contadorColisiones}`;
            clearInterval(intervaloColision);

            sonidoColision.currentTime = 5;
            sonidoColision.play();

            setTimeout(() => {
                sonidoColision.pause();
                sonidoColision.currentTime = 0;
            }, 6000);

            deteccionHabilitada = false;
            setTimeout(() => {
                deteccionHabilitada = true;
            }, 2000);

            clearInterval(intervaloColision);
        }
    }, 50);
});

function detectarColision(pelota, arco) {
    var rect1 = pelota.getBoundingClientRect();
    var rect2 = arco.getBoundingClientRect();
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}
