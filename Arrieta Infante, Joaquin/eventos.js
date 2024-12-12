let contador = 0; // Contador de luciernagas en 0 cuando incia
let clicksGigante = 15; // Contador de polilla en 15 cuando inicia
// Audio de fondo empieza apagado 
const audioFondo = new Audio('sound/background.m4a'); 
audioFondo.loop = true;
audioFondo.volume = 0.1;
let isPlaying = false;

// Activar el audio
function activarAudioFondo() {
  const sonidoFondoIcon = document.getElementById("sonidoFondo");
  //Si esta apagado el sonido lo reproduce, si esta encendido lo apaga
  if (isPlaying) {
    audioFondo.pause();
    sonidoFondoIcon.classList.replace("fa-volume-up", "fa-volume-mute");
    isPlaying = false;
  } else {
    audioFondo.play();
    sonidoFondoIcon.classList.replace("fa-volume-mute", "fa-volume-up");
    isPlaying = true;
  }
}

// Agarrar las luciérnagas
function activarAnimacion(id, event) {
  // Reproducir sonido de "desaparecer" al hacer click en las luciérnagas
  const sonido = new Audio('sound/agarrar.m4a');
  sonido.volume = 0.1;
  if (isPlaying) sonido.play();

  // Obtener el objeto de la luciérnaga clickeada
  const objeto = document.getElementById(id);
  objeto.style.display = "none";  // Ocultar la luciérnaga
  objeto.style.animationPlayState = "paused"; // Pausar la animación

  // Agregar la luciérnaga al frasco
  if (contador <= 30){
  const frasco = document.getElementById("frasco");
  const luciernagaEnFrasco = document.createElement("div");
  frasco.appendChild(luciernagaEnFrasco);
  }
  // Incrementar el contador de luciérnagas atrapadas
  contador++;
  document.getElementById("contador").textContent = contador;

  // Generar los brillos
  const queBrillo = "brillos"; 
  MostrarBrillos (event, queBrillo)

  // Si se atraparon todas las luciérnagas, mostrar la polilla
  if (contador === 20) {
    mostrarLuciernagaGigante();
  }
  if (contador >= 1) { 
    document.getElementById("reinicio").style.display = "block";

  }
  //Vuelve a aparecer a los 3 segundos
  setTimeout(() => {
    objeto.style.display = "block";  // Vuelve la luciérnaga
    objeto.style.animationPlayState = "running"; // Empezar la animación
  }, 3000); 
}

// Muestra la polilla
function mostrarLuciernagaGigante() {
  document.getElementById("luciernagaGigante").style.display = "inherit";
  document.getElementById("contadorGiganteContainer").style.display = "block";
  document.getElementById("tiempo").style.display = "block";
  // Desaparecen las luciérnagas cuando aparece la Polilla
  document.querySelectorAll(".aparecer").forEach((el) => {
    el.style.display = "none";
    el.style.animationPlayState = "pause";
  });
}

// Atrapa la polilla
function atraparLuciernagaGigante(event) {
  clicksGigante--; // Contador de polilla resta 1 cuando se le hace click
  const sonidoPolilla = new Audio('sound/polilla.m4a');
  if (isPlaying) sonidoPolilla.play();
  document.getElementById("contadorGigante").textContent = clicksGigante; // Actualiza el contador de clics gigante
  
  // Ya hizo los clicks necesarios desaparece la polilla
  if (clicksGigante == 0) {
    //espera 2ms para desaparecer 
    setTimeout ( () =>
    {
      const queBrillo = "brillosPolilla"; 
      MostrarBrillos (event, queBrillo);
      const atrapaPolilla = new Audio('sound/atrapaPolilla.mp3');
      if (isPlaying) atrapaPolilla.play();
      document.getElementById("luciernagaGigante").style.display = "none";
      document.getElementById("contadorGiganteContainer").style.display = "none";
      document.getElementById("salvados").style.display = "block";
      document.getElementById("tiempo").style.display = "none";
      setTimeout(liberarLuciernagas, 7000);}, 200);
  }
}
// Libera las luciérnagas del frasco, reincia todo. 
function liberarLuciernagas() {
  const sonido = new Audio('sound/soltar.mp3');

  if (contador !== 0 && isPlaying) sonido.play();

  document.querySelectorAll(".aparecer").forEach((el) => {
    el.style.display = "block";
    el.style.animationPlayState = "running";
  });

  // Contadores vuelven a 0, todo se vuelve al incio. 
  document.getElementById("frasco").innerHTML = "";
  document.getElementById("contador").textContent = "0";
  contador = 0;
  clicksGigante = 15;
  document.getElementById("luciernagaGigante").style.display = "none";
  document.getElementById("contadorGiganteContainer").style.display = "none";
  document.getElementById("salvados").style.display = "none";
  document.getElementById("contadorGigante").textContent = '15';
  document.getElementById("tiempo").style.display = "none";
  document.getElementById("reinicio").style.display = "none";
}

function MostrarBrillos (event, queBrillo){ 
  const sparkleContainer = document.getElementById("brillosContainer");
  for (let i = 0; i < 5; i++) {  // Generar 5 chispas por clic
    const sparkle = document.createElement("div");
    sparkle.classList.add(queBrillo);

    // Donde se hace click
    sparkle.style.left = `${event.pageX + (Math.random() - 0.5) * 20}px`;
    sparkle.style.top = `${event.pageY + (Math.random() - 0.5) * 20}px`;

    // Agrega los brillos al contenedor
    sparkleContainer.appendChild(sparkle);

    // Elimino los brillos después de la animación
    sparkle.addEventListener("animationend", function() {
      sparkleContainer.removeChild(sparkle);
    });
  }

}
// Sin intreacción llama a la polilla. 
let inactividadTimer;

const tiempoInactividad = 35000; // 35 segundos

// Inactividad
function manejarInactividad() {
  document.getElementById("tiempo").style.display = "block";
  document.querySelectorAll(".aparecer").forEach((el) => {
    el.style.display = "none";
    el.style.animationPlayState = "pause";
  });
  mostrarLuciernagaGigante();
}

// Función para reiniciar el temporizador de inactividad
function reiniciarInactividad() {
  clearTimeout(inactividadTimer); // Resetea el temporizador actual
  inactividadTimer = setTimeout(manejarInactividad, tiempoInactividad); // Inicia un nuevo temporizador
}

// Eventos que indican actividad del usuario
['mousemove', 'click', 'keypress', 'touchstart', 'scroll'].forEach(evento => {
  window.addEventListener(evento, reiniciarInactividad);
});

// Inicia el temporizador la primera vez
reiniciarInactividad();


