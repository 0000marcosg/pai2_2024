document.addEventListener("DOMContentLoaded", () => {
    function ajustarFondo() {
      document.body.style.backgroundSize = `${window.innerWidth}px ${window.innerHeight}px`;
    }
    // Ajusta el fondo al cargar y al cambiar el tamaño de la ventana
    ajustarFondo();
    window.addEventListener("resize", ajustarFondo);
  });
document.addEventListener("DOMContentLoaded", function() { 
    const mouse = document.querySelector('.mouse');
    const cat = document.querySelector('.cat');
    const backgrounds = [
        'img/paris.jpg',  // Fondo inicial
        'img/fondo1.jpg',    // Segunda imagen
        'img/parque.jpg', // Tercera imagen
        'img/alcantarilla.jpg'     // Cuarta imagen
    ];
    
    let currentBackgroundIndex = 0; // Índice para llevar el control de las imágenes
    let catX = 100;  // Posición inicial del gato
    let catY = 100;  // Posición inicial del gato
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let enColision = false;  // Variable de estado para detectar colisiones previas
    
    // Detecta si el gato y el ratón se tocan
    function detectarColision() {
        const catRect = cat.getBoundingClientRect();
        const mouseRect = mouse.getBoundingClientRect();
        return !(
            catRect.right < mouseRect.left ||
            catRect.left > mouseRect.right ||
            catRect.bottom < mouseRect.top ||
            catRect.top > mouseRect.bottom
        );
    }

    // Cambiar el fondo de forma suave
    function cambiarFondo() {
        currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length; // Cambia la imagen cíclicamente
        document.body.style.backgroundImage = `url(${backgrounds[currentBackgroundIndex]})`; // Actualiza el fondo
    }

    // Mueve el gato hacia el ratón
    function moverCat() {
        catX += (mouseX - catX) * 0.1; 
        catY += (mouseY - catY) * 0.1;

        cat.style.left = catX + 'px';
        cat.style.top = catY + 'px';

        // Calcular la dirección hacia el ratón
        const deltaX = mouseX - catX;
        const deltaY = mouseY - catY;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convertir a grados
       
        // Determina si el ratón está a la izquierda o derecha del gato
    const mirror = deltaX < 0 ? -1 : 1;  // Si el ratón está a la izquierda, espejamos el gato

    // Rotar el gato hacia la dirección del ratón y aplicar el espejo si es necesario
    cat.style.transform = `translate(-50%, -50%) rotateY(${40}deg) scaleX(${mirror})`; 


        // Si el gato y el ratón se tocan, cambia el fondo solo una vez por colisión
        if (detectarColision()) {
            if (!enColision) {  // Cambia el fondo solo si no había colisión previa
                cambiarFondo();
                enColision = true;  // Marca que ya ocurrió una colisión
            }
        } else {
            enColision = false;  // Si no hay colisión, restablece la bandera
        }

        requestAnimationFrame(moverCat); // Continuar moviendo el gato
    }

    // Actualiza la posición del ratón
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouse.style.left = mouseX + 'px';
        mouse.style.top = mouseY + 'px';
    });

    moverCat(); // Inicia el movimiento del gato
});

