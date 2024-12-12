let scoop = document.querySelector('.scoop');
let scoopImg = document.querySelector('.scoop-img'); // Seleccionamos la imagen de la bocha
let invisibleDiv = document.querySelector('.invisible-div');
let isFalling = false; // Control de si la bocha está cayendo
let isInside = false;  // Control de si la bocha está dentro del invisible-div

let levelCounter = document.getElementById('level-counter'); // Referencia al contador de nivel
let currentLevel = 1; // Nivel inicial

// Duración inicial de la animación de movimiento lateral
let moveDuration = 30; // 30 segundos

// Array con las imágenes de las bochas
const scoopImages = [
  'img/bocha menta.png',
  'img/bocha frutilla.png',
  'img/bocha chocolate.png',
  'img/bocha vainilla.png',
  'img/bocha ddl.png',
  'img/bocha sambayon.png',
  'img/bocha arandanos.png' // Agrega más imágenes según las necesites
];

// Cargar el sonido de la caída
let fallSound = new Audio('sonidos/helado.wav'); // Ruta a tu archivo de sonido

// Función para generar un índice aleatorio para las imágenes
function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * scoopImages.length);
  return scoopImages[randomIndex];
}

// Detectar si la bocha está dentro del invisible-div
function checkCollision() {
  let divRect = invisibleDiv.getBoundingClientRect();
  let scoopRect = scoop.getBoundingClientRect();

  // Verificar si hay colisión (bocha dentro del div)
  isInside =
    scoopRect.left < divRect.right &&
    scoopRect.right > divRect.left &&
    scoopRect.top < divRect.bottom &&
    scoopRect.bottom > divRect.top;
}

// Manejar clics en la bocha
scoop.addEventListener('click', () => {
  if (isInside && !isFalling) { // Si la bocha está dentro del div invisible y no está cayendo
    isFalling = true; // Bloquea la interacción mientras la bocha cae

     // Reproducir sonido de la caída
     fallSound.play();

    // Iniciar animación de caída
    scoop.style.animation = 'fallAndBounce 1s ease-in-out forwards';

   // Después de la animación de caída
   setTimeout(() => {
// Restaurar movimiento lateral con nueva velocidad
moveDuration = Math.max(3, moveDuration - 3); // Reducir 3s, con un límite mínimo de 3 segundos
scoop.style.animation = `moveScoop ${moveDuration}s linear infinite alternate`;

    // Cambiar la imagen de la bocha aleatoriamente
    scoopImg.src = getRandomImage();

      // Incrementa el nivel
      currentLevel++; 
      levelCounter.textContent = currentLevel; // Actualiza el contador de nivel

    isFalling = false; // Permitir interacción nuevamente
  }, 1000); // Duración de la animación de caída
}
});

// También manejar clics en el invisible-div
invisibleDiv.addEventListener('click', () => {
  if (isInside && !isFalling) {
    scoop.click(); // Simula el clic en la bocha si está dentro del invisible-div
  }
});

// Revisión constante de la colisión
setInterval(checkCollision, 100); // Revisa la colisión cada 100ms para asegurar que se detecte correctamente
