// Variables de configuración y control
const colores = ["rojo", "amarillo", "azul", "verde", "naranja"];
const changeImage = colores.map(color => "img/" + color + ".png");
let columnas = Array.from(document.querySelectorAll(".columna")); // Usamos Array para poder reordenarlas fácilmente
let ficha = document.getElementById("ia");
let currentColumnIndex = 0; // Inicia en la primera columna
let fichaEnMovimiento = false;
let fichasColocadas = {
    "rojo": 0,
    "amarillo": 0,
    "azul": 0,
    "verde": 0,
    "naranja": 0
};

// Función para cambiar la imagen de la ficha
function cambiar() {
    // Filtramos los colores que aún tienen espacio en las columnas
    let coloresDisponibles = colores.filter(color => fichasColocadas[color] < 7); // Filtrar las columnas no llenas
    if (coloresDisponibles.length === 0) return;  // Si todas las columnas están llenas, no hacer nada
    const randomColor = coloresDisponibles[Math.floor(Math.random() * coloresDisponibles.length)];
    ficha.src = "img/" + randomColor + ".png";
}

// Consolidamos el manejo de las teclas en un solo listener
document.addEventListener("keydown", function(event) {
    // Si la ficha está en movimiento, no procesamos las teclas de dirección
    if (fichaEnMovimiento) return;

    // Mover hacia la izquierda
    if (event.key === "ArrowLeft") {
        // No movemos si ya estamos en la primera columna
        if (currentColumnIndex > 0) {
            currentColumnIndex--;
            actualizarPosicionFicha();
        }
    }

    // Mover hacia la derecha
    else if (event.key === "ArrowRight") {
        // No movemos si ya estamos en la última columna
        if (currentColumnIndex < columnas.length - 1) {
            currentColumnIndex++;
            actualizarPosicionFicha();
        }
    }

    // Lanzar la ficha cuando se presiona la barra espaciadora
    else if (event.key === " " && !fichaEnMovimiento) {
        fichaEnMovimiento = true;
        ficha.style.top = "20%"; // Lanza la ficha hacia abajo
        setTimeout(verificarPosicion, 500);
    }
});

// Función para actualizar la posición de la ficha
function actualizarPosicionFicha() {
    // Obtener la columna seleccionada
    const columnaSeleccionada = columnas[currentColumnIndex];
    const columnaPos = columnaSeleccionada.getBoundingClientRect();

    // Ajustamos la posición de la ficha en función de la columna seleccionada
    ficha.style.left = (columnaPos.left + columnaPos.width / 2 - ficha.width / 2) + "px";
}

// Verificar si la ficha encaja
function verificarPosicion() {
    const columnaSeleccionada = columnas[currentColumnIndex];
    const columnaColor = columnaSeleccionada.dataset.color;
    const fichaColor = getColorFromSrc(ficha.src);

    if (columnaColor === fichaColor) {
        colocarFicha(columnaSeleccionada);
    } else {
        colorincorrecto();
        reiniciarJuego();
    }

    // Reorganizar las columnas aleatoriamente después de colocar una ficha
    reorganizarColumnas();
}

// Colocar la ficha en la columna
function colocarFicha(columna) {
    const columnaColor = columna.dataset.color;

    // Verifica si la columna tiene menos de 5 fichas
    if (fichasColocadas[columnaColor] < 5) {
        // Determinar la posición en la columna
        const yPos = 45 * (fichasColocadas[columnaColor] + 1);

        const nuevaFicha = document.createElement("img");
        nuevaFicha.src = ficha.src;
        nuevaFicha.style.position = "absolute";
        nuevaFicha.style.width = "70px";
        nuevaFicha.style.height = "35px";
        nuevaFicha.style.top = yPos + "px";

        columna.appendChild(nuevaFicha);

        fichasColocadas[columnaColor]++;

        // Si todas las columnas están llenas
        if (Object.values(fichasColocadas).every(function(count) { return count === 5; })) {
            reiniciarJuego();
        } else {
            colorcorrecto();
            crearNuevaFicha();
        }
    } else {
        // Si la columna ya tiene 5 fichas, no hacer nada
    }
}

