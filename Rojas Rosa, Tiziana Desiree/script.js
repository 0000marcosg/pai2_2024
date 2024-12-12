const listaelementos = ['objeto1', 'objeto2', 'objeto3', 'objeto4', 'objeto5', 'objeto6',
    'objeto7', 'objeto8', 'objeto9', 'objeto10', 'objeto11', 'objeto12',
    'objeto13', 'objeto14', 'objeto15', 'objeto16', 'objeto17', 'objeto18',
    'objeto19', 'objeto20', 'objeto21', 'objeto22', 'objeto23', 'objeto24',
    'objeto25', 'objeto26', 'objeto27', 'objeto28', 'objeto29', 'objeto30', 'objeto31', 'objeto32'];

const idpositivos = [];
const idnegativos = [];

window.onload = function() {      
seleccionarpositivos();
seleccionarnegativos();
};

// Selecciona aleatoriamente elementos para ubicar las opciones correctas
function seleccionarpositivos() {

const cantidad = 4;
    
while (idpositivos.length < cantidad) {
  const randomIndice = Math.floor(Math.random() * listaelementos.length);
  const randomId = listaelementos[randomIndice];
             
// Chequea si no existe el id en la lista de ids
  if (!idpositivos.includes(randomId)) {
    idpositivos.push(randomId);
  }
      
}

// Recorre la lista de ids y le agrega estilo y evento
for (var i=0; i<idpositivos.length; i=i+1){
  const elemento = document.getElementById(idpositivos[i]);
  elemento.classList.add('cursor-puntero');
  elemento.addEventListener('click', aumentar);
  elemento.addEventListener('mouseover', agregaranimacionbordepositivo);
  elemento.addEventListener('mouseout', quitaranimacionborde);
}

};

// Selecciona aleatoriamente elementos para ubicar las opciones incorrectas
function seleccionarnegativos() {

const cantidad = 4;

while (idnegativos.length < cantidad) {
  const randomIndice = Math.floor(Math.random() * listaelementos.length);
  const randomId = listaelementos[randomIndice];
    
  // Chequea si no existe el id en la lista de ids positivos y tampoco en la lista de ids de negativos
  if (!idpositivos.includes(randomId)) {
    if (!idnegativos.includes(randomId)) {
      idnegativos.push(randomId);
    }    
  }
}

// Recorre la lista de ids y le agrega estilo y evento
for (var i=0; i<idnegativos.length; i=i+1){
  const elemento = document.getElementById(idnegativos[i]);
  elemento.classList.add('cursor-puntero');
  elemento.addEventListener('click', resetear);
  elemento.addEventListener('mouseover', agregaranimacionbordenegativo);
  elemento.addEventListener('mouseout', quitaranimacionborde);
}

/* Para que se pueda ver las opciones en pantallas de dispositivos moviles en orientacion horizontal  */
if (window.innerWidth <= 950) {
  agregaranimacionbordeTodos();
}

};


// Al hacer clic en una opcion correcta se ejecuta la funcion aumentar
function aumentar(event) {
var wedding= document.getElementById("wedding");


// Al aumentar las opciones correctas cambia secuencia de imagenes
if (wedding.style.backgroundImage == "") {
  wedding.style.backgroundImage ='url("img/fondo1lleno.png")';
} else if (wedding.style.backgroundImage == 'url("img/fondo1v.png")') {
  wedding.style.backgroundImage = 'url("img/fondo1lleno.png")';
} else if (wedding.style.backgroundImage == 'url("img/fondo1lleno.png")') {
  wedding.style.backgroundImage = 'url("img/fondo2lleno.png")';
} 
  else if (wedding.style.backgroundImage == 'url("img/fondo2lleno.png")') {
  wedding.style.backgroundImage = 'url("img/fondo3.png")';
} 
  else {
  wedding.style.backgroundImage = 'url("img/Final.png")';

  //En la ultima imagen, le agrega animacion, color de fondo , cursor y redirije a pag agradecimiento con evento click
  wedding.classList.add('completo');
  wedding.classList.add('scale-up-center');
  wedding.classList.add('cursor-puntero');
  wedding.addEventListener('click', redirigirfinal);

  reproducirFestejo();

  // Recorre la lista de ids positivos y le agrega la animacion
  for (var i=0; i<idpositivos.length; i=i+1){
    const elemento = document.getElementById(idpositivos[i]);
    elemento.classList.add('scale-up-center');
  }

   // Recorre la lista de ids negativos, le quita estilos, animacion de borde, evento clic y mouseover
  for (var i=0; i<idnegativos.length; i=i+1){
    const elemento = document.getElementById(idnegativos[i]);
    elemento.classList.remove('negativo-encontrado');
    elemento.classList.remove('cursor-puntero');
    elemento.classList.remove('animacion-borde');
    elemento.removeEventListener('click', resetear);
    elemento.removeEventListener('mouseover', agregaranimacionbordenegativo);
  }
 
} 

// Detener sonido de opcion incorrecta
pausarNegativo();

//Reproducir sonido de opcion correcta
reproducirCorrecto();


//Agrega clase de estilo con imagen de fondo. Les quita puntero, animacion borde y evento click
var objeto = document.getElementById(event.target.id);
objeto.classList.add('positivo-encontrado');
objeto.classList.remove('cursor-puntero');
objeto.classList.remove('animacion-borde');
objeto.removeEventListener('click', aumentar);

 // Recorre la lista de ids negativos y le quita estilo 
for (var i=0; i<idnegativos.length; i=i+1){
  const elemento = document.getElementById(idnegativos[i]);
  elemento.classList.remove('negativo-encontrado');
}
  
};

