//eventosf1.js
let timer;
let seconds = 15;
let count = 0;
const taladroSound = document.getElementById('taladro-sound');


// Iniciar el temporizador al hacer clic en el botón "Click Aquí"
// document.getElementById('contador').addEventListener('click', startTimer);


function startTimer() {
    timer = setInterval(() => {
    console.log("Segundos: " + seconds)
        if (seconds > 0) {
        seconds--;
        document.querySelector('.cronometro').innerText = formatTime(seconds);
        }else {     
        clearInterval(timer);
        }
    }, 1000);
}

function formatTime(sec) {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Cambiar imagen al hacer clic en el botón del contador
document.getElementById("contador").addEventListener('click', contadorOnClick);

function contadorOnClick() {
    if(seconds == 0){
        return;
    }
    if (count === 0) {
        startTimer();
    }
    count++;
    this.innerHTML = `<i class="fas fa-cog"></i> ${count}`;
    taladroSound.currentTime = 0;
    taladroSound.play();
    this.innerHTML = count;

    const image = document.getElementById('auto');
    
    const currentSrc = image.src.split('/').pop(); 

    if (currentSrc === "f1completo.png") {
        image.src = "img/f1ruedadel_derecha.png";
    } else if (currentSrc === "f1ruedadel_derecha.png") {
        image.src = "img/completo2.png";
    } else if (currentSrc === "completo2.png") {
        image.src = "img/f1ruedadel_izquierda.png";
    } else if (currentSrc === "f1ruedadel_izquierda.png") {
        image.src = "img/completo3.png";
    } else if (currentSrc === "completo3.png") {
        image.src = "img/f1ruedatrasera_derecha.png";
    } else if (currentSrc === "f1ruedatrasera_derecha.png") {
        image.src = "img/completo4.png";
    } else if (currentSrc === "completo4.png") {
        image.src = "img/f1ruedatrasera_izquierda.png";
    } else {
        image.src = "img/f1completo.png";
    }
}

// Evento para reiniciar el timer
document.getElementById('reset').addEventListener('click', resetTimer);

function resetTimer(){
    count = 0;
    seconds = 15;
    if(timer){
        clearInterval(timer);
        document.querySelector('.cronometro').innerText = formatTime(seconds);
    }
    document.getElementById("contador").innerHTML = "Click aqui!";
    document.getElementById('auto').src = "img/f1completo.png";
}