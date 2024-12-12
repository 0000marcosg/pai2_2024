const pantallaInicio = document.getElementById("pantalla-inicio")
const contenedorLetras = document.getElementById("contenedor-letras")
const contenedorLetrasInicio = document.getElementById("contenedor-letras-inicio")
const contador = document.getElementById("contador")

let puntuacion = 0
const puntuacionMaxima = 100
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const tiempoVisible = 900
let intervaloJuego

// Configurar la pantalla de inicio
function configurarPantallaInicio() {
  contenedorLetrasInicio
    .querySelector(".letra-segura")
    .addEventListener("click", comenzarJuego)
}

// Comenzar el juego
function comenzarJuego() {
  pantallaInicio.style.display = "none" // Ocultar la pantalla de inicio
  contenedorLetras.style.display = "block" // Mostrar el contenedor del juego
  puntuacion = 0

  // Iniciar la generación de letras
  intervaloJuego = setInterval(crearLetra, 1000)
}

// Crear letras en el juego
function crearLetra() {
  const letra = document.createElement("div")
  letra.classList.add("letra")
  letra.textContent = letras.charAt(Math.floor(Math.random() * letras.length)) 

  const esSegura = Math.random() > 0.5 // Determinar si es segura o peligrosa
  if (esSegura) {
    letra.classList.add("letra-segura")
    letra.addEventListener("click", () => {
      letra.remove()
      puntuacion++
      verificarPuntuacion()
      contador.textContent = `Salvadas: ${puntuacion}`
    })
  } else {
    letra.classList.add("letra-peligrosa")
    letra.addEventListener("click", reiniciarJuego) // Reinicia si se hace clic en una peligrosa
  }

  // Calcular posición aleatoria dentro del contenedor
  const anchoPantalla = contenedorLetras.offsetWidth
  const altoPantalla = contenedorLetras.offsetHeight
  const posX = Math.random() * (anchoPantalla - 50)
  const posY = Math.random() * (altoPantalla - 50)

  letra.style.left = `${posX}px`
  letra.style.top = `${posY}px`

  // Agregar letra al contenedor
  contenedorLetras.appendChild(letra)

  // Remover la letra automáticamente después de un tiempo
  setTimeout(() => {
    letra.remove()
  }, tiempoVisible)
}

// Verificar si se alcanzó la puntuación máxima
function verificarPuntuacion() {
  if (puntuacion >= puntuacionMaxima) {
    alert("¡Has salvado Comic Sans!")
    reiniciarJuego()
  }
}

// Reiniciar el juego
function reiniciarJuego() {
  clearInterval(intervaloJuego)
  puntuacion = 0;
  contenedorLetras.innerHTML = ""
  contenedorLetras.style.display = "none"
  pantallaInicio.style.display = "flex"
  contador.textContent = `Salvadas: ${puntuacion}`
}

// Configurar la pantalla de inicio al cargar
configurarPantallaInicio()