// Crear una nueva ficha
function crearNuevaFicha() {
    // Filtramos los colores que aún tienen espacio en las columnas
    let coloresDisponibles = colores.filter(color => fichasColocadas[color] < 7);
    if (coloresDisponibles.length === 0) return; // Si todas las columnas están llenas, no hacer nada

    // Seleccionamos un color aleatorio entre los colores disponibles
    const randomColor = coloresDisponibles[Math.floor(Math.random() * coloresDisponibles.length)];
    ficha.src = "img/" + randomColor + ".png";  // Establecemos la ficha con el color aleatorio

    const columnaSeleccionada = columnas[currentColumnIndex];
    const columnaPos = columnaSeleccionada.getBoundingClientRect();

    // Colocar la ficha en la parte superior de la pantalla, centrada en la columna seleccionada
    ficha.style.top = "90%";
    ficha.style.left = (columnaPos.left + columnaPos.width / 2 - ficha.width / 2) + "px";

    fichaEnMovimiento = false;
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Restablecer la posición de la ficha en la columna seleccionada
    ficha.style.top = "90%";
    const columnaSeleccionada = columnas[currentColumnIndex];
    const columnaPos = columnaSeleccionada.getBoundingClientRect();
    ficha.style.left = (columnaPos.left + columnaPos.width / 2 - ficha.width / 2) + "px";

    fichaEnMovimiento = false;
    cambiar();

    // Eliminar todas las fichas colocadas
    columnas.forEach(function(columna) {
        columna.querySelectorAll("img:not(.referencia img)").forEach(function(ficha) {
            ficha.remove();
        });
    });

    // Reiniciar contador de fichas colocadas
    fichasColocadas = {
        "rojo": 0,
        "amarillo": 0,
        "azul": 0,
        "verde": 0,
        "naranja": 0
    };

    // Reorganizar las columnas al inicio del juego
    reorganizarColumnas();
}

// Obtener el color de la ficha desde la URL
function getColorFromSrc(src) {
    return src.split("/").pop().split(".")[0];
}

// Función para reorganizar las columnas de manera aleatoria
function reorganizarColumnas() {
    // Cambiar el orden de las columnas de forma aleatoria
    columnas = columnas.sort(() => Math.random() - 0.5);

    // Reasignar las columnas reorganizadas en el DOM
    columnas.forEach((columna, index) => {
        columna.style.order = index;
    });

    // Actualizar el índice de la columna seleccionada después de reorganizar
    currentColumnIndex = Math.min(currentColumnIndex, columnas.length - 1);
    actualizarPosicionFicha();
}

function colorcorrecto() {
    const colorOriginal = document.body.style.backgroundColor;
    document.body.style.transition = "background-color 2s ease"; // Transición de 2 segundos
    document.body.style.backgroundColor = "green";

    setTimeout(function() {
        document.body.style.backgroundColor = colorOriginal;
    }, 500);
}

function colorincorrecto() {
    const colorOriginal2 = document.body.style.backgroundColor;
    document.body.style.transition = "background-color 2s ease"; // Transición de 2 segundos
    document.body.style.backgroundColor = "red";

    setTimeout(function() {
        document.body.style.backgroundColor = colorOriginal2;
    }, 500);
}

var audio2= new Audio ("audio/error.mp3");
function colorincorrecto(){
    const colorOriginal2 = document.body.style.backgroundColor;
  document.body.style.transition = "background-color 2s ease"; // Transición de 2 segundos
  document.body.style.backgroundColor = "red";

  setTimeout(function() {
      document.body.style.backgroundColor = colorOriginal2;
  }, 500);
  
  audio2.currentTime = 0;
  audio2.play();

}

var audio3= new Audio ("audio/correcto.mp3");
function colorcorrecto(){
    const colorOriginal = document.body.style.backgroundColor;
    document.body.style.transition = "background-color 2s ease"; // Transición de 2 segundos
    document.body.style.backgroundColor = "green";

    setTimeout(function() {
        document.body.style.backgroundColor = colorOriginal;
    }, 500);
    
  audio3.currentTime = 0;
  audio3.play();
  
}

var audio= new Audio ("audio/musica.mp3");
function reiniciarJuegoCompleto(){
audio.loop = true;
audio.currentTime = 0;
audio.play();
}