/////////////////////////////////////PANTALLAS

document.getElementById('pantallaInicio').addEventListener('click', function() { 
        document.getElementById('pantallaInicio').style.display = 'none'; 
        document.getElementById('contenedorPrincipal').style.display = 'grid';
    });

    document.getElementById('pantallaReinicio').addEventListener('click', function() { 
        document.getElementById('pantallaReinicio').style.display = 'none'; 
        document.getElementById('contenedorPrincipal').style.display = 'grid'; 
        location.reload(); // Recargar la página para reiniciar el juego 
    });
//////////////////////////////////////////////

       let contadorClicks = 0;
       let indiceActual = 0;
       const imagenes = document.querySelectorAll('.cebolla img');
       const maxClicks = 35;
       const victorySound = document.getElementById("SonidoGanador");
       const pieroGanaste = document.getElementById("pieroGanaste");
       const imagenGanaste = document.getElementById("imagenGanaste");
       let hasPerdido = false; //variable para controlar el estado de "Perdiste"
      

       setTimeout(() => {  
    if (!pieroGanaste.classList.contains('activo')) { 
        mostrarImagen("perdiste");
        hasPerdido = true; 

        // Reproducir el sonido "SonidoPerdedor" cuando la imagen "perdiste" aparece
        const sonidoPerdedor = document.getElementById("SonidoPerdedor");
        sonidoPerdedor.play();  // Reproduce el sonido de "perdiste"
        
        setTimeout(() => { 
            if (hasPerdido) {
                document.getElementById('pantallaReinicio').style.display = 'flex'; 
                document.getElementById('contenedorPrincipal').style.display = 'none'; 
            }
        }, 3000); // Mostrar pantalla de reinicio 3 segundos después de mostrar "Perdiste" 
    }
    ocultarImagen("cuidado");
}, 29000); // 29 segundos


       function cambiarImagen() {
        if (hasPerdido) return; //si perdiste no cambia la imagen

        imagenes[indiceActual].classList.remove('activo');
        indiceActual = (indiceActual + 1) % imagenes.length;
        imagenes[indiceActual].classList.add('activo');

        if (imagenes[indiceActual].id === 'cebolla4') {
            //lo va a leer en el orden q lo pongamos acá
        mostrarPieroGanaste(); //Mostrar el piero ganador
        mostrarImagenGanaste();
        ocultarImagen("cuidado");
        ocultarLagrimas(); 

        setTimeout(() => {
            playVictorySound(); 
        }, 100); //100ms para que se sincronice bien

        //Mostrar pantalla de reinicio 12 segundos después de mostrar "Ganaste" 
        setTimeout(() => { 
            document.getElementById('pantallaReinicio').style.display = 'flex'; 
            document.getElementById('contenedorPrincipal').style.display = 'none'; 
        }, 12000); 
    }
}       
        document.querySelector('.cebolla').addEventListener('click', () => {
        if (hasPerdido) return; //si perdiste no sigue el contador de clicks

         contadorClicks++;
         if (contadorClicks >= maxClicks) {
            cambiarImagen();
            contadorClicks = 0; //Reinicia el contador de clicks
            }
            playSound(); 
    });

    function playSound(){
            const sound = document.getElementById("sonidoclick"); 
            sound.play(); 
            setTimeout(function() { 
                sound.pause(); 
                sound.currentTime = 0; //Reinicia el audio 
            }, 1000);
        } 
    
    function playVictorySound() {
            victorySound.play();
    
    //Detener la animación del agua
    const agua = document.querySelector(".agua");
    if (agua) {
    agua.style.animationPlayState = "paused"; 
    }

    setTimeout(function() {
        victorySound.pause();  //Detener el sonido
        victorySound.currentTime = 0;  //Reiniciar el audio
    }, 5000);  //Duración del sonido
}

    function mostrarPieroGanaste() {
        const pieroImages = document.querySelectorAll('.piero-img');
        for (const img of pieroImages) {
         img.classList.remove('activo');
        }
        pieroGanaste.classList.add('activo');
     }

    function mostrarImagenGanaste() {
        imagenGanaste.classList.remove('oculta'); //Muestra la imagen
        imagenGanaste.classList.add('activo'); 
    }

     function ocultarLagrimas(){
        const lagrimas = document.querySelector('.lagrimas-container')
        lagrimas.style.opacity = 0; //Cambia la opacidad a 0 para que la posición o espacio no sea un problema
     }
    
    // para mostrar y ocultar los mensajes de alerta
    function mostrarImagen(id) { 
        const imagen = document.getElementById(id); 
        if (imagen) { 
            imagen.classList.add('activo'); 
            imagen.classList.remove('oculta');
        }
    }

    function ocultarImagen(id) { 
        const imagen = document.getElementById(id); 
        if (imagen) { 
            imagen.classList.remove('activo'); 
            imagen.classList.add('oculta');
        } 
    }

    // mostrar y ocultar según el tiempo
    setTimeout(() => {
        if (!pieroGanaste.classList.contains('activo')) {
            mostrarImagen("ojoAgua");
            }   
    }, 5000); // 5 segundos

    setTimeout(() => { 
        ocultarImagen("ojoAgua"); 
        mostrarImagen("cuidado");
    }, 12000); // 12 segundos

    setTimeout(() => {  
        if (!pieroGanaste.classList.contains('activo')) { 
            mostrarImagen("perdiste");
            hasPerdido = true; 
            setTimeout(() => { 
                if (hasPerdido){
                document.getElementById('pantallaReinicio').style.display = 'flex'; 
                document.getElementById('contenedorPrincipal').style.display = 'none'; 
                }
            }, 3000); //Mostrar pantalla de reinicio 3 segundos después de mostrar "Perdiste" 
        }
        ocultarImagen("cuidado");
    }, 29000); // 29 segundos
////////////////////////////////////////