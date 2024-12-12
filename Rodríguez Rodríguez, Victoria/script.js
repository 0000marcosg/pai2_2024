//---------------imagenes stickers---------------//
const stickersImg = [
  'img/autocad.png', 'img/columna.png', 'img/roma.png', 'img/estatua.png', 'img/artistapirata.png', 'img/peces.png', 'img/fadu.png', 'img/ceda.png', 'img/regla.png', 'img/rifa.png', 'img/morron.png', 'img/pai.png', 'img/graphdesign.png', 'img/trincheta.png', 'img/sintaxis.png', 'img/herramientas.png', 'img/maquina.png', 'img/maniqui.png',
];
//---------------imagenes stickers---------------//

//se declaran las constantes
const container = document.getElementById('container'); //se asigna el elemento container a una variable js del mismo nombre
const contadorDisplay = document.getElementById('contador'); //elemento que mostrara la cantidad de sickers en el div
const timerDisplay = document.getElementById('timer'); //elemento que mostrara el timer de la cuenta regresiva

let total = 0; //stickers totales a colocar
let contador = 0; //contador de stickers ubicados
let timerNum; //temporizador
let cuentaReg = 0; //tiempo restante
let timerFin = false; //verifica si se termino el tiempo
let puedeStickers = true; //verfica si el usuario esta habilitado a poner stickers
let timerCorriendo = false; //temporizador en curso

function quitarStickers() {
  const stickers = document.querySelectorAll('.sticker');
  stickers.forEach(sticker => sticker.remove()); //funcion para eliminar todos los stickers
}

//---------------accion click izquierdo---------------//
container.addEventListener('click', (event) => { //se busca detectar un click dentro del container
  if (event.button === 0 && puedeStickers && !timerCorriendo) { //si ocurre un click izquierdo y se pueden colocar stickers
     if (total === 0) { //cuando se coloca el primer sticker...
      total = Math.floor(Math.random() * 25) + 1; //se genera un numero aleatorio entre 1 y 25...
      contadorDisplay.style.display = 'block'; //aparece el contador...
      contador = 1; //primer sticker
      contadorDisplay.textContent = `1/${total}`; //y el contador sube a 1 sticker
    } 
    else {
      contador++; 
      contadorDisplay.textContent = `${contador}/${total}`; //cada vez que un sticker se coloca, aumenta el contador y se actualiza el texto
    }

    const img = document.createElement('img'); 
    const randomImage = stickersImg[Math.floor(Math.random() * stickersImg.length)]; //si hay un click izquierdo se crea una imagen aleatoria dentro del conjunto de stickers declarados
    img.src = randomImage;
    img.classList.add('sticker'); //le da la clase de sticker a la imagen, y por ende la permite ser modificada en CSS

    img.onload = function() { //se espera a que la imagen cargue
      const offsetX = event.clientX - container.getBoundingClientRect().left; //se calcula la distancia horizontal entre el cursor al momento del click y la esquina izquierda del container para encontrar la posicion del mouse
      const offsetY = event.clientY - container.getBoundingClientRect().top; //se calcula la distancia vertical entre el cursor al momento del click y la esquina superior del container para encontrar la posicion del mouse
      img.style.left = `${offsetX}px`; //marca donde en el container se debe ubicar la imagen en el eje x en base a la ubicacion del cursor
      img.style.top = `${offsetY}px`; //marca donde en el container se debe ubicar la imagen en el eje y en base a la ubicacion del cursor 
      img.style.transform = 'translate(-50%, -50%)'; //se ubica la imagen en las posiciones calculadas de x e y, para que aparezca exactamente donde esta el cursor
      const randomRotation = Math.floor(Math.random() * 180) - 90;  //elige un angulo aleatorio entre -90 y 90
      img.style.transform = `translate(-50%, -50%) rotate(${randomRotation}deg)`; //se aplica la rotacion aleatoria
      container.appendChild(img); //se agrega la imagen en el container
    };

    // Si se llega al total, empezar el contador y no permitir que se coloquen mas stickers
    if (contador === total) { //si se llego al total...
      puedeStickers = false; //se deshabilita la colocacion de stickers...
      timerCorriendo = true; //verifica si hay un timer...
      timerComienza(); //y comienza el timer
    }
  }
});
//---------------accion click izquierdo---------------//

//---------------accion click derecho---------------//
document.addEventListener('contextmenu', function(event) {
  event.preventDefault(); //se prohíbe el despliegue del menu cuando se hace click derecho
});

