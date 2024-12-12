// script.js
let isLightOn = false;
let isBroken = false;
let clickCount = 0;

function toggleLight() {
    const lightbulb = document.getElementById('lightbulb');
    const clickSound = document.getElementById('clickSound');
    const brokenSound = document.getElementById('brokenSound');
    
    if (!isBroken) {
        isLightOn = !isLightOn;
        if (isLightOn) {
            lightbulb.src = "imagenes/Prendido.jpg"; // Cambia a imagen del foco encendido
        } else {
            lightbulb.src = 'imagenes/Apagaado.jpg'; // Cambia a imagen del foco apagado
        }
        clickSound.play(); // Reproduce sonido de click
    } else {
        lightbulb.src = 'imagenes/Roto.jpg'; // Imagen de foco roto
        brokenSound.play(); // Reproduce sonido de foco roto
    }
}


function toggleLight() {
    const lightbulb = document.getElementById('lightbulb');
    const clickSound = document.getElementById('clickSound');
    const brokenSound = document.getElementById('brokenSound');
    const animationContainer = document.getElementById('animationContainer');

    if (!isBroken) {
        clickCount++; // Incrementar contador de clics

        if (clickCount >= 10) {
            // Si se alcanzan 10 clics, el foco se rompe
            isBroken = true;
            lightbulb.src = 'imagenes/Roto.jpg'; // Cambia a imagen de foco roto
            brokenSound.play(); // Reproduce sonido de foco roto
            animationContainer.style.display = 'flex'; // Mostrar contenedor de animación
        } else {
            // Cambiar entre encendido y apagado
            lightbulb.src = lightbulb.src.includes('Apagado') ? 'imagenes/Prendido.jpg' : 'imagenes/Apagado.jpg';
            clickSound.play(); // Reproduce sonido de clic
        }
    }
}


