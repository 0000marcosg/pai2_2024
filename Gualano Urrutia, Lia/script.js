// Lista de imágenes de objetos a lanzar
const items = [
    'url("imagenes/ANILLO copy.png")', // Anillo
    'url("imagenes/BILLETERA2 copy.png")', // BILLETERA
    'url("imagenes/ZAPATO.png")', //ZAPATO
    'url("imagenes/TIJERA copy.png")', //tijera
    'url("imagenes/IMG_9401.png")',//camiseta
    'url("imagenes/IMG_9402.png")', //cepillo
    'url("imagenes/IMG_9404.png")',//botella
    'url("imagenes/IMG_9405.png")', //perfume 
    'url("imagenes/IMG_9400.png")' //perfume 
  ];

let itemCount = 0; // Contador de elementos en el inodoro
const maxItems = 30; // Límite de elementos antes de activar el flush

// Función para tirar los elementos
function throwItem() {
  const toiletBowl = document.querySelector('.red-box');
  const item = document.createElement('div');
  item.classList.add('item');
  
  // una imagen de los items
  const randomItem = items[Math.floor(Math.random() * items.length)];
  item.style.backgroundImage = randomItem;
  
  // Posiciona el item en una posición aleatoria dentro del bowl
  item.style.left =  `${Math.random() * 15 + 50}%`; //  REVISAR CUANDO CAMBIEMOS LA IMAGEN//
  
  // Agrega el item al inodoro
  toiletBowl.appendChild(item);
  itemCount++; // Incrementa el contador de elementos
  console.log(itemCount); // el que te dice que aparece al lado.

  // Verifica si se alcanzó el límite de elementos
  if (itemCount >= maxItems) {
      document.addEventListener('keydown', handleKeyPress);
  }
}

// Función para manejar el evento de teclado
function handleKeyPress(event) {
  if (event.code === 'Space') {
      flushToilet();
      document.removeEventListener('keydown', handleKeyPress);
      const audio = document.getElementById('sonido-flush');
      audio.play();
  }
}

// Función para "flushear" los elementos
function flushToilet() {
  const toiletBowl = document.querySelector('.red-box'); //leyó la imagen
  toiletBowl.innerHTML = ''; // Elimina todos los elementos del inodoro
  itemCount = 0; // Reinicia el contador
}

// Reproduce el sonido
function playSound(){
  const audio = document.getElementById('sonido-flush');
  audio.play();
}

// Otra función para manejar eventos en el botón anterior (opcional)
function handleFlush() {
  alert("¡Botón clickeado!");
}

