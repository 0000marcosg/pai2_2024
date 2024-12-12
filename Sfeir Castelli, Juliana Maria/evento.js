document.addEventListener("DOMContentLoaded", () => {
  const auto = document.getElementById("auto");
  const mensaje = document.getElementById("mensaje");
  const frase = document.getElementById("frase");
  const bolaDisco = document.getElementById("bola-disco");
  const destellosContainer = document.getElementById("destellos");
  const desplazamiento = 75;
  const partyAudio = new Audio("audio/party.mp3"); 
  let posicionX = 0;
  let contadorClicks = 0;
  let timeout;

  /*IMAGENES Y SONIDOS*/
  const imagenesDeFondo = [
    "img/arboles.png",
    "img/ciudad.png",
    "img/hollywood.png",
    "img/campo.png",
    "img/hospital.png",
  ];
  const imagenesDeAuto = [
    "img/auto.png",
    "img/taxi.png",
    "img/limo.png",
    "img/tanque.png",
    "img/ambulancia.png",
  ];
  const sonidosBocina = [
    "audio/bocinaauto.mp3",
    "audio/lacucaracha.mp3",
    "audio/gta.mp3",
    "audio/tiros.mp3",
    "audio/ambulancia.mp3",
  ];
  const imagenesDeFrases = [
    "img/frase1.png",
    "img/frase2.png",
    "img/frase3.png",
    "img/frase4.png",
    "img/frase5.png",
    "img/frase6.png",
  ];

  let indiceImagen = 0;
  let indiceFrase = 0;
  const bocina = new Audio(sonidosBocina[indiceImagen]);

 /*REINICIOS DEL JUEGO*/
  function resetGame() {
    posicionX = 0;
    contadorClicks = 0;
    indiceImagen = 0;
    indiceFrase = 0;
    auto.style.left = posicionX + "px";
    document.getElementById("contador").textContent = "Clicks: " + contadorClicks;
    document.body.style.backgroundImage = `url(${imagenesDeFondo[indiceImagen]})`;
    auto.src = imagenesDeAuto[indiceImagen];
    bocina.src = sonidosBocina[indiceImagen];
    mensaje.style.display = "none";
    bolaDisco.style.display = "none";
    destellosContainer.style.display = "none";
    frase.style.display = "none";
    partyAudio.pause();
    partyAudio.currentTime = 0;
  }

  /*REINICIO CONTADOR INAC.*/
  function startTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      mensaje.style.display = "block";
      setTimeout(resetGame, 2000);
    }, 5000);
  }

  /*FRASE C/50CLICKS*/
  function mostrarFrase() {
    const fraseIndex = Math.floor((contadorClicks / 50) % 6); 
    frase.src = imagenesDeFrases[fraseIndex];
    frase.style.display = "block";
  
    setTimeout(() => {
      frase.style.display = "none";
    }, 3000); 
  }
  
/*DESTELLOS*/
  function crearDestellos() {
    destellosContainer.innerHTML = "";
    const colores = ["blue", "yellow", "red", "darkgreen"];
    for (let i = 0; i < 50; i++) {
      const destello = document.createElement("div");
      destello.className = "destello";
      destello.style.left = `${Math.random() * 100}%`;
      destello.style.top = `${Math.random() * 100}%`;
      destello.style.backgroundColor =
        colores[Math.floor(Math.random() * colores.length)];
      destellosContainer.appendChild(destello);
    }
  }

  /*EFECTOS*/
  function mostrarEfectos() {
    crearDestellos();
    destellosContainer.style.display = "block";
    bolaDisco.style.display = "block";

    bocina.pause();
    partyAudio.play();

    setTimeout(() => {
      destellosContainer.style.display = "none";
      bolaDisco.style.display = "none";
      partyAudio.pause();
      partyAudio.currentTime = 0;
      bocina.play();
    }, 5000); 
  }

  /*CLICKS*/
  document.addEventListener("click", () => {
    startTimeout();
    contadorClicks++;
    document.getElementById("contador").textContent = "Clicks: " + contadorClicks;
    posicionX += desplazamiento;

    const anchoVentana = window.innerWidth;
    const bordeDerecho = anchoVentana - auto.offsetWidth;

    bocina.play();

    if (posicionX >= bordeDerecho) {
      posicionX = 0;
      indiceImagen = (indiceImagen + 1) % imagenesDeFondo.length;
      document.body.style.backgroundImage = `url(${imagenesDeFondo[indiceImagen]})`;
      auto.src = imagenesDeAuto[indiceImagen];
      bocina.src = sonidosBocina[indiceImagen];
    }

    if (contadorClicks % 50 === 0) {
      mostrarFrase(); 
    }

    if (contadorClicks % 370 === 0) {
      mostrarEfectos(); 
    }

    auto.style.left = posicionX + "px";
  });

  startTimeout();
});
