document.addEventListener("DOMContentLoaded", function () {
  
  let globo = document.getElementById("globo");
  let contenedorInteraccion = document.getElementById("contenedor-interaccion");
  let anchoInteraccion = window.innerWidth;
  let altoInteraccion = window.innerHeight;
  let finDeLaInteraccion = false;
  let velocidadObstaculo = 5; // Velocidad inicial de los obstáculos
  let intervaloObstaculos = 1000; // Tiempo de aparición de nuevos obstáculos
  let tiempoInteraccion = 0; // Tiempo total de la interacccion
  let posicionGloboX = (anchoInteraccion / 2) - 25; // Posición inicial del globo
  let velocidadGlobo = 10; // Velocidad del globo con teclas
  let imagenActual = 1; // Índice para las imágenes del globo (1 a 7)
  let obstaculos = []; 

  // audios
  const explosionAudio = new Audio("audio/explosion-audio.mp3"); // Audio para la explosión
  explosionAudio.volume = 1.0;

  const colorAudio = new Audio("audio/color-audio.mp3"); // Audio para colisión con la nube
  colorAudio.volume = 1.0;

  // Posicionar el globo al inicio
  globo.style.left = posicionGloboX + "px";

  // Movimiento del globo con las teclas de flecha
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "ArrowRight" && posicionGloboX + velocidadGlobo + globo.offsetWidth <= anchoInteraccion) {
      posicionGloboX += velocidadGlobo;
    } else if (evento.key === "ArrowLeft" && posicionGloboX - velocidadGlobo >= 0) {
      posicionGloboX -= velocidadGlobo;
    }
    globo.style.left = posicionGloboX + "px";
  });

  // Movimiento con el mouse o táctil
  function moverGlobo(evento) {
    let xPos = evento.clientX || evento.touches[0].clientX;
    posicionGloboX = xPos - globo.offsetWidth / 2;

    if (posicionGloboX < 0) posicionGloboX = 0;
    if (posicionGloboX + globo.offsetWidth > anchoInteraccion) posicionGloboX = anchoInteraccion - globo.offsetWidth;

    globo.style.left = posicionGloboX + "px";
  }

  contenedorInteraccion.addEventListener("mousemove", moverGlobo);
  contenedorInteraccion.addEventListener("touchmove", moverGlobo);

  // colisión entre el globo y los obstáculos rayos o nubes
  function verificarColision(obstaculo) {
    let rectGlobo = globo.getBoundingClientRect();
    let rectObstaculo = obstaculo.getBoundingClientRect();

    return !(
      rectObstaculo.right - 10 < rectGlobo.left + 10 ||
      rectObstaculo.left + 10 > rectGlobo.right - 10 ||
      rectObstaculo.bottom - 10 < rectGlobo.top + 10 ||
      rectObstaculo.top + 10 > rectGlobo.bottom - 10
    );
  }

  // Cambiar el color del globo 
  function cambiarColorGlobo() {
    imagenActual = (imagenActual % 7) + 1; // Ciclar entre 1 y 7
    globo.src = `img/globo ${imagenActual}.png`;
    colorAudio.currentTime = 0; 
    colorAudio.play(); // Reproducir el audio al colisionar con la nube
  }

  //explosión, audio y botón de reinicio
  function explotarGlobo() {
    globo.src = `img/explosion ${imagenActual}.png`;

    explosionAudio.currentTime = 0;
    explosionAudio.play();
    finDeLaInteraccion = true;

    setTimeout(() => {
      const botonReiniciar = document.createElement("img");
      botonReiniciar.src = "img/reiniciar.png";
      botonReiniciar.alt = "Reiniciar";
      botonReiniciar.id = "boton-reiniciar";
      botonReiniciar.style.position = "absolute";
      botonReiniciar.style.top = "50%";
      botonReiniciar.style.left = "50%";
      botonReiniciar.style.transform = "translate(-50%, -50%)";
      botonReiniciar.style.cursor = "pointer";

      contenedorInteraccion.appendChild(botonReiniciar);

      // Reiniciar al hacer clic en la imagen
      botonReiniciar.addEventListener("click", function () {
        botonReiniciar.remove(); 
        reiniciarInteraccion();
      });
    }, 500); 
  }

  // obstáculos 
  function crearObstaculo() {
    let obstaculo = document.createElement("img");

    if (Math.random() < 0.5) {
      obstaculo.src = "img/rayo.png"; 
      obstaculo.alt = "Rayo";
    } else {
      obstaculo.src = "img/nube.png"; 
      obstaculo.alt = "Nube";
    }

    obstaculo.classList.add("obstaculo");
    obstaculo.style.left = Math.random() * (anchoInteraccion - 60) + "px";
    contenedorInteraccion.appendChild(obstaculo);
    obstaculos.push(obstaculo); 

    let intervaloCaida = setInterval(() => {
      if (finDeLaInteraccion) {
        clearInterval(intervaloCaida);
        return;
      }

      let posicionObstaculoY = parseFloat(window.getComputedStyle(obstaculo).getPropertyValue("top"));

      if (posicionObstaculoY > altoInteraccion) {
        clearInterval(intervaloCaida);
        contenedorInteraccion.removeChild(obstaculo);
        obstaculos = obstaculos.filter((o) => o !== obstaculo);
      } else {
        obstaculo.style.top = posicionObstaculoY + velocidadObstaculo + "px";
      }

      if (verificarColision(obstaculo)) {
        if (obstaculo.alt === "Rayo") {
          explotarGlobo();
        } else if (obstaculo.alt === "Nube") {
          cambiarColorGlobo();
          contenedorInteraccion.removeChild(obstaculo);
          obstaculos = obstaculos.filter((o) => o !== obstaculo);
        }
      }
    }, 20);
  }

  // Reiniciar sin recargar la página
  function reiniciarInteraccion() {
    obstaculos.forEach((obstaculo) => contenedorInteraccion.removeChild(obstaculo));
    obstaculos = [];
    finDeLaInteraccion = false;
    velocidadObstaculo = 5;
    intervaloObstaculos = 1000;
    tiempoInteraccion = 0;
    imagenActual = 1;
    globo.src = `img/globo 1.png`;
    iniciarInteraccion();
    aumentarDificultad();
  }

  // Generar obstáculos continuamente
  function iniciarInteraccion() {
    if (!finDeLaInteraccion) {
      crearObstaculo();
      setTimeout(iniciarInteraccion, intervaloObstaculos);
    }
  }

  // Aumentar la dificultad progresivamente
  function aumentarDificultad() {
    tiempoInteraccion += 1;

    if (tiempoInteraccion % 10 === 0) {
      velocidadObstaculo += 1;
      if (intervaloObstaculos > 300) {
        intervaloObstaculos -= 100;
      }
    }

    if (!finDeLaInteraccion) {
      setTimeout(aumentarDificultad, 1000);
    }
  }

  // Iniciar la Interaccion
  iniciarInteraccion();
  aumentarDificultad();
});