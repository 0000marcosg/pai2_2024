let currentImage = 1; // Índice para llevar el control de la imagen actual
let clickCount = 1; // Contador de clics
const images = [
  "Parte1img1.png",
  "Parte1img2.png",
  "Parte2img1.png",
  "Parte2img2.png",
  "Parte3img1.png",
  "Parte4img2.png",
  "Parte5img1.png",
  "Parte5img2.png",
  "Parte6img1.png",
  "Parte6img2.png",
]; // Array con las rutas de las imágenes

function changeImage() {
  var image = document.getElementById("myImage");
  var counterDisplay = document.getElementById("counter"); // Elemento que mostrará el contador

  image.src = images[currentImage]; // Actualiza la imagen

  currentImage % 2 === 0 ? sounddown() : soundup(); // Reproduce sonido según si el indice es par o no

  // Mostrará el contador actualizado
  counterDisplay.textContent = "Clics: " + clickCount;

  // Incrementa el contador de clics
  clickCount = clickCount === images.length - 1 ? 0 : clickCount + 1; // Cambia el índice y lo hace cíclico para el contador

  currentImage = currentImage === images.length - 1 ? 0 : currentImage + 1; // Cambia el índice y lo hace cíclico para la imagen
}

let currentImageTone = 0;
const backgrounds = [
  "lana.jpg",
  "lego.jpg",
  "pizza.jpg",
  "papas.jpg",
  "plop.jpg",
]; // Array con las imágenes de fondo

function changeImageTone() {
  var background = document.getElementById("background"); // Obtiene el elemento que contiene el fondo
  background.style.backgroundImage =
    "url(" + backgrounds[currentImageTone] + ")"; // Actualiza la imagen segun el índice actual
  background.style.backgroundSize = "cover"; // Hace que la imagen de fondo cubra todo el contenedor
  currentImageTone =
    currentImageTone === backgrounds.length - 1 ? 0 : currentImageTone + 1; // Cambia el índice y lo hace cíclico para el background
}

function soundup() {
  const soundup = new Audio("soundup.wav");
  soundup.play(soundup.wav);
}

function sounddown() {
  const sounddown = new Audio("sounddown.wav");
  sounddown.play(sounddown.wav);
}
//Agrega sonido de levantar pesa y bajar pesa