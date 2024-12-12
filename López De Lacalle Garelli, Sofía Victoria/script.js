//al hacer click empieza
document.getElementById("alien-inicio").addEventListener("click", () => {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("planeta").style.display = "block";
    moverAlien();
});

const alien = document.getElementById("alien");
const craters = document.querySelectorAll(".crater");

let velocidad = 5000;
let juegoActivo = true;

function moverAlien() { //mover a un lugar crater random
    if (!juegoActivo) return;
    const craterAleatorio = craters[Math.floor(Math.random() * craters.length)];
    //se pone al alein en un crater
    alien.style.top = craterAleatorio.offsetTop + "px";
    alien.style.left = craterAleatorio.offsetLeft + "px";
    alien.style.display = "block"; //aparece el alien
    
    //desp de un par de segundos lo esconde 
    setTimeout(() => {
        alien.style.display = "none";
        moverAlien();
    }, velocidad);
}

//al hacer click hace que vaya mas rapido de uno a otro
alien.addEventListener("click", () => {
    velocidad *= 1.1;
    audio.play();
    moverAlien();
});
var audio = new Audio("audio/beep.mov");
moverAlien();



