var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d');
class Ball {
    constructor(x, y, radius, left, mass) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.mass = mass; //kg
        this.deltaX = Math.random() * 4 * left ? -1 : 1;
        this.deltaY = 0;
        this.color = 'red';
    }
    drawBall() {
        this.move();

        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        this.drawVector();
    }
    move() {
        this.x += this.deltaX;
        this.y += this.deltaY;
    }

    drawVector() {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.deltaX * 50, this.y);
        context.stroke();



    }
    detectCollision(otherBall) {
        if (distance(this, otherBall) < this.radius + otherBall.radius) {
            this.color = 'blue';
            clearInterval(timer);

        } else {
            this.color = 'red';
        }
    }

}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var pressed = false;
var ballOne;
var ballTwo;
var timer;
//utility math
function distance(ballOne, ballTwo) {
    return Math.sqrt(Math.pow(ballOne.x - ballTwo.x, 2) + Math.pow(ballTwo.y - ballOne.y, 2))

}

canvas.addEventListener('mousedown', function (e) {
    pressed = true;
});
canvas.addEventListener('mouseup', function (e) {
    pressed = false;
});
canvas.addEventListener('mousemove', function (e) {
    if (pressed) {

    }
});
canvas.addEventListener('mouseout', function (e) {
    pressed = false;
});

//rudimentary collision detection, but attempt at creating legitimate collision detection
onload = function () {
    ballOne = new Ball(0, canvas.height / 2 - 20, 50, false, 10);
    ballTwo = new Ball(canvas.width, canvas.height / 2 + 20, 50, true, 10);
    ballOne.drawBall();
    ballTwo.drawBall();
    timer = setInterval('beginLoop()', 1000 / 60);
}

function clearAll() {
    context.clearRect(0, 0, canvas.width, canvas.height);

}

function beginLoop() {
    clearAll();
    ballOne.drawBall();
    ballTwo.drawBall();
    ballOne.detectCollision(ballTwo);
    ballTwo.detectCollision(ballOne);
}