container.addEventListener('contextmenu', (event) => { //si se detecta un click derecho...
  if (event.target.tagName === 'IMG' && event.target.parentElement === container) { //y si lo detecta sobre una imagen en el container...
      container.removeChild(event.target); //se quita la imagen
      if (contador > 0) {
        contador--; //si se quita el sticker, baja el contador
        contadorDisplay.textContent = `${contador}/${total}`; //cada vez que un sticker se saca, disminuye el contador y se actualiza el texto
      }

      if (contador === 0 && cuentaReg > 0 && !timerFin) { //verifica si todos los stickers fueron quitados dentro del tiempo determinado
        clearInterval(timerNum); //se para el timer
        timerFin = true; //se considera completa la actividad

        timerDisplay.classList.add('victoria'); //se le agrega 'victoria' a la clase, para que aplique la sacudida y el cambio de color
        timerDisplay.style.color = 'green'; // Cambiar color a verde en caso de exito
        document.body.style.backgroundColor = 'rgba(0, 128, 0, 0.7)';

        setTimeout(() => { //luego de la animacion...
          timerDisplay.classList.remove('victoria'); //se le quita el nombre 'victoria'...
          gameReset(); //y se reseta la experiencia
        }, 2000); //la animacion dura 2000 milisegundos
      }
    }
  });
//---------------accion click derecho---------------//

//---------------timer---------------//
function timerComienza() { //funcion para el comienzo del timer
  const mouseImg = document.getElementById('mouseImg');
  mouseImg.style.display = 'block'; //cuando empieza el timer, se hace visible la imagen
  if (total >= 1 && total <= 10) {
    cuentaReg = Math.floor(Math.random() * 5) + 1; //si el total de stickers era entre 1 y 10, el timer generara un numero entre 1 y 5s
  } else if (total >= 11 && total <= 15) {
    cuentaReg = Math.floor(Math.random() * 6) + 5; //si el total de stickers era entre 11 y 15, el timer generara un numero entre 5 y 10s
  } else if (total >= 16 && total <= 25) {
    cuentaReg = Math.floor(Math.random() * 6) + 10; //si el total de stickers era entre 16 y 25, el timer generara un numero entre 10 y 15s
  }

  timerDisplay.style.display = 'block'; //se muestra el timer
  timerDisplay.style.color = 'red'; //se cambia el timer a color rojo
  timerActualDisplay(cuentaReg); //se va actualizando el timer

  timerNum = setInterval(function() { //comienza el timer
    cuentaReg--; //cuenta regresiva de a 1s
    timerActualDisplay(cuentaReg); //se va actualizando
    if (cuentaReg <= 0) {
      clearInterval(timerNum);
      if (contador > 0) {
        gameOver(); //si termina el timer, se finalizo la experiencia
      }
    }
  }, 1000); //se actualiza cada 1 segundo
}

function timerActualDisplay(segundos) { //visualizacion del timer en formato 00:00
  const minutos = Math.floor(segundos / 60); //minutos
  const segundosFaltan = segundos % 60; //segundos
  timerDisplay.textContent = `${String(minutos).padStart(2, '0')}:${String(segundosFaltan).padStart(2, '0')}`; //siempre se representan de a dos digitos 
}

function gameOver() { //cuando el usuario falla
  timerDisplay.classList.add('falla'); //se le agrega 'falla' a la clase, para que aplique la sacudida
  document.body.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
  setTimeout(() => {
    gameReset(); //se reseta la experiencia
  }, 2000); 
}

function gameReset() { //cuando se resetea la experiencia, se resetean todas las variables
  total = 0;
  contador = 0; 
  puedeStickers = true; //se habilita la colocacion de stickers
  timerCorriendo = false; //deja de correr el timer
  timerFin = false;
  cuentaReg = 0;

  quitarStickers();

  timerDisplay.style.color = ''; //color del timer
  timerDisplay.textContent = ''; //display del timer
  contadorDisplay.textContent = ''; //display del contador
  contadorDisplay.style.display = 'none'; //no se visualiza el contador
  timerDisplay.style.display = 'none';
  document.body.style.backgroundColor = ''; //reseteamos el color del fondo a su estado inicial

  timerDisplay.classList.remove('victoria', 'falla', 'no-shake');

  if (timerNum) { 
    clearInterval(timerNum); 
    timerNum = null;
  }

  const mouseImg = document.getElementById('mouseImg');
  if (mouseImg) {
    mouseImg.style.display = 'none'; //se oculta la imagen del mouse
  }
}
//---------------timer---------------//

//---------------audios---------------//
const stickerOn = document.getElementById('stickeronleft'); //audio activado con click izquierdo
const stickerOff = document.getElementById('stickeroffright'); //audio activado con click derecho

function clickContainer(event) {
  return container.contains(event.target); //se fija si el click ocurrio dentro del container 
}

document.addEventListener('click', function(event) {
  if (event.button === 0 && clickContainer(event)) {
    stickerOn.play(); //si hay un click izquierdo solo dentro del container se activa el audio
  }
});

document.addEventListener('contextmenu', function(event) {
  event.preventDefault();  
  const stickerClick = event.target.tagName === 'IMG' && event.target.classList.contains('sticker'); //se fija si el area clickeada tiene un sticker
  if (stickerClick) {
    stickerOff.play(); //si hay stickers en el container y el click sucedió sobre un sticker, se reproduce el audio
  }
});
//---------------audios---------------//