// Ejecutar funcion resetear cuando se hace clic en opcion incorrecta
function resetear(event) {
//Seleccionada la opcion incorrecta regresa a imagen original de novios y le quita evento clic
var wedding = document.getElementById("wedding");
wedding.style.backgroundImage ='url("img/fondo1v.png")';
wedding.classList.remove('completo');
wedding.removeEventListener('click', redirigirfinal);

//Agrega clase de estilo con imagen de fondo
var objeto = document.getElementById(event.target.id);
objeto.classList.add('negativo-encontrado');
objeto.classList.remove('animacion-borde');

// Recorre la lista de ids positivos y le quita estilo 
for (var i=0; i<idpositivos.length; i=i+1){
  const elemento = document.getElementById(idpositivos[i]);
  elemento.classList.remove('positivo-encontrado');
  elemento.classList.add('cursor-puntero');
  elemento.addEventListener('click', aumentar);
}

// Detener sonido de opcion correcta
pausarCorrecto();
//Reproducir sonido de opcion incorrecta
reproducirNegativo();

};

//Animacion de borde de opciones correctas (Pantallas grandes)
function agregaranimacionbordepositivo(event) {
var objeto = document.getElementById(event.target.id);
if(!objeto.classList.contains('positivo-encontrado')){
  if (window.innerWidth > 768) {
    //Agrega clase de estilo con imagen de fondo
    objeto.classList.add('animacion-borde');
  }
}
}

//Animacion de borde de opciones incorrectas (Pantallas grandes)
function agregaranimacionbordenegativo(event) {
var objeto = document.getElementById(event.target.id);
if(!objeto.classList.contains('negativo-encontrado')){
  if (window.innerWidth > 768) {
    //Agrega clase de estilo con imagen de fondo
    objeto.classList.add('animacion-borde');
  }
}
}

//Quitar animacion a opciones seleccionada (pantallas grandes)
function quitaranimacionborde(event) {
 if (window.innerWidth > 768) {
  //Agrega clase de estilo con imagen de fondo
  var objeto = document.getElementById(event.target.id);
  objeto.classList.remove('animacion-borde');
}
}

// Agrega animacion a opciones correcta e incorrecta cada x tiempo (pantallas chicas)
function agregaranimacionbordeTodos() {
var contador = 0;

var intId = setInterval(function() {
  var positivosencontrados = 0;

  // Se agrega la animacion a todas las opciones correctas que aun no fueron encontradas
  for (var i=0; i<idpositivos.length; i=i+1){
    const elemento = document.getElementById(idpositivos[i]);
    if (!elemento.classList.contains('positivo-encontrado')) {
      elemento.classList.add('animacion-borde');
    } else {
      positivosencontrados = positivosencontrados + 1;
    }
  }

  // Si todavia no se encontraron todas las opciones correctas se agrega animacion a las opciones negativas
  if (positivosencontrados < idpositivos.length) {
    for (var i=0; i<idnegativos.length; i=i+1){
      const elemento = document.getElementById(idnegativos[i]);
      if(!elemento.classList.contains('negativo-encontrado')) {
        elemento.classList.add('animacion-borde');
      }  
    }
  
    //Al finalizar intervalo ejecuta a la funcion de quitar animacion de borde
    if(++contador >= 3) {
      quitaranimacionbordeTodos();
      clearInterval(intId);
    } 
  }
}, 1000);
};

// Quita animacion a opciones correcta e incorrecta cada x tiempo (pantallas chicas)
function quitaranimacionbordeTodos() {
var contador = 0;

//Quita clase de animacion de borde por un intervalo de tiempo 
var intId = setInterval(function() {
  for (var i=0; i<idpositivos.length; i=i+1){
    const elemento = document.getElementById(idpositivos[i]);
    elemento.classList.remove('animacion-borde');
  }

  for (var i=0; i<idnegativos.length; i=i+1){
    const elemento = document.getElementById(idnegativos[i]);
    elemento.classList.remove('animacion-borde');
  }
  //Al finalizar intervalo ejecuta a la funcion de agregar animacion de borde
  if(++contador >= 4) {
    agregaranimacionbordeTodos();
    clearInterval(intId);
  } 
}, 1000);
};

function redirigirfinal() {
// Redirigir a otra página
window.location.href = "final.html";
}

function redirigirindex() {
// Redirigir a otra página
window.location.href = "index.html";
}

function redirigirbusqueda() {
// Redirigir a otra página
window.location.href = "busqueda.html";
}

//Asignamos audios a opciones correctas, incorrectas y al festejo
var audioPositivo = new Audio("sonido/correcto.mp3");

audioPositivo.loop=false;

function reproducirCorrecto() {
audioPositivo.currentTime = 0.5;
audioPositivo.play();
}

audioPositivo.onloadeddata = function(){
  reproducirCorrecto();
};

function pausarCorrecto() {
audioPositivo.pause();
}

var audioNegativo = new Audio("sonido/incorrecto.mp3");

audioNegativo.loop=false;

function reproducirNegativo() {
audioNegativo.currentTime = 1.5;
audioNegativo.play();
}

function pausarNegativo() {
audioNegativo.pause();
}

var audioFestejo = new Audio("sonido/festejo.mp3");
audioFestejo.loop=true;
function reproducirFestejo() {
  audioFestejo.currentTime = 0;
  audioFestejo.play();
}

