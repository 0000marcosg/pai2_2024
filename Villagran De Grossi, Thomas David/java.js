const cuadrados = document.querySelectorAll('.cuadrado');

cuadrados.forEach((cuadrado, index) => {
  // Crear un nuevo elemento de audio para cada cuadrado
  const sonido = new Audio(`sonido/sonido${index + 1}.mp3`); // Esta linea asigna un sonido para cada cuadrado, ya que tienen IDS diferentes.
                                                            //  NOTA: Tuvimos que buscar esta solución por que era muy especifico lo que queriamos hacer.  
  cuadrado.addEventListener('click', () => {
    if (cuadrado.style.animationPlayState === 'paused') { // Cambia la animación cuando se hace clic
      cuadrado.style.animationPlayState = 'running';
    } else {
      cuadrado.style.animationPlayState = 'paused';  //Pausa el cuadrado en el que se clico
    }

    // Reproducir el sonido
    sonido.currentTime = 0; // Reiniciar el sonido por si ya estaba reproduciéndose
    sonido.play();
  });
});