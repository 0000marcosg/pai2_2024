/*refresh*/
function reiniciarPagina() {
  window.location.reload();
}
/*---------------------------------------------------------------------------------------------------------------------*/

/*boton1*/

var audio1 = new Audio("audio/vamo1.mp3");
audio1.loop=true;

function playAudio1() {
    audio1.currentTime = 0;
  audio1.play();
}

function pauseAudio1() {
  audio1.pause();
}

function movimiento1() {
                    var anima = document.getElementById("vertical");

                     if (anima.style.WebkitAnimationPlayState != null){
                        if (anima.style.WebkitAnimationPlayState == "running"){
                            anima.style.WebkitAnimationPlayState = "paused"
                            anima.style.AnimationPlayState = "paused"
                        } else {
                            anima.style.WebkitAnimationPlayState = "running"
                            anima.style.AnimationPlayState = "running"}
                    } 
                    if (audio1.paused)
                        playAudio1();
                    else
                        pauseAudio1();
}

/*----------------------------------------------------------------------------------------------------------------------------*/

/*boton2*/

var audio2 = new Audio("audio/contento.mp3");

audio2.loop=true;

function playAudio2() {
    audio2.currentTime = 0;
  audio2.play();
}

function pauseAudio2() {
  audio2.pause();
}

function movimiento2() {
                    var anima = document.getElementById("horizontal");

                     if (anima.style.WebkitAnimationPlayState != null){
                        if (anima.style.WebkitAnimationPlayState == "running"){
                            anima.style.WebkitAnimationPlayState = "paused"
                            anima.style.AnimationPlayState = "paused"
                        } else {
                            anima.style.WebkitAnimationPlayState = "running"
                            anima.style.AnimationPlayState = "running"}
                    } 
                    if (audio2.paused)
                        playAudio2();
                    else
                        pauseAudio2();
}

/*----------------------------------------------------------------------------------------------------------------------------*/


/*boton3*/

var audio3 = new Audio("audio/calle durazno.mp3");

audio3.loop=true;

function playAudio3() {
    audio3.currentTime = 0;
  audio3.play();
}

function pauseAudio3() {
  audio3.pause();
}

function movimiento3() {
                    var anima = document.getElementById("diagonales");

                    if (anima.style.WebkitAnimationPlayState != null){
                        if (anima.style.WebkitAnimationPlayState == "running"){
                            anima.style.WebkitAnimationPlayState = "paused"
                            anima.style.AnimationPlayState = "paused"
                        } else {
                            anima.style.WebkitAnimationPlayState = "running"
                            anima.style.AnimationPlayState = "running"}
                    } 
                    if (audio3.paused)
                        playAudio3();
                    else
                        pauseAudio3();
}

/*----------------------------------------------------------------------------------------------------------------------------*/

/*boton 4*/

var audio4 = new Audio("audio/uououo.mp3");

audio4.loop = true;

function playAudio4() {
    audio4.currentTime = 0;
  audio4.play();
}

function pauseAudio4() {
  audio4.pause();
}

function movimiento4() {
                    var anima = document.getElementById("diagonala");

                    if (anima.style.WebkitAnimationPlayState != null){
                        if (anima.style.WebkitAnimationPlayState == "running"){
                            anima.style.WebkitAnimationPlayState = "paused"
                            anima.style.AnimationPlayState = "paused"
                        } else {
                            anima.style.WebkitAnimationPlayState = "running"
                            anima.style.AnimationPlayState = "running"}
                    } 
                    if (audio4.paused)
                        playAudio4();
                    else
                        pauseAudio4();
}

/*----------------------------------------------------------------------------------------------------------------------------*/

/*boton 5*/

var audio5 = new Audio("audio/unodostres.mp3");

audio5.loop = true;

function playAudio5() {
    audio5.currentTime = 0;
    audio5.play();
}

function pauseAudio5() {
    audio5.pause();
}

function movimiento5() {
    var anima = document.getElementById("cuadrado");

    if (anima.style.WebkitAnimationPlayState != null) {
        if (anima.style.WebkitAnimationPlayState == "running") {
            anima.style.WebkitAnimationPlayState = "paused";
            anima.style.AnimationPlayState = "paused";
        } else {
            anima.style.WebkitAnimationPlayState = "running";
            anima.style.AnimationPlayState = "running";
        }
    }
    if (audio5.paused)
        playAudio5();
    else
        pauseAudio5();
}

/*----------------------------------------------------------------------------------------------------------------------------*/

/*boton 6*/

var audio6 = new Audio("audio/doña soledad.mp3");

audio6.loop = true;

function playAudio6() {
    audio6.currentTime = 0;
    audio6.play();
}

function pauseAudio6() {
    audio6.pause();
}

function movimiento6() {
    var anima = document.getElementById("triangulo");

    if (anima.style.WebkitAnimationPlayState != null) {
        if (anima.style.WebkitAnimationPlayState == "running") {
            anima.style.WebkitAnimationPlayState = "paused";
            anima.style.AnimationPlayState = "paused";
        } else {
            anima.style.WebkitAnimationPlayState = "running";
            anima.style.AnimationPlayState = "running";
        }
    }
    if (audio6.paused)
        playAudio6();
    else
        pauseAudio6();
}

/*----------------------------------------------------------------------------------------------------------------------------*/

