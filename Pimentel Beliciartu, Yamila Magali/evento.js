   // Araña
        const araña = document.getElementById("araña");
        araña.addEventListener("click", function () {
        araña.classList.toggle("move");
    });
   
   // Osito    
        document.addEventListener("DOMContentLoaded", function () {
        const rotacionosito = document.getElementById("rotacionosito");
        const audioOsito = document.getElementById("audioOsito");

     // Variable para verificar si el osito está en su posición original (0 grados)
         let isRotated = false;
        rotacionosito.addEventListener("click", function () {
     // Si el osito está en su posición original (no rotado), rotarlo a 90 grados
        if (!isRotated) {
        rotacionosito.classList.add("rotate");
    // Reproducir el audio al hacer clic y rotar
         audioOsito.currentTime = 0;  // Reiniciar el audio desde el inicio
         audioOsito.play();
         isRotated = true;  
        } else {
         // Si ya está rotado, puedes volver a rotarlo a su posición original (0 grados)
         rotacionosito.classList.remove("rotate");
         isRotated = false;  // El osito vuelve a su posición inicial
        }
    });


    // Cuadro
        const vibracioncuadro = document.getElementById("vibracioncuadro");
        vibracioncuadro.addEventListener("click", function () { 
        if (audiocuadro.paused) {
     // Reiniciar el audio desde el inicio y activar el loop
        audiocuadro.currentTime = 0;  // Reiniciar el audio
        audiocuadro.loop = true;  // Activar el loop antes de reproducir
        audiocuadro.play();  // Reproducir el audio
    
    // Activar la vibración de la interacción
        vibracioncuadro.classList.add("vibrate");
        } else {
    // Si el audio está en reproducción, pausarlo
        audiocuadro.pause();
        vibracioncuadro.classList.remove("vibrate");  // Detener la vibración
        }
    });

    
    // Papel Zoom
            const papelZoom = document.getElementById("papelZoom");
            const vistazoom = document.getElementById("vistazoom");
            const cruz = document.getElementById("cruz");

    // Función para mostrar el zoom
            papelZoom.addEventListener("click", () => {
            vistazoom.style.display = "flex";
    });

    // Función para cerrar el zoom
            cruz.addEventListener("click", () => {
            vistazoom.style.display = "none";
    });
    });


    // Ojos debajo de la cama al hacer clic
            const debajodelacama = document.getElementById("debajodelacama");
            const ojos = document.getElementById("ojos");

    // Ajustar tiempos de visibilidad para dispositivos móviles
            const tiempoVisibilidad = window.innerWidth <= 768 ? 1500 : 2000; // 1.5s en móviles, 2s en escritorio
            debajodelacama.addEventListener("click", function () {
    // Mostrar los ojos
            ojos.style.display = "block";

    // Ocultar los ojos después del tiempo especificado
            setTimeout(() => {
            ojos.style.display = "none";
            }, tiempoVisibilidad);
});


    // Click Puerta
            document.addEventListener("DOMContentLoaded", function () {
            const clickPuerta = document.getElementById("clickpuerta");
            const textopuerta = document.getElementById("textopuerta");
            const sonido1 = document.getElementById("sonido1");
            const sonido2 = document.getElementById("sonido2");
            let golpeAlternado = true; // Alternar entre los dos sonidos
    
            clickPuerta.addEventListener("click", function () {
    // Alternar visibilidad del texto
            textopuerta.style.display = "block";
            textopuerta.style.opacity = "1"; // Hacer visible con opacidad
    
    // Reproducir audio alternado
            if (golpeAlternado) {
            sonido1.currentTime = 0;
            sonido1.play();
            } else {
            sonido2.currentTime = 0;
            sonido2.play();
            }
            golpeAlternado = !golpeAlternado; // Cambiar al siguiente sonido
    
    // Ocultar texto después de un tiempo
            setTimeout(() => {
            textopuerta.style.opacity = "0"; // Transición suave
            setTimeout(() => textopuerta.style.display = "none", 500); // Ocultar tras transición
            }, 1000); // Mantener visible por 1 segundos
             });
});


    // Garras
            const garras = document.getElementById("garras");  // Asegúrate de declarar la variable
            garras.addEventListener("click", function () {
            const garrasaudio = document.getElementById("garrasaudio"); // Asegúrate de tener la referencia correcta al audio
            if (garrasaudio.paused) {
            garrasaudio.currentTime = 0;  // Reiniciar el audio
            garrasaudio.loop = true;      // Activar el loop antes de reproducir
            garrasaudio.play();           // Reproducir el audio
            } else {
            garrasaudio.pause();          // Pausar el audio si ya está reproduciéndose
            }
});


     // Parpadeo
            document.addEventListener("DOMContentLoaded", function () {
            const parpadeo = document.getElementById("parpadeo");

    // Función para hacer parpadear la pantalla (fondo negro)
            function showparpadeo() {
            parpadeo.style.display = "block";  
            parpadeo.classList.add("blink"); 

    // Después de que termine el parpadeo, oculta la capa roja
            setTimeout(() => {
            parpadeo.style.display = "none"; 
            parpadeo.classList.remove("blink"); 
            }, 1800); // La animación de parpadeo dura 1.8 segundos (3 ciclos de 0.6s)
            }

    // para que la pantalla se ponga negro cada 8 segundos
            setInterval(showparpadeo, 8000); 
});

