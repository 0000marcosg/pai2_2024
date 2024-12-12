
const customCursor = document.getElementById("custom-cursor");

document.addEventListener("mousemove", (event) => {
const mouseX = event.clientX;
const mouseY = event.clientY;

customCursor.style.left = `${mouseX}px`;
customCursor.style.top = `${mouseY}px`;
});
const ball = document.getElementById("ball");
        const hitSound = document.getElementById("hitSound");
        const moldSound = document.getElementById("moldSound");

        function hitBall() {
            hitSound.currentTime = 0;
            hitSound.play().catch(error => console.error("Error al reproducir el sonido de golpe:", error));
            ball.style.transform = "scale(1.2, 0.8)";
            setTimeout(() => {
                ball.style.transform = "scale(1, 1)";
            }, 200);
        }

        function generateRandomPoints(numPoints = 1) {
            for (let i = 0; i < numPoints; i++) {
                const point = document.createElement("div");
                point.classList.add("point");

                const side = Math.floor(Math.random() * 4);
                let x, y;

                switch (side) {
                    case 0:
                        x = Math.random() * window.innerWidth;
                        y = 0;
                        break;
                    case 1:
                        x = window.innerWidth - 80;
                        y = Math.random() * window.innerHeight;
                        break;
                    case 2:
                        x = Math.random() * window.innerWidth;
                        y = window.innerHeight - 80;
                        break;
                    case 3:
                        x = 0;
                        y = Math.random() * window.innerHeight;
                        break;
                }

                point.style.left = `${x}px`;
                point.style.top = `${y}px`;
                point.isMoving = true;
                document.body.appendChild(point);

                point.addEventListener("click", () => {
                    hitSound.currentTime = 0;
                    hitSound.play().catch(error => console.error("Error al reproducir el sonido de golpe:", error));
                    
                    point.isMoving = false;
                    point.style.backgroundImage = "url('img/cucararachaMuerta.png')";

                    setTimeout(() => {
                        point.remove();
                    }, 2000);
                });

                movePointLikeCockroach(point);
            }
        }

        function movePointLikeCockroach(point) {
            let speed = Math.random() * 0.5 + 0.5;
            let angle = Math.random() * 2 * Math.PI;
            let x = parseFloat(point.style.left);
            let y = parseFloat(point.style.top);

            function updatePosition() {
                if (!point.isMoving) return;

                angle += (Math.random() - 0.5) * 0.2;
                x += Math.cos(angle) * speed;
                y += Math.sin(angle) * speed;

                x = Math.max(0, Math.min(window.innerWidth - 80, x));
                y = Math.max(0, Math.min(window.innerHeight - 80, y));

                point.style.left = `${x}px`;
                point.style.top = `${y}px`;

                const rotationAngle = (angle * 180) / Math.PI;
                point.style.transform = `rotate(${rotationAngle}deg)`;

                checkCollisionWithBall(point);
                requestAnimationFrame(updatePosition);
            }

            updatePosition();
        }

        function checkCollisionWithBall(point) {
            const ballRect = ball.getBoundingClientRect();
            const pointRect = point.getBoundingClientRect();

            if (
                ballRect.left < pointRect.right &&
                ballRect.right > pointRect.left &&
                ballRect.top < pointRect.bottom &&
                ballRect.bottom > pointRect.top
            ) {
                Swal.fire({
                    imageUrl: "img/cucarachag.jpg",
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: "Custom image",
                    timer: 3200,
                    showConfirmButton: false,
                    showCancelButton: false,
                    timerProgressBar: true,
                });

                point.remove();

                setTimeout(() => {
                    window.location.reload();
                }, 3200);
            }
        }

        window.onload = () => {
            setTimeout(() => {
                setInterval(() => {
                    generateRandomPoints(1);
                }, 1000);
            }, 5000);
        };
        function startMolding(event) {
        isDragging = true;
        moldSound.currentTime = 0;
        if (moldSound.paused) {
            moldSound.play();
        }
        event.preventDefault();
    }
    
    function stopMolding() {
        isDragging = false;
        moldSound.pause();
        ball.style.transform = "scale(1, 1)";
    }
    function moldBall(event) {
        if (isDragging) {
            const mouseX = event.clientX || event.touches[0].clientX;
            const mouseY = event.clientY || event.touches[0].clientY;
            const rect = ball.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const offsetX = (mouseX - centerX) / 100;
            const offsetY = (mouseY - centerY) / 100;

            ball.style.transform = `scale(${1 + offsetX}, ${1 - offsetY})`;
        }
    }

        ball.addEventListener("click", hitBall);
    ball.addEventListener("mousedown", startMolding);
    ball.addEventListener("mouseup", stopMolding);
    ball.addEventListener("mousemove", moldBall);

    ball.addEventListener("touchstart", startMolding);
    ball.addEventListener("touchend", stopMolding);
    ball.addEventListener("touchmove", moldBall);