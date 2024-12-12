let contador = 0;

function changeImage() {
    var image = document.getElementById('myImage');

    if (image.src.includes("flor1.png")) {
        image.src = "img/flor2.png";
    } else if (image.src.includes("flor2.png")) {
        image.src = "img/flor3.png";
    } else if (image.src.includes("flor3.png")) {
        image.src = "img/flor4.png";
    } else if (image.src.includes("flor4.png")) {
        image.src = "img/flor5.png";
    } else if (image.src.includes("flor5.png")) {
        image.src = "img/flor6.png";
    } else if (image.src.includes("flor6.png")) {
        image.src = "img/flor6.png";
        addNewRandomImage();
        image.src = "img/flor1.png";
    }
}

function addNewRandomImage() {
    contador++; 

   
    const contadorDisplay = document.getElementById('contadorDisplay');
    contadorDisplay.textContent = "Contador: " + contador;

    var newImage = document.createElement('img');
    newImage.src = "img/flor6.png";
    newImage.style.position = 'absolute';
    newImage.style.width = '100px';
    newImage.style.cursor = 'not-allowed';


    var maxX = window.innerWidth - 100;
    var maxY = window.innerHeight - 100;

    var randomX = Math.floor(Math.random() * maxX);
    var randomY = Math.floor(Math.random() * maxY);

    newImage.style.left = randomX + 'px';
    newImage.style.top = randomY + 'px';

    document.body.appendChild(newImage);
}


