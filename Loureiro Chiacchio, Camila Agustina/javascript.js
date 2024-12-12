const cuadrado = document.getElementById('cuadrado');
    const contadorDiv = document.getElementById('contador');
    const sonido = document.getElementById('click-sound');
    const musica = document.getElementById('musica');
    const tamañoInicial = 150; // Tamaño inicial del cuadrado
    let tamaño = tamañoInicial; // Tamaño del cuadrado
    const margen = 20; // Margen para evitar que toque los bordes
    let contador = 0; // Contador inicial

    // Función para mover el cuadrado
    function moverCuadrado() {
      const maxWidth = window.innerWidth - tamaño - margen;
      const maxHeight = window.innerHeight - tamaño - margen - document.getElementById('barra').offsetHeight;

      const randomX = Math.floor(Math.random() * maxWidth) + margen;
      const randomY = Math.floor(Math.random() * maxHeight) + margen + document.getElementById('barra').offsetHeight;

      cuadrado.style.left = randomX + 'px';
      cuadrado.style.top = randomY + 'px';
    }

    // Función para iniciar el movimiento con retraso
    function iniciarMovimiento() {
      moverCuadrado();
      setTimeout(iniciarMovimiento, 650); // Esperar 0.65s antes de mover de nuevo
    }

    cuadrado.addEventListener('click', function () {
      // Mostrar el contador si está oculto
      if (!contadorDiv.classList.contains('visible')) {
        contadorDiv.classList.add('visible');
      }

      // Reproducir el sonido al hacer clic
      sonido.play();

      // Incrementar el contador y actualizar el texto
      contador++;
      contadorDiv.textContent = `CLICS: ${contador}`;

      // Reducir el tamaño del cuadrado en cada múltiplo de 10
      if (contador % 10 === 0 && tamaño > 100) {
        tamaño -= 10;
        cuadrado.style.width = tamaño + 'px';
        cuadrado.style.height = tamaño + 'px';
      }
    });

    function iniciarMusica() {
      musica.play().catch(error => {
        console.log("El navegador ha bloqueado la reproducción automática de audio.");
      });
    }

    cuadrado.addEventListener('click', function () {
      iniciarMusica();
    });

    // Inicializar la posición del cuadrado y comenzar el movimiento
    iniciarMovimiento();