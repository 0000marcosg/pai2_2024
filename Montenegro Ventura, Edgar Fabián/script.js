const container = document.getElementById('cuadro');
const counterDisplay = document.getElementById('contador');
const backgroundAudio = document.getElementById('background-audio');
const clickAudio = document.getElementById('mosquito-click-audio');
let score = 0;
let useFirstImage = true;

function iniciarJuego() {

    document.getElementById('iniciar-juego').style.display = 'none';
    backgroundAudio.play();

    // Primer mosquito
    createImage();
}

function createImage() {
    const img = document.createElement('img');
    img.src = useFirstImage ? 'imagen1.png' : 'imagen2.png';
    img.classList.add('mosquito-volando');
    container.appendChild(img);

    function moveImage() {
        if (!img.moving) return;

        const maxX = container.clientWidth - img.clientWidth;
        const maxY = container.clientHeight - img.clientHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        img.style.left = randomX + 'px';
        img.style.top = randomY + 'px';
    }

   
    img.moving = true;
    const moveInterval = setInterval(moveImage, 800);

    // Mosquito muerto
    img.addEventListener('click', () => {
        img.moving = false;
        clearInterval(moveInterval);

        // PUAJ
        clickAudio.currentTime = 0; 
        clickAudio.play();

        img.src = 'imagen2.png';
        img.removeEventListener('click', () => {}); 

        score++;
        counterDisplay.textContent = `${score}`;

        
        useFirstImage = true;
        createImage(); 
    });

    useFirstImage = !useFirstImage;
}

// Evento de boton de inicio
document.getElementById('iniciar-juego').addEventListener('click', iniciarJuego);
