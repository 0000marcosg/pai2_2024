document.addEventListener('DOMContentLoaded', function () {
    // mueble
    const mueble = document.querySelector('.mueble');
    // fondos
    const backgrounds = ['img/blanco.png', 'img/ropero.png', 'img/ropero_gotico.png', 'img/ropero_colgar.png', 'img/tetris.png'];
    let currentIndex = 1;

    // cambiar el fondo en orden
    function changeBackground() {
        mueble.style.backgroundImage = `url(${backgrounds[currentIndex]})`;
        currentIndex++;
        if (currentIndex >= backgrounds.length) {
            currentIndex = 0;
        }
    }

        // añadir el evento de cambio de fondo al botón
        const button = document.querySelector('button');
        button.addEventListener('click', changeBackground);

    // seleccionar el audio y el botón de muteo
    const audio = document.getElementById('backgroundMusic');
    const muteButton = document.getElementById('muteButton');
    const muteIcon = muteButton.querySelector('img'); // imagen dentro del botón de muteo
    let isAudioPlaying = false; // variable para controlar si la música está sonando

    //el navegador no permite autoplay, asi que hacemos que el usuario mutee y desmutee para arrancarla

    audio.volume = 0.3;

    // muteo
    muteButton.addEventListener('click', function () {
        if (!isAudioPlaying) {
            audio.play().catch(e => {
                console.log("Error al reproducir la música:", e);
            });
            isAudioPlaying = true;
        }
        audio.muted = !audio.muted;
        muteIcon.src = audio.muted ? 'img/mute.png' : 'img/volume.png';
    });

    document.addEventListener('DOMContentLoaded', function () {
        // seleccionar todos los audios dentro de .items
        const itemAudios = document.querySelectorAll('.items audio');
    
        // recorrer cada audio
        itemAudios.forEach(audio => {
            // verificar si el elemento no está dentro de .item1
            if (!audio.closest('#item01')) {
                audio.volume = 0.01; 
            }
        });
    });
    

    // arrastrar los items
    const items = document.querySelectorAll('.items > div');
    let draggedItem = null;
    let offsetX, offsetY;

    function startDrag(event, item) {
        event.preventDefault();
        draggedItem = item;

        const posX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
        const posY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;

        offsetX = posX - item.getBoundingClientRect().left;
        offsetY = posY - item.getBoundingClientRect().top;

        draggedItem.style.position = 'fixed';
        draggedItem.style.zIndex = '1000';
        draggedItem.style.left = `${posX - offsetX}px`;
        draggedItem.style.top = `${posY - offsetY}px`;

        function onMove(e) {
            const moveX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            const moveY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

            draggedItem.style.left = `${moveX - offsetX}px`;
            draggedItem.style.top = `${moveY - offsetY}px`;
        }

        function onEnd(e) {
            const endX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
            const endY = e.type === 'mouseup' ? e.clientY : e.changedTouches[0].clientY;

            const muebleRect = mueble.getBoundingClientRect();
            if (endX >= muebleRect.left && endX <= muebleRect.right && 
                endY >= muebleRect.top && endY <= muebleRect.bottom) {
                draggedItem.style.position = 'absolute';
                draggedItem.style.left = `${endX - muebleRect.left - offsetX}px`;
                draggedItem.style.top = `${endY - muebleRect.top - offsetY}px`;
                mueble.appendChild(draggedItem);

                // Reproducir el audio asociado al objeto
                const audio = draggedItem.querySelector('audio');
                if (audio) {
                    audio.currentTime = 0; // Reiniciar el audio
                    audio.play();
                }
            } else {
                draggedItem.style.position = 'fixed';
                draggedItem.style.left = `${endX}px`;
                draggedItem.style.top = `${endY}px`;
            }

            draggedItem.style.zIndex = '1';
            draggedItem = null;
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('mouseup', onEnd);
            document.removeEventListener('touchend', onEnd);
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('touchmove', onMove);
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchend', onEnd);
    }

    items.forEach(item => {
        item.addEventListener('mousedown', (event) => startDrag(event, item));
        item.addEventListener('touchstart', (event) => {
            event.preventDefault();
            startDrag(event, item);
        });
    });
});
