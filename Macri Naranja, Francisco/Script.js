// Generamos las variables
var cartelok = document.getElementsByClassName('cartelok');
var cartelcruz = document.getElementsByClassName('cartelcruz');
var carteles = document.getElementsByClassName('carteleserror');
var clickcontainer = document.getElementById('contenedor');
var monasotext = document.getElementById('monasoicotext');
var monasoicono = document.getElementById('monasoico');
var monaso = document.getElementById('monaso');
var lista = document.getElementById('miLista');
var Puntostext = document.getElementById('puntaje');
var Puntostextcontainer = document.getElementById('puntostext');
var puntos = 0;
var sonido = new Audio('Recursos/ding.mp3'); // sonido palmono
var musica = new Audio('Recursos/musica.mp3'); // sonido de fondo 4000 puntos +
var error = new Audio('Recursos/erro.mp3'); // sonido de carteles

musica.loop = true; 

monasoicono.addEventListener('dblclick', function() {
    monaso.style.display = "block";
    clickcontainer.style.backgroundImage = 'url("Recursos/windouconelmonaso.png")';

});

monasoicono.addEventListener('click', function() {
    monasoicono.style.backgroundColor = "rgba(0, 0, 255, 0.3)"; 
    monasotext.style.backgroundColor = "rgba(0, 0, 255, 0.3)";
    event.stopPropagation(); 
    
    /* event.stopPropagation(): detiene la propagación del click hacia los elementos padre.
    en pocas palabras cuando hacemos un click en los elementos como el icono o el texto del mono,
    también hacemos click en el contenedor ya que es el nodo padre y está primero que estos 2
    independientemente de cualquier zindex, entonces con stopPropagation(); 
    hacemos que al hacer click, este solamente funcione sobre los elementos que uno señala en el evento.

     https://www.w3schools.com/jsref/event_stoppropagation.asp */

});
monasotext.addEventListener('click', function() {
    monasoicono.style.backgroundColor = "rgba(0, 0, 255, 0.3)"; 
    monasotext.style.backgroundColor = "rgba(0, 0, 255, 0.3)";
    event.stopPropagation(); // Evita que el clic se propague al contenedor

});
contenedor.addEventListener('click', function() {
    monasoicono.style.backgroundColor = "rgba(0, 0, 255, 0.0)"; 
    monasotext.style.backgroundColor = "rgba(0, 0, 255, 0.0)";
});

// aumentar el puntaje al hacer clic en el mono
monaso.addEventListener('click', function() {
    puntos += 100;
    Puntostext.textContent = puntos;
    sonido.currentTime = 0;  // Esto hace que el sonido se reproduzca aunque el anterior no haya terminado
    sonido.play();
    Puntostextcontainer.style.display = "block";
    monaso.style.backgroundImage = 'url("Recursos/monaso.gif")'
    
    // agregamos los eventos en base a la cantidad de puntos con el uso de condicionales
  if (puntos > 0 && puntos <=900){
    monaso.style.animation = "moverHorizontal 3s linear infinite alternate, moverVertical 4s linear infinite alternate"; 
}
  else if (puntos >= 1000 && puntos <=1900){
    monaso.style.animation = "moverHorizontal 2.5s linear infinite alternate, moverVertical 3.5s linear infinite alternate";
} else if (puntos >= 2000 && puntos <=2900){
    monaso.style.backgroundImage = 'url("Recursos/monasogiratorio.gif")';
    monaso.style.animation = "moverHorizontal 2s linear infinite alternate, moverVertical 3s linear infinite alternate";
} else if (puntos >= 3000 && puntos <=3900){
    monaso.style.backgroundImage = 'url("Recursos/monasolentes.gif")';
    monaso.style.animation = "moverHorizontal 1.5s linear infinite alternate, moverVertical 2.5s linear infinite alternate";
} else if (puntos >= 4000 && puntos <=4900){
    musica.play();
    monaso.style.backgroundImage = 'url("Recursos/monasolocaso.gif")';
    monaso.style.animation = "moverHorizontal 1s linear infinite alternate, moverVertical 2s linear infinite alternate";
} else if (puntos >= 5000 && puntos <=5900){
    musica.play();
    monaso.style.backgroundImage = 'url("Recursos/monasolocaso.gif")';
    monaso.style.animation = "moverHorizontal 0.5s linear infinite alternate, moverVertical 1.5s linear infinite alternate";
} else if (puntos >= 6000 && puntos <=6900){
    musica.play();
    monaso.style.backgroundImage = 'url("Recursos/monasolocaso.gif")';
    monaso.style.animation = "moverHorizontal 0.005s linear infinite alternate, moverVertical 0.005s linear infinite alternate";
} 

if (puntos == 1000){
    error.play();
    generarCartelesAleatorios(5)
    
} else if (puntos == 2000){
    generarCartelesAleatorios(10)
    error.play();
}   
else if (puntos == 3000){
    error.play();
    generarCartelesAleatorios(20)
} else if (puntos == 4000){
    error.play();
    generarCartelesAleatorios(30)
} else if (puntos == 5000){
    error.play();
    generarCartelesAleatorios(40)
} else if (puntos == 6000){
    error.play();
    generarCartelesAleatorios(500)
} else if (puntos >= 6100){
    musica.pause();
    clickcontainer.style.backgroundImage = 'url("Recursos/errorfinal.jpg")';
    clickcontainer.style.zIndex = "1000"
    Puntostextcontainer.style.display = "none";
    monaso.style.display = "none";
    monasoicono.style.display = "none";
    monasotext.style.display = "none";
    /* document.querySelectorAll('.carteleserror') selecciona todos los 
    elementos que tienen la clase carteleserror.
    la lista generada por querySelectorAll permite el uso de .forEach, un método que ejecuta una 
    función en cada elemento de la lista.*/
    let todosLosCarteles = document.querySelectorAll('.carteleserror');
    todosLosCarteles.forEach(cartel => {
        cartel.style.display = "none";
    });
}
});

