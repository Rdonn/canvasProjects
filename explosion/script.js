class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.radiusDelta = 0;
        this.deltaX = (Math.random() * 5) * [-1, 1][Math.floor(Math.random() * 10) % 2];
        this.deltaY = (Math.random() * 5) * [-1, 1][Math.floor(Math.random() * 10) % 2];
        this.color = ['blue', 'red', 'purple'];
        this.colorCounter = Math.floor(Math.random() * 3);
    }
    move() {
        if (this.radius < 40)
            this.radius += this.radiusDelta;
        this.x += this.deltaX;
        this.y += this.deltaY;

    }
    incrementCounter() {
        this.colorCounter++;
        this.colorCounter %= this.color.length;
    }
    getColor() {
        return this.color[this.colorCounter];

    }
    checkBounce(bTop, bBottom, bLeft, bRight) {
        var left = this.x - this.radius;
        var right = this.x + this.radius;
        var bottom = this.y + this.radius;
        var top = this.y - this.radius;

        if (left <= bLeft) {
            this.deltaX *= -1;
            this.incrementCounter()
        }
        if (right >= bRight) {
            this.deltaX *= -1;
            this.incrementCounter()
        }
        if (bottom >= bBottom) {
            this.deltaY *= -1;
            this.incrementCounter()
        }
        if (top <= bTop) {
            this.deltaY *= -1;
            this.incrementCounter()
        }

    }
}

var canvas = document.getElementById('gravity');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var angle = Math.PI * 2;
var numToBurst = 250;
var circles = [];

function checkBoundsForDelete(x, y) {
    var deleted = false
    circles = circles.filter(function (element, index) {
        var top = element.y - element.radius + element.radius / 10;
        var bottom = element.y + element.radius - element.radius / 10;
        var right = element.x + element.radius - element.radius / 10;
        var left = element.x - element.radius + element.radius / 10;

        if (y > top && y < bottom) {
            if (x < right && x > left) {
                deleted = true;
                return;
            }
        }
        return element;
    })
    return deleted;
}



function renderCircle(obj) {
    c.fillStyle = obj.getColor();
    c.beginPath();
    c.arc(obj.x, obj.y, obj.radius, 0, angle);
    c.fill();
    c.stroke();
}
canvas.addEventListener('mousedown', function (e) {
    if (circles.length > 20000) {
        circles.splice(0, numToBurst);
    }
    if (checkBoundsForDelete(e.clientX, e.clientY)) {
        return
    } else {
        for (var i = 0; i < numToBurst; i++) {
            circles.push(new Circle(e.clientX, e.clientY));
        }
    }

})

function beginCanvasAni() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circles.length; i++) {
        var temp = circles[i];
        temp.move();
        temp.checkBounce(0, canvas.height, 0, canvas.width);
        renderCircle(temp);
    }
    setTimeout('beginCanvasAni()', 1);
}