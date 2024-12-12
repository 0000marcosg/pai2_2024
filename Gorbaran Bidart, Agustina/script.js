const audio1 = new Audio('audio/loseaudio.mp3');
const audio2 = new Audio('audio/winaudio.mp3');


// Función para mezclar aleatoriamente un arreglo
function mezclarArreglo(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Descripción de las cartas
const descripciones = {
    1: "El túnel 1: el túnel representa la transición entre dos mundos simbolizando cambios significativos entre el paso a lo desconocido.",
    2: "Los aliados 2: Los aliados representan la fuerza de la colaboración y el apoyo en momentos de necesidad.",
    3: "La otra madre 3: La otra madre representa la tentación y las experiencias engañosas con sus ojos de botón y su sonrisa atractiva simbolizan los deseos superficiales y promesas vacías.",
    4: "El espía 4: El espía simboliza la vigilancia y la observación cuidadosa representado por un ratón haciendo equilibrio.",
    5: "El vecino 5: El vecino representa la importancia de las relaciones inesperadas y la ayuda proveniente de fuentes no previstas.",
    6: "La luna 6: La luna representa los misterios ocultos y la verdad desvelada en la forma de un cielo estrellado.",
    7: "El fin 7: El fin representa la culminación de la aventura, después de superar grandes desafíos, llega el final, pero el misterio persiste.",
    8: "La Beldam 8: con sus ojos de botones y su apariencia de porcelana agrietada, simboliza la falsedad y el peligro que acechan bajo una fachada amable."
};

function playAudio(audio) {
    // Detener todos los audios antes de reproducir otro
    [audio1, audio2].forEach(a => a.pause());
    [audio1, audio2].forEach(a => a.currentTime = 0);
  
    // Reproducir el audio seleccionado
    audio.play();
  }

// Función para insertar una carta en el grid
function insertarCarta(numero, ) {
    const grid = document.getElementById("gridCartas");

    // Crear la estructura de la carta con innerHTML y usando strings de HTML
    const cartaHTML = `
        <div class="carta" data-carta="${numero}" onmouseenter="actualizarFooter(this)" >
            <div class="carta-inner">
                <div class="carta-front"></div>
                <div class="carta-back" style="background-image: url('img/imagen${numero}.jpg');"></div>
            </div>
        </div>
    `;

    // Insertar la carta en el grid usando innerHTML
    grid.innerHTML += cartaHTML;


    
}


// Función para reiniciar el juego con el efecto de pantalla negra
function reiniciarJuego() {
    const grid = document.getElementById("gridCartas");
    const fondoNegro = document.getElementById("fondoNegro");

    // Mostrar la capa negra con el efecto
    fondoNegro.style.display = 'block';
    setTimeout(() => {
        fondoNegro.style.opacity = '1';  // Hacer la capa negra visible

        // Después de un retraso de 500ms (duración de la transición), reiniciar las cartas
        setTimeout(() => {
            grid.innerHTML = '';  // Eliminar las cartas actuales

            // Generar una lista de cartas del 1 al 8 (sin repetirse)
            const numerosCartas = [1, 2, 3, 4, 5, 6, 7, 8];

            // Mezclar las cartas en la cuadrícula (solo posiciones, no contenido)
            mezclarArreglo(numerosCartas);

            // Insertar las cartas en el grid según el orden aleatorio
            numerosCartas.forEach(numero => {
                if (numero === 8) {
                    insertarCarta(numero, true);  // Insertar la carta gatillo con el número 8 (imagen8.jpg)
                } else {
                    insertarCarta(numero);  // Insertar las demás cartas normalmente
                }
            });

            // Reagregar los eventos de clic para voltear las cartas
            const cartas = document.querySelectorAll(".carta");
            cartas.forEach(carta => {
                if(carta.dataset.carta==8)
                {
                    carta.addEventListener("click", () => {
                        carta.classList.toggle("volteada");actualizarFooter(carta) ;
                        playAudio(audio1);
                       
                        reiniciarJuego(); // Reinicia el juego al hacer clic en la carta gatillo
                    });
                }else{
                    carta.addEventListener("click", () => {
                        carta.classList.toggle("volteada");actualizarFooter(carta) ;checkReiniciar(carta);
                    
                });
                }




                
            });

           

            // Ocultar la capa negra nuevamente
            fondoNegro.style.opacity = '0';  // Desvanecer la capa negra
            // Después de la transición, ocultar la capa completamente
            setTimeout(() => {
                fondoNegro.style.display = 'none';
            }, 500);  // Asegura que la capa esté oculta después de la animación
        }, 500);  // Espera que se complete la animación antes de reiniciar las cartas
    }, 100); // Pequeño retraso para asegurar que el display haya sido modificado
}

// Función para actualizar el footer al hacer hover sobre una carta
function actualizarFooter(carta) {


    const footer = document.getElementById("footer");
    const estado = carta.classList.contains("volteada") ? "revelada" : "flipped" ;

    if (estado === "none") {
        
    } else if (estado === "revelada") {
        const numeroCarta = parseInt(carta.getAttribute("data-carta"));
        footer.textContent = descripciones[numeroCarta];
    }
}

function checkReiniciar(carta) {
    let condicion = false;

    if (document.querySelectorAll(".volteada") != null) {
        condicion = document.querySelectorAll(".volteada").length == 7;
    }

    if (condicion) {
        playAudio(audio2); // Asegúrate de que audio2 esté definido
        const victoryImage = document.getElementById("victory");

        if (victoryImage) {
            victoryImage.style.display = "block";

            setTimeout(() => {
                victoryImage.style.display = "none";
                reiniciarJuego();
            }, 4000);
        } else {
            console.error('Elemento con id="victory" no encontrado.');
        }
    }
}
// Llamar a la función reiniciarJuego para comenzar el juego al cargar la página
reiniciarJuego();



