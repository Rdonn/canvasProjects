class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.deltaX = 4;
        this.deltaY = 0.02;
        this.xAccelerate = 0.002;
        this.yAccelerate = 0.01;
        this.radius = 50;
    }

    drawThis(context) {
        context.beginPath();
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.stroke();

    }

    accel() {
        if (this.deltaX > 0) {
            this.deltaX -= this.xAccelerate;
        }

        this.deltaY += this.yAccelerate;
    }

    move() {
        this.checkDirection()
        this.accel();
        this.x += this.deltaX;
        if (this.y + this.radius < canvas.width)
            this.y += this.deltaY;
    }
    checkDirection() {
        if (this.x - radius <= 0) {
            this.deltaX *= -(10 / 11);

        }
        if (this.y - radius <= 0) {

            this.deltaY *= -1;
        }
        if (this.x + radius >= canvas.width) {

            this.deltaX *= -1;
        }
        if (this.y + radius >= canvas.height) {
            this.y = (canvas.height - radius);
            this.deltaY *= -(7 / 8)
            console.log(this.deltaX);

        }
    }
}



var canvas = document.getElementById('gravity');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var radius = 50;
var ball = new Ball((radius + 1), (radius + 1));

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function renderBall() {
    clearCanvas()
    ball.drawThis(context);
    ball.move();
    setTimeout('renderBall()', 0.1);

    function newFunction() {
        clearCanvas();
    }
}

document.getElementById('gravity').addEventListener('mousedown', function (e) {
    ball.deltaX += 0.1;
    ball.deltaY += 0.1;
})