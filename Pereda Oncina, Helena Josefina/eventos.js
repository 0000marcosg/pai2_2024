let movimiento; 
let animacionActivada = false;
let ultimoTextoIndex = -5;


function activarAnimacion() {
    if (!animacionActivada) {
        const boton = document.getElementById("bb1");
        moverDiv(boton); 
        animacionActivada = true;
    }
}

function moverDiv(boton) {
    const maxWidth = window.innerWidth - boton.offsetWidth;
    const maxHeight = window.innerHeight - boton.offsetHeight;
    const x = Math.random() * maxWidth;  
    const y = Math.random() * maxHeight;
    boton.style.position = 'absolute';
    boton.style.left = `${x}px`;
    boton.style.top = `${y}px`;
    boton.style.transition = 'transform 0.5s ease';
    movimiento = setTimeout(() => moverDiv(boton), 630);
}

function resetPosition() {
    const boton = document.getElementById("bb1");
    boton.style.position = 'relative';
    boton.style.left = '0';
    boton.style.top = '0';
    clearTimeout(movimiento);
    animacionActivada = false; 
}

function ocultarDiv() {
    document.getElementById("bb2").classList.add("oculto");
}

document.getElementById('bb1').addEventListener('mouseover', function() {
    activarAnimacion();
});

document.getElementById('bb1').addEventListener('click', function() {
    resetPosition();  
    mostrarAleatorio();
});

document.getElementById('bb2').addEventListener('click', function() {
    this.classList.add("oculto");
});

// Variación de textos aleatorios al hacer clic en Sí//
const textos = [
    "¿Segur@?",
    "Tenés que pagar el Netflix ¿Estas realmente segur@?",
    "¿Vale realmente la pena faltar y perder el sueldo del día?",
    "Tu mamá no estaría orgullosa de verte faltar ¿Realmente quieres faltar?",
    "¿Segur@, segurisim@ al 30000000000000000%?",
    "¿Vale la pena faltar y no chismear con tus compañer@s?",
    "¿Valdría la pena faltar si no estuvieras cansad@?",
    "¿Estás segur@ de que es el mejor momento para faltar?",
    "Faltar puede afectar tu reputación, ¿realmente quieres arriesgarte?",
    "¿Prefieres perder la oportunidad de un ascenso por faltar hoy?",
    "¿Tu equipo te apoyaría si decides faltar? ¿Estás segur@?",
    "¿Segur@ de que no te arrepentirás más tarde por faltar?",
    "¿Vale la pena perder el contacto con tus compañeros por un día libre?",
    "¿Realmente quieres faltar y perderte la emocionante reunión sobre la caída de la bolsa?",
    "¿Preferís realmente tomar una siesta a laburar 8 horas?",
    "¿Tan segur@ estás de que tu cama necesita tu compañía hoy?",
    "¿Estas dispuest@ a afrontar las consecuencias de tus acciones?",
    "La pereza es un Crimen Capital ¿Realmente quieres faltar?",
    "¿Realmente querés vivir a base de Maruchan?",
];

function mostrarAleatorio() {
    const randomIndex = Math.floor(Math.random() * textos.length);
    document.getElementById('textos').textContent = textos[randomIndex];
    const bb2 = document.getElementById('bb2');
    bb2.classList.remove("oculto");
    const bb1 = document.getElementById('bb1');
    bb1.style.position = 'relative';
    bb1.style.left = '0';
    bb1.style.top = '0';
    animacionActivada = false;
}


/* ruiditos */

var audio = new Audio("sound/wrong.mp3");

var jiji = $("#jiji")[0];
    $("#bb1").mouseenter(function() {
    jiji.play();
    });




