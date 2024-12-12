var personaje = document.getElementById("personaje");
var obstaculo = document.getElementById("obstaculo");
var btn = document.getElementById("boton");
var score = 0;
var scoreDisplay = document.getElementById("puntaje");
var scoreInterval;

//salto//
function jump() {
    //repoduce el sonido//
    var sonidoSalto = document.getElementById("sonidoSalto");
    sonidoSalto.play();

    if (personaje.classList != "animate") {
        personaje.classList.add("animate");
    }
    setTimeout(() => {
        personaje.classList.remove("animate");
    }, 1000);
}

//inicio de juego//
function hideBtn() {
    btn.style.display = "none"; //esconde boton de inicio//
    personaje.style.display = "block";//muestra al peronaje//
    obstaculo.style.display = "block";//muestra el obstaculo//
    obstaculo.classList.remove("hide");
    obstaculo.style.left = "740px"; //restablece el obtaculo//
    document.querySelector("#personaje").classList.remove("hide");//le da movimiento al fondo//
    document.querySelector(".game").classList.add("moving-background"); //le da movimiento al obstaculo//
    obstaculo.style.animation = "slide 3s linear infinite";

    //reinicia el puntaje//
    score = 0;
    updateScore();

//contador//
    scoreInterval = setInterval(() => {
        score++;
        updateScore();
    }, 150); 
}

//actualiza el puntaje//
function updateScore() {
    scoreDisplay.innerHTML = "Puntaje: " + score;
}
//sonido al chocar//
var sonidoChoque = document.getElementById("sonidoChoque");

//verifica si el personaje pierde//
setInterval(() => {
    var personajetop = parseInt(window.getComputedStyle(personaje).getPropertyValue("top"));
    var obstaculoleft = parseInt(window.getComputedStyle(obstaculo).getPropertyValue("left"));

    //si el obstaculo cocha contra el personaje//
    if (obstaculoleft > 45 && obstaculoleft < 75 && personajetop > 180) {
        sonidoChoque.play();
        obstaculo.style.animation = "none"; //detiene la animacion//
        personaje.classList.remove("animate"); //detiene el salto//
        personaje.style.display = "none"; //desaparece el personaje//
        obstaculo.style.display = "none"; //desaparece el obstaculo//
        btn.style.display = "block"; //boton de inicio otra vez//
        document.getElementById("comentario").innerHTML = "Perdiste :( ¡intenta otra vez! <br> Puntaje obtenido:" + score;
        document.querySelector(".game").classList.remove("moving-background")//detiene el fondo//
        clearInterval(scoreInterval);//detiene el contador//
        
        //reinicia el obstaculo//
        setTimeout(() => {
            obstaculo.style.animation = "";
            obstaculo.style.left = "740px";
        }, 50);

        //reinicia  el contador//
        score = 0;
        updateScore();
    }
    //verificacion de choque//
}, 100);
