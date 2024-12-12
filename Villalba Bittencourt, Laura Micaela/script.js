var termoImagen = document.getElementById("termoImagen");
var mateImagen = document.getElementById('mateImagen');
var termo = document.getElementById('termo');
var mate = document.getElementById('mate');
var agua_termo = document.getElementById('agua_termo');
var barra_mate = document.getElementById('barra_mate');
var barra_termo = document.getElementById('barra_termo');
var indiceActual = 0;
var imagenesTermo = [
    "img/termo.png", 
    "img/termo2.png", 
    "img/termo3.png", 
    "img/termo4.png",
    "img/termo5.png",
    "img/termo6.png",
    "img/termo7.png",
    "img/termo8.png",
];

var sonidoLlenar = new Audio("audio/llenar.mp3");
var sonidoTomar = new Audio("audio/tomar.mp4");

var mateCebado = false;
var enAnimacion = false;
var termoVacío = false;

var barraNivel = 0;
var barraNivelTermo = 0;

function bajarBarra() {
    if (barraNivel === 1) {
        barra_mate.src = "img/barra mate 3.png"; 
    } else if (barraNivel === 2) {
        barra_mate.src = "img/barra mate 4.png";
    } else if (barraNivel === 3) {
        barra_mate.src = "img/barra mate 5.png";
    } else if (barraNivel === 4) {
        barra_mate.src = "img/barra mate 6.png";
    } else if (barraNivel === 5) {
        barra_mate.src = "img/barra mate 1.png";
        mateImagen.src = "img/mate 1.png"; 
        mateCebado = false;
        barraNivel = 0;
    }
}

function bajarBarraTermo() {
    if (barraNivelTermo === 1) {
        barra_termo.src = "img/barra termo 2.png"; 
    } else if (barraNivelTermo === 2) {
        barra_termo.src = "img/barra termo 3.png"; 
    } else if (barraNivelTermo === 3) {
        barra_termo.src = "img/barra termo 4.png"; 
    } else if (barraNivelTermo === 4) {
        barra_termo.src = "img/barra termo 5.png"; 
    } else if (barraNivelTermo === 5) {
        barra_termo.src = "img/barra termo 6.png"; 
    } else if (barraNivelTermo === 6) {
        barra_termo.src = "img/barra termo 7.png";
        termoVacío = true;
    }
}

function cambioTermo() {
    indiceActual = (indiceActual + 1) % imagenesTermo.length;
    termoImagen.src = imagenesTermo[indiceActual];
}

termo.addEventListener('click', function() {
    termo.classList.add('animar');
    
    sonidoLlenar.play();
    
    termo.addEventListener('animationend', function() {
        termo.classList.remove('animar');

        mateImagen.src = "img/mate 2.png"; 
        
        barra_mate.src = "img/barra mate 2.png";

        mateCebado = true;

        mate.style.cursor = 'pointer';

        barraNivelTermo++;
        bajarBarraTermo();  
        
        if (termoVacío === true) {
        
            termo.classList.add('rellenar');
            termo.addEventListener('animationend', function() {
                termo.classList.remove('rellenar');
                barra_termo.src = "img/barra termo 1.png";
                barraNivelTermo = 0;
                termoVacío = false;
            }, { once: true });
        }
        
    }, { once: true });
});

mate.addEventListener('click', function() {
    if (mateCebado === true) {

        mate.classList.add('tomar');

        sonidoTomar.play();

        mate.addEventListener('animationend', function() {
            mate.classList.remove('tomar');

            barraNivel++; 
            console.log("Nivel de barra del mate:", barraNivel);

            bajarBarra();

             
        }, { once: true }); 
    }
});


