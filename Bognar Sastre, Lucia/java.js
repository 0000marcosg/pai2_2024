const dientes = document.querySelectorAll('.diente');
const ojos = document.getElementById('ojos');
const ojo = document.querySelector('.ojo');
const ojosDoloridos = 'img/ojosdoloridos.png';

    //Sonido de reset
function resetdientes() {
  const resetSound = new Audio('img/reinicio.wav');
  resetSound.play();

  ojos.src = 'img/ojos.png';
  setTimeout(() => {
    ojos.src = 'img/ojos.png';
  }, 1000);

  dientes.forEach(diente => {
    diente.classList.remove('roto', 'roto-inverso', 'caer');
  });
}

dientes.forEach(diente => {
  diente.addEventListener('click', () => {
    if (!diente.classList.contains('roto') && !diente.classList.contains('caer') && !diente.classList.contains('roto-inverso')) {
      const soundSrc = diente.getAttribute('data-sound');
      const sound = new Audio(soundSrc);
      sound.play();

      // Cambia la imagen de los ojos cuando se hace clic en un diente
      if (window.matchMedia("(max-width: 768px)").matches) {  // Para el modo responsive
        ojo.src = 'img/ojodolorido.png';
        setTimeout(() => {
          ojo.src = 'img/ojo5.png'; // Vuelve a la imagen de antes
        }, 1000);
      } else {
        ojos.src = ojosDoloridos;  // Para modo normal
        setTimeout(() => {
          ojos.src = 'img/ojos.png';
        }, 1000);
      }

      // Hacer animaciones random
      const random = Math.random();
      if (random < 0.33) {
        diente.classList.add('roto');
      } else if (random < 0.66) {
        diente.classList.add('roto-inverso');
      } else {
        diente.classList.add('caer');
      }

      // Reset si está todo roto
      const allroto = Array.from(dientes).every(diente =>
        diente.classList.contains('roto') ||
        diente.classList.contains('roto-inverso') ||
        diente.classList.contains('caer')
      );
      if (allroto) {
        setTimeout(resetdientes, 1000);
      }
    }
  });
});
