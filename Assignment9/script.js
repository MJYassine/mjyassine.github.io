document.addEventListener("DOMContentLoaded", function() {
    const exercise1Btn = document.getElementById("exercise1Btn");
    const exercise2Btn = document.getElementById("exercise2Btn");
    const startStopBtn = document.getElementById("startStopBtn");
    const ball = document.getElementById("ball");
    const container = document.querySelector(".container");
    const positionContainers = document.querySelectorAll(".position-container");

    let intervalId;
    let movingDown = true;
    let ballPosition = 0;
    const speed = 5;

    function toggleAnimation() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            startStopBtn.textContent = "Start";
        } else {
            intervalId = setInterval(moveBall, 50);
            startStopBtn.textContent = "Stop";
        }
    }

    function moveBall() {
        if (movingDown) {
            ballPosition += speed;
            if (ballPosition >= container.clientHeight - ball.clientHeight) {
                movingDown = false;
            }
        } else {
            ballPosition -= speed;
            if (ballPosition <= 0) {
                movingDown = true;
            }
        }
        ball.style.top = ballPosition + "px";
    }

    exercise1Btn.addEventListener("click", function() {
        document.getElementById("exercise1").style.display = "block";
        document.getElementById("exercise2").style.display = "none";
    });

    exercise2Btn.addEventListener("click", function() {
        document.getElementById("exercise2").style.display = "block";
        document.getElementById("exercise1").style.display = "none";
    });

    startStopBtn.addEventListener("click", function(event) {
        event.preventDefault();
        toggleAnimation();
    });

    positionContainers.forEach(function(container) {
        container.addEventListener("click", function() {
            container.classList.toggle("clicked");
        });
    });
});
