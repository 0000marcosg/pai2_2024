let curitasColocadas = 0;
let corazonesReparados = 0;

const corazon = document.getElementById('corazon');
const contador = document.getElementById('life-count');
const curitas = document.querySelectorAll('.curita');

const musicaRoto = document.getElementById('musicaRoto');
const musicaSano = document.getElementById('musicaSano');


document.getElementById('startButton').addEventListener('click', () => {
    musicaRoto.play();
});

function applyBandage(curita) {
     if(curitasColocadas < 3) {
    curitasColocadas++;

    curita.style.position ="absolute";
    curita.style.left = `${Math.random() * 350}px`;
    curita.style.top = `${Math.random() * 400}px`;
    

    document.querySelector('.corazon-container').appendChild(curita);

    if(curitasColocadas === 3){
        sanarCorazon();
    }
  }
}

function sanarCorazon() {
    musicaRoto.pause();
    musicaRoto.currentTime = 0;
    musicaSano.play();

corazon.src = "img/corazonsano.png";
// OCULTAR CURITAS //
curitas.forEach(curita => {
    curita.style.display = "none";
});

corazonesReparados++;
contador.textContent = corazonesReparados;

setTimeout(() => {
    corazon.src = "img/corazonroto.png";

    // APARECEN CURITAS DE NUEVO //
    curitas.forEach(curita => {
        curita.style.display = "block";
    });

    resetCuritas();

    musicaSano.pause();
    musicaSano.currentTime = 0;
    musicaRoto.play();
 }, 2000);
}

function resetCuritas(){
    curitasColocadas = 0;
    curitas.forEach(curita => {
        curita.style.position ="static";
        document.querySelector('.curitas-container').appendChild(curita);
    });
}

curitas.forEach(curita => {
    curita.addEventListener('click', () => applyBandage(curita));
});