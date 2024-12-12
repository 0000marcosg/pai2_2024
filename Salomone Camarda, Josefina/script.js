// gatos y sus audios.
const cats = [
    { id: 'cat1', audioId: 'audio1', clickedImage: 'img/gato1-clicked.jpeg', originalImage: 'img/gato1.jpeg' },
    { id: 'cat2', audioId: 'audio2', clickedImage: 'img/gato2-clicked.jpeg', originalImage: 'img/gato2.jpeg' },
    { id: 'cat3', audioId: 'audio3', clickedImage: 'img/gato3-clicked.jpeg', originalImage: 'img/gato3.jpeg' },
    { id: 'cat4', audioId: 'audio4', clickedImage: 'img/gato4-clicked.jpeg', originalImage: 'img/gato4.jpeg' }
];

// click en gatos
cats.forEach(cat => {
    const catElement = document.getElementById(cat.id);
    const audioElement = document.getElementById(cat.audioId);

    catElement.addEventListener('click', () => {
        if (audioElement.paused) {
            audioElement.play();
            catElement.style.backgroundImage = `url('${cat.clickedImage}')`;
            catElement.classList.add('tilt-shaking');
        } else {
            audioElement.pause();
            audioElement.currentTime = 0;
            catElement.style.backgroundImage = `url('${cat.originalImage}')`;
            catElement.classList.remove('tilt-shaking');
        }
    });
});
