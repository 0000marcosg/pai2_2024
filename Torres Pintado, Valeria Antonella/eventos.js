// Cambia pocision de circulos
function cambiarPosiciones() {
  setTimeout(() => {
      const container = document.getElementById("gridContainer");
      const items = Array.from(container.children);
      
      items.sort(() => Math.random() - 0.5);
      items.forEach(item => container.appendChild(item));


// Elimina el símbolo de verificación 
      const cambiarColorDiv = document.getElementById("cambiarColor");
      cambiarColorDiv.innerHTML = "";  // Elimina el contenido 
  }, 1500); 
}


// Dice que "no" al incorrecto (ondblclick)

function startShake(element) {
    element.classList.add('shake');

  setTimeout(() => {
      element.classList.remove('shake');
    }, 600); 
  }

 