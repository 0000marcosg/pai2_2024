// Sonidos de memes predefinidos
const sonidosMeme = {
  'finish-him': new Audio("audio/finish-him.mp3"),
  'mewing': new Audio("audio/mewing.mp3"),
  'que-bendicion': new Audio("audio/que-bendicion.mp3"),
  'ibai': new Audio("audio/risa-ibai.mp3"),
  'y-se-marcho': new Audio("audio/y-se-marcho.mp3"),
  'como-tan': new Audio("audio/como-tan-muchacho.mp3"),
  'siuu': new Audio("audio/siuu.mp3"),
  'mission': new Audio("audio/mission.mp3"),
  'flauta': new Audio("audio/flauta.mp3")
};

// Lista de reproducción global para almacenar memes con control de volumen
let listaReproduccion = [];

// Objeto que mapea los nombres de los memes con sus respectivas rutas de imágenes
const imagenesMeme = {
  'finish-him': 'img/finishhim.jpeg',
  'mewing': 'img/mewing.png',
  'que-bendicion': 'img/que-bendicion.jpg',
  'ibai': 'img/ibai.jpg',
  'y-se-marcho': 'img/y-se-marcho.jpg',
  'como-tan': 'img/como-tan-muchacho.jpg',
  'siuu': 'img/siuu.jpeg',
  'mission': 'img/mission.png',
  'flauta': 'img/flauta.jpeg'
};

// Función para agregar meme a la lista de reproducción
function agregarMemeALista(meme) {
  const elementoLista = document.createElement('div');
  elementoLista.className = 'elemento-lista'; 
  
  // Crear el contenedor de la imagen del meme con la ruta dinámica
  const imagenMeme = document.createElement('img');
  
  // Usar la ruta de la imagen correspondiente al meme
  imagenMeme.src = imagenesMeme[meme]; // Se obtiene la ruta correcta desde el objeto
  imagenMeme.alt = meme;
  imagenMeme.className = 'meme-chico'; 
  elementoLista.appendChild(imagenMeme); // Agregar la imagen al contenedor

  // Crear el control de volumen
  const controlVolumen = document.createElement('input');
  controlVolumen.type = 'range';
  controlVolumen.min = 0;
  controlVolumen.max = 1;
  controlVolumen.step = 0.1;
  controlVolumen.value = 1; // Volumen predeterminado
  controlVolumen.className = 'control-volumen';
  elementoLista.appendChild(controlVolumen);

  // Seleccionar todos los sliders de volumen
const sliders = document.querySelectorAll('.control-volumen');

  // Imagen de icono de basura
  const iconoBasura = document.createElement('img');
  iconoBasura.src = 'img/cubobasura.png'; 
  iconoBasura.alt = 'Eliminar';
  iconoBasura.className = 'icono-basura';
  iconoBasura.onclick = () => borrarMemeDeLista(elementoLista, meme);
  elementoLista.appendChild(iconoBasura);

  // Agregar elemento a la lista de reproducción en el DOM
  document.getElementById('lista').appendChild(elementoLista);

  // Almacenar el meme en la lista de reproducción (con su control de volumen)
  listaReproduccion.push({ meme, controlVolumen });
}

// Función para borrar un meme de la lista de reproducción
function borrarMemeDeLista(elementoLista, meme) {
  // Eliminar el elemento del DOM
  elementoLista.remove();
  
  // Eliminar el meme del array listaReproduccion
  listaReproduccion = listaReproduccion.filter(item => item.meme !== meme);
}

// Reproducir cada sonido en la lista de reproducción
async function reproducirLista() {
  for (let item of listaReproduccion) {
    const audio = sonidosMeme[item.meme].cloneNode();
    audio.volume = item.controlVolumen.value;
    audio.play();
    await new Promise(resolve => {
      audio.onended = resolve; // Espera hasta que el sonido termine
    });
  }
}

  