const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


const aspectRatio = 16 / 9;

let ballRadius = 10;
let paddleWidth = 75;
let paddleHeight = 10;
let paddleX;
let x, y, dx, dy;
let score = 0;


const soundLeft = new Audio('media/bombo.wav');
const soundRight = new Audio('media/bombo.wav');
const soundTop = new Audio('media/caja.wav');
const soundPaddle = new Audio('media/barra.wav');  
const altSoundLeft = new Audio('media/Sonidos2.wav');
const altSoundRight = new Audio('media/Sonidos2 1.wav');
const altSoundTop = new Audio('media/Sonidos2 3.wav');
const altSoundPaddle = new Audio('media/Sonidos2 2.wav');

const sounds = {
    a: [new Audio('media/Bombo2.wav')],
    s: [new Audio('media/redoble1.wav'), new Audio('media/redoble3.wav')],
    d: [new Audio('media/caja.wav')],
    w: [new Audio('media/fondo1.wav')]
};

const altSounds = {
    a: [new Audio('media/Sonidos2-teclas.wav')],
    s: [new Audio('media/Sonidos3 1.wav'), new Audio('media/Sonidos3 2.wav'), new Audio('media/Sonidos3 3.wav')],
    d: [new Audio('media/Sonidos2-teclas 2.wav')],
    w: [new Audio('media/fondo2.wav')]
};

let useAltSounds = false;  
const soundCounters = { a: 0, s: 0, d: 0 };


const defaultColors = {
    background: "white",
    ball: "black",
    paddle: "black",
    score: "white"
};

const altColors = {
    background: "#222222",  
    ball: "#FF5733",  
    paddle: "#FF6F61", 
    score: "#FFFF00"  
};

let currentColors = defaultColors;  
document.addEventListener("keydown", function(event) {
    if (event.key === "c" || event.key === "C") {
        useAltSounds = !useAltSounds;
        currentColors = useAltSounds ? altColors : defaultColors;  
        console.log("Modo alternativo de sonidos y colores:", useAltSounds ? "Activado" : "Desactivado");
    }

    if (event.key === "a" || event.key === "A") {
        playSound(useAltSounds ? altSounds.a[0] : sounds.a[0]);
    }

    if (event.key === "s" || event.key === "S") {
        playSound(useAltSounds ? altSounds.s[soundCounters.s] : sounds.s[soundCounters.s]);
        soundCounters.s = (soundCounters.s + 1) % sounds.s.length;
    }

    if (event.key === "d" || event.key === "D") {
        playSound(useAltSounds ? altSounds.d[0] : sounds.d[0]);
    }

    if (event.key === "w" || event.key === "W") {
        playSound(useAltSounds ? altSounds.w[0] : sounds.w[0]);
    }
});

function playSound(sound) {
    sound.currentTime = 0;  
    sound.play();  
}


function resizeCanvas() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

   
    const canvasWidth = windowWidth * 0.80;  
    const canvasHeight = canvasWidth / aspectRatio;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

  
    paddleX = (canvas.width - paddleWidth) / 2;
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 6;
    dy = -6;

    scaleElements();
}

let scaleFactor = 1;

function scaleElements() {
  
    scaleFactor = 1;
    paddleWidth = 75 * scaleFactor;
    paddleHeight = 10 * scaleFactor;
    ballRadius = 10 * scaleFactor;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);


canvas.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
    let mouseX = e.clientX - canvas.getBoundingClientRect().left;

    
    if (mouseX > 0 && mouseX < canvas.width - paddleWidth) {
        paddleX = mouseX - paddleWidth / 2;
    } else if (mouseX <= 0) {
        paddleX = 0;
    } else if (mouseX >= canvas.width - paddleWidth) {
        paddleX = canvas.width - paddleWidth;
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = currentColors.ball;
    ctx.fill();
    ctx.closePath();
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = currentColors.paddle;
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = currentColors.score;
    ctx.textAlign = "left";
}


function checkCollisions() {
    
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        playSound(useAltSounds ? altSoundRight : soundRight);
    }

    if (y + dy < ballRadius) {
        dy = -dy;
        playSound(useAltSounds ? altSoundTop : soundTop);
    }

    
    if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth && y + dy > canvas.height - paddleHeight) {
            dy = -dy;
            playSound(useAltSounds ? altSoundPaddle : soundPaddle);
        }
    }

    
    if (y + dy > canvas.height) {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 5;
        dy = -5;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = currentColors.background;  
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();

    checkCollisions();

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}


draw();

function drawKeys() {
    const keys = ["A", "C", "D", "S", "W"]; 
    const fontSize = 20; 
    const spacing = 40;  

    ctx.font = fontSize + "px Arial";
    ctx.fillStyle = "gray"; 

   
    const totalWidth = keys.length * fontSize + (keys.length - 1) * spacing;
    let startX = (canvas.width - totalWidth) / 2; 

    
    keys.forEach((key, index) => {
        ctx.fillText(key, startX + index * (fontSize + spacing), canvas.height / 2);
    });
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = currentColors.background; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawKeys();  

    checkCollisions();

   
    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}
