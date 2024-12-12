
function changeImage(image) {
    // sonido
    const sound = new Audio('sonido/squishwet.mp3'); 

    // Cambiar la imagen a 'aplastado.png' y reproducir el sonido
    if (image.src.includes("tomate.png")) {
        image.src = "img/aplastadoo.png"; 
        sound.play(); 

    // Durante 10 segundos, la imagen se queda quieta y después vuelve a 'tomate.jpg'
        setTimeout(function() {
            image.src = "img/tomate.png"; 
        }, 10000); 
    }

    if (image.src.includes("aplastadoo.png")) {
        let aplastado = image.parentElement.id;
        document.getElementById(aplastado).style.animationPlayState = "paused";

        setTimeout(function() {
            document.getElementById(aplastado).style.animationPlayState = "running";
        }, 10000); 
    }

    // Se elimina la sombra de los tomates después de que se hace click en uno por primera vez
    let allTomatoes = document.querySelectorAll('.tomates');
    allTomatoes.forEach(function(tomato) {
        tomato.classList.remove('shadow-drop-2-center'); 
    });
}

