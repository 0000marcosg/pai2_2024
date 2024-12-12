const colorDisplay = document.getElementById('colorDisplay');
const colorOptions = document.getElementById('colorOptions');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

let numSquares = 2; 
let level = 1; 
const maxSquares = 9; 

const baseColors = ['green', 'blue', 'yellow', 'purple', 'orange', 'red', 'cyan']; 

function getRandomColor(baseHue) {
    const variations = new Set();
    while (variations.size < numSquares) {
        const lightness = Math.floor(Math.random() * 30 + 50); 
        const saturation = Math.floor(Math.random() * 20 + 60); 
        const color = `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
        variations.add(color);
    }
    return Array.from(variations);
}

function generateColors() {
    colorOptions.innerHTML = ''; 

    const randomBaseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
    const baseHue = getHue(randomBaseColor);
    const correctColor = `hsl(${baseHue}, 80%, 50%)`;
    const variations = getRandomColor(baseHue);

    const correctIndex = Math.floor(Math.random() * numSquares); 
    variations[correctIndex] = correctColor;

    colorDisplay.style.backgroundColor = correctColor; 

    variations.forEach((color, index) => {
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('color-option');
        colorDiv.style.backgroundColor = color;

        const angle = (index * 360) / numSquares;
        const radius = Math.min(window.innerWidth, window.innerHeight) / 3.1;

        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        colorDiv.style.transform = `translate(${x}px, ${y}px)`;
        colorDiv.addEventListener('click', () => handleColorClick(colorDiv, color, correctColor));

        colorOptions.appendChild(colorDiv);
    });
}

function getHue(color) {
    switch (color) {
        case 'green': return 120;
        case 'blue': return 240;
        case 'yellow': return 60;
        case 'purple': return 270;
        case 'orange': return 30;
        case 'red': return 0;
        case 'cyan': return 180;
        default: return 0;
    }
}

function handleColorClick(selectedDiv, selectedColor, correctColor) {
    if (selectedColor === correctColor) {
        correctSound.pause();
        correctSound.currentTime = 0;
        correctSound.play();

        level++;
        if (colorOptions.classList.contains('clockwise')) {
            colorOptions.classList.remove('clockwise');
            colorOptions.classList.add('counterclockwise');
        } else {
            colorOptions.classList.remove('counterclockwise');
            colorOptions.classList.add('clockwise');
        }

        if (level % 5 === 0 && numSquares < maxSquares) {
            numSquares = Math.min(numSquares + 2, maxSquares);
        }
        generateColors();
    } else {
        wrongSound.pause();
        wrongSound.currentTime = 0;
        wrongSound.play();

        selectedDiv.classList.add('incorrect');
        setTimeout(() => {
            selectedDiv.classList.remove('incorrect');
        }, 1000);
    }
}

generateColors();
