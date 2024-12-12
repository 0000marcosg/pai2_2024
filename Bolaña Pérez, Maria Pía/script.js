const burbujaContainer = document.querySelector('.burbuja-container');
const popSound = new Audio('audio/pop.mp3');  
let contadorBurbujas = 0; 
const contadorDisplay = document.getElementById('contador'); 

// Creacion de  burbuja
function createburbuja() {
    const burbuja = document.createElement('div');
    burbuja.classList.add('burbuja');

    const imagenesBurbujas = [
        'imagenes/burbuja1.png',
        'imagenes/burbuja2.png',
        'imagenes/burbuja3.png',
        'imagenes/burbuja4.png',
        'imagenes/burbuja5.png'
    ];

    const imagenAleatoria = imagenesBurbujas[Math.floor(Math.random() * imagenesBurbujas.length)];
    burbuja.style.backgroundImage = `url(${imagenAleatoria})`;
    burbuja.style.backgroundSize = 'cover';

    // Tamaño de las burbujas 
    const screenWidth = window.innerWidth;
    const size = screenWidth < 768 ? Math.random() * 90 + 100 : Math.random() * 100 + 120;
    burbuja.style.width = `${size}px`;
    burbuja.style.height = `${size}px`;
    burbuja.style.left = `${Math.random() * 100}vw`;
    
    // Ajuste de burbujas a la pantallas
    const maxLeft = window.innerWidth - size; 
    burbuja.style.left = `${Math.random() * maxLeft}px`;
    
    // Velocidad
    const floatSpeed = Math.random() * 3 + 2; 
    burbuja.style.animation = `float ${floatSpeed}s linear infinite`;

    // Explosión al hacer clic
    burbuja.addEventListener('click', () => {
        popSound.currentTime = 0; 
        popSound.play(); 

        // Contador
        contadorBurbujas++;
        contadorDisplay.textContent = contadorBurbujas;

        setTimeout(() => burbuja.remove(), 50);
    });

    burbujaContainer.appendChild(burbuja);
}

// Cantidad de burbujas 
setInterval(createburbuja, 900);