let car = document.getElementById("car");
let obstacle = document.getElementById("obstacle");
let gameArea = document.getElementById("gameArea");
let scoreDisplay = document.getElementById("score");
let score = 0;
let gameInterval;
let obstacleSpeed = 5;

document.addEventListener("keydown", moveCar);

function moveCar(event) {
    let carPosition = car.offsetLeft;
    if (event.key === "ArrowLeft" && carPosition > 0) {
        car.style.left = carPosition - 15 + "px";
    } else if (event.key === "ArrowRight" && carPosition < gameArea.clientWidth - car.clientWidth) {
        car.style.left = carPosition + 15 + "px";
    }
}

function startGame() {
    obstacle.style.left = Math.random() * (gameArea.clientWidth - obstacle.clientWidth) + "px";
    obstacle.style.top = "-50px";
    gameInterval = setInterval(moveObstacle, obstacleSpeed);
}

function moveObstacle() {
    let obstaclePosition = obstacle.offsetTop;
    if (obstaclePosition < gameArea.clientHeight) {
        obstacle.style.top = obstaclePosition + obstacleSpeed + "px";
    } else {
        score++;
        scoreDisplay.innerText = "Pontuação: " + score;
        obstacle.style.top = "-50px";
        obstacle.style.left = Math.random() * (gameArea.clientWidth - obstacle.clientWidth) + "px";
    }

    checkCollision();
}

function checkCollision() {
    let carRect = car.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    if (
        carRect.x < obstacleRect.x + obstacleRect.width &&
        carRect.x + carRect.width > obstacleRect.x &&
        carRect.y < obstacleRect.y + obstacleRect.height &&
        carRect.y + carRect.height > obstacleRect.y
    ) {
        clearInterval(gameInterval);
        alert("Fim de jogo! Sua pontuação: " + score);
        document.location.reload();
    }
}

startGame();