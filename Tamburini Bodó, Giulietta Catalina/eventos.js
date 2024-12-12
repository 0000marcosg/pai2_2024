/*para cambiar de index a experiencia, para separar el cartel de los globos*/ 
function openPage() {
    // Cambia la página actual a otra
    window.location.href = "experiencia.html";
  }
/*para al refrescar la página de los globos volver al index*/ 
   if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
       window.location.href = "index.html";
    }


/*cartel de explotemos------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function() {
    const alertaBox = document.getElementById("alerta");
    const cerrarButton = document.getElementById("cerrar-btn");

    cerrarButton.addEventListener("click", function() {
    alertaBox.style.display = "none";
    });
    });

/*funcion para que el nuevo globo amarillo tenga el evento*/ 
    function asignarEventoGloboAmarillo(globo) {
        globo.addEventListener('click', function() {
            const anchoVentana = window.innerWidth;
            const altoVentana = window.innerHeight;

            const nuevaPosX = Math.random() * (anchoVentana - globo.clientWidth);
            const nuevaPosY = Math.random() * (altoVentana - globo.clientHeight);

            globo.style.left = `${nuevaPosX}px`;
            globo.style.top = `${nuevaPosY}px`;
        });
    }

/*funcion para que el nuevo globo verde tenga el evento*/ 
    function asignarEventoGloboVerde(globo) {
        globo.addEventListener('click', function() {
            globo.remove();
        });
    }

/*función para mover el globo rojo */
    function asignarEventoGloboRojo(globo) {
        globo.addEventListener('click', function() {
            const anchoVentana = window.innerWidth;
            const altoVentana = window.innerHeight;
            const nuevaPosX = Math.random() * (anchoVentana - globo.clientWidth);
            const nuevaPosY = Math.random() * (altoVentana - globo.clientHeight);
            globo.style.left = `${nuevaPosX}px`;
            globo.style.top = `${nuevaPosY}px`;
        });
    }

/*para que se mueva el globo amarillo---------------------------------------------------------------------------*/
    const globoamarillo = document.getElementById('miGloboamarillo');
    globoamarillo.addEventListener('click', function() {
        /*saca el alto y ancho del navegador*/ 
        const anchoVentana = window.innerWidth;
        const altoVentana = window.innerHeight;

        /*calcula las posiciones aleatorias*/ 
        const nuevaPosX = Math.random() * (anchoVentana - globoamarillo.clientWidth);
        const nuevaPosY = Math.random() * (altoVentana - globoamarillo.clientHeight);

        /*genera las posiciones aleatorias*/
        globoamarillo.style.left = `${nuevaPosX}px`;
        globoamarillo.style.top = `${nuevaPosY}px`;
    });

/*para desaparecer los globos verdes----------------------------------------------------------------------------*/
    const globoverde = document.getElementById('miGloboverde');
    globoverde.addEventListener('click', function() {
    globoverde.remove(); 
    });

/*para que aparezcan 2 globos aleatorios y se mueva-------------------------------------------------------------*/
    const globorojo = document.getElementById('miGloborojo');
    const contenedoraparecenglobos = document.getElementById('miAparecenglobos');

/*para saber las imagenes de la carpeta*/
    const nombresImagenes = [
        'globo1.png',
        'globo2.png',
        'globo3.png',
    ];
    const carpetaImagenes = 'img/'; 

    globorojo.addEventListener('click', function() {
        /*para que se mueva el globo*/ 
        const anchoVentana = window.innerWidth;
        const altoVentana = window.innerHeight;

        const nuevaPosX = Math.random() * (anchoVentana - globorojo.clientWidth);
        const nuevaPosY = Math.random() * (altoVentana - globorojo.clientHeight);

        globorojo.style.position = "absolute"; // Asegúrate de que tenga posición absoluta
        globorojo.style.left = `${nuevaPosX}px`;
        globorojo.style.top = `${nuevaPosY}px`;

        /*para que aparezcan las imagenes*/ 
        for (let i = 0; i < 2; i++) {
            /*elegir un índice aleatorio*/ 
            const indiceAleatorio = Math.floor(Math.random() * nombresImagenes.length);
            const nombreAleatorio = nombresImagenes[indiceAleatorio];

            /*crear una nueva imagen*/ 
            const nuevaImagen = document.createElement('img');
            nuevaImagen.src = `${carpetaImagenes}${nombreAleatorio}`;
            nuevaImagen.alt = `Globo ${i + 1}`;

            /*saca el alto y ancho del navegador*/ 
            const anchoVentana = window.innerWidth;
            const altoVentana = window.innerHeight;

            /*calcular las posiciones aleatorias*/ 
            const nuevaPosX = Math.random() * anchoVentana;
            const nuevaPosY = Math.random() * altoVentana;

            /*establecer las posiciones*/ 
            nuevaImagen.style.position = "absolute";
            nuevaImagen.style.left = `${nuevaPosX}px`;
            nuevaImagen.style.top = `${nuevaPosY}px`;

            /*agregar la nueva imagen al contenedor*/ 
            contenedoraparecenglobos.appendChild(nuevaImagen);

            /*asignar el evento correspondiente según el tipo de globo*/ 
            if (nombreAleatorio === 'globo1.png') {
                asignarEventoGloboAmarillo(nuevaImagen);
            } else if (nombreAleatorio === 'globo2.png') {
                asignarEventoGloboVerde(nuevaImagen);
            }
            else if (nombreAleatorio === 'globo3.png') {
                asignarEventoGloboRojo(nuevaImagen);  
            }
        }
    });

/*para cartel motivacional---------------------------------------------------------------------------------------*/

/*mensajes aleatorios*/ 
    const mensajes = [
        "Te quedan pocos!",
        "Dale, seguí explotando!",
        "Ya casi terminas!",
        "Estás a punto de lograrlo!",
        "No pares ahora!",
    ];

    const cartel = document.getElementById('cartel');

    function mostrarCartel() {
/*elige el mensaje aleatorio*/
    const mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)];
    cartel.textContent = mensajeAleatorio; 

/*mostrar el cartel*/
    cartel.classList.add('mostrar');  

/*despues de 3 segundos se oculta*/ 
    setTimeout(() => {
        cartel.classList.remove('mostrar');  
    }, 3000);  
    }

/*para mostrar el cartel cada 10 segundos*/ 
    setInterval(mostrarCartel, 10000);

/*menu responsivo------------------------------------------------------------------------------------------------------*/ 
    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
        x.className += " responsive";
         } else {
            x.className = "topnav";
           }
       }