function generarCartelesAleatorios(cantidad) {
    for (let i = 0; i < cantidad; i++) { 
        /* generamos una función con bucle para la generación de nuevos carteles 
        básicamente generamos una variable i con un valor 0, luego con i < cantidad; i++ indicamos que
        mientras i sea menor a "cantidad", se vuelva a ejecutar el bucle y a su vez con i++ se le agrega
        1 al i = 0 por cada vez que se repite el buscle hasta llegar a "cantidad", una vez llegado a "cantidad"
        el bucle se detiene.*/
        
        let nuevoCartel = document.createElement('div');
        nuevoCartel.classList.add('carteleserror');
        nuevoCartel.style.display = "block";
    
        nuevoCartel.style.position = "fixed";
        nuevoCartel.style.left = Math.random() * 80 + 'vw'; 
        nuevoCartel.style.top = Math.random() * 80 + 'vh'; 

        let cruz = document.createElement('div');
        cruz.classList.add('cartelcruz');
        cruz.addEventListener('click', function () {
            nuevoCartel.remove(); 
            generarCartelesAleatorios(5); 
            error.currentTime = 0;
            error.play();
        });

        let ok = document.createElement('div');
        ok.classList.add('cartelok');
        ok.addEventListener('click', function () {
            nuevoCartel.remove();
            generarCartelesAleatorios(5);
            error.currentTime = 0; 
            error.play();
        });

        nuevoCartel.appendChild(cruz);
        nuevoCartel.appendChild(ok);
        document.body.appendChild(nuevoCartel);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", activarPantallaCompleta, { once: true });
    /* Utilizamos once: true para indicar que el evento ha de ejecutarse una vez sola.
    por otro lado utilizamos "DOMContentLoaded", con esto indicamos que el código se debe ejecutar tan 
    pronto como el HTML esté listo para ser manipulado, antes de que se terminen de cargar 
    todos los recursos externos.*/
});

contenedor.addEventListener('click', function() {
    clickcontainer.style.backgroundImage = 'url("Recursos/windou.jpg")';
    monasoicono.style.display = "block"
    monasotext.style.display = "block"
}, { once: true });

function activarPantallaCompleta() {
    const elemento = document.documentElement;
    if (elemento.requestFullscreen) {
        elemento.requestFullscreen();
    } else if (elemento.webkitRequestFullscreen) {
        elemento.webkitRequestFullscreen(); 
    } else if (elemento.msRequestFullscreen) {
        elemento.msRequestFullscreen();
    }
}