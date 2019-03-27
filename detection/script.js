class ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.numQuads = 6;
        this.quadWidth = canvas.width / this.numQuads;
        this.quadrant = [];
        this.setQuandrant();
        this.deltaX = Math.random() * 5 * [-1, 1][Math.floor(Math.random() * 3) % 2];
        this.deltaY = 0;
        this.color = ['red', 'blue'];
        this.mainColor = this.color[0];

    }

    drawVectors() {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + (this.deltaX * 50), this.y);
        context.stroke();
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x, this.y + (this.deltaY * 50));
        context.stroke();
        context.beginPath()
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + (this.deltaX * 50), this.y + (this.deltaY * 50));
        var top = (this.deltaY * -1);
        var bottom = this.deltaX;
        if (Math.abs(top) > 0.00001 && bottom != 0)
            document.getElementById('angle').innerText = Math.atan(top / bottom) * (180 / Math.PI);
        document.getElementById('deltaX').innerText = this.deltaX;
        document.getElementById('deltaY').innerText = this.deltaY;
        context.stroke();


    }
    checkBoundary() {
        if (this.y + this.radius >= canvas.height) {
            this.y = canvas.height - this.radius - 0.00001;
            this.deltaY *= 7 / 8;
            this.deltaY *= -1;
        }
        if (this.x + this.radius >= canvas.width) {
            this.deltaX *= -1;
            this.x = canvas.width - this.radius - 0.01;
        } else if (this.x - this.radius <= 0) {
            this.deltaX *= -1;
            this.x = 0 + this.radius + 0.01
        }
    }
    move() {
        this.deltaY += 9.8 / (1000);
        if (this.deltaX > 0 || this.deltaX < 0)
            this.deltaX += 0.001 * Math.floor(this.deltaX / Math.abs(this.deltaX)) * -1;
        this.x += this.deltaX;
        this.y += this.deltaY;
    }

    drawBall() {
        this.checkBoundary();
        context.beginPath();
        context.fillStyle = this.mainColor;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();

        this.move();
        this.setQuandrant();
        this.drawVectors();
    }

    checkIntersection(quads) {
        var touched = false;
        for (var i = 0; i < this.quadrant.length; i++) {
            for (var j = 0; j < quads[this.quadrant[i]].length; j++) {
                console.log(distance(this, quads[this.quadrant[i]][j]));
                if (distance(this, quads[this.quadrant[i]][j]) <= this.radius + quads[this.quadrant[i]][j].radius + 0.1 && this != quads[this.quadrant[i]][j]) {
                    touched = true;
                    collisionAdjustment(this, quads[this.quadrant[i]][j], false);
                    console.log('worked');
                }
            }


        }
        if (touched) {
            this.mainColor = this.color[1];
        } else {
            this.mainColor = this.color[0];
        }

    }
    setQuandrant() {
        this.quadrant = [];
        var left = Math.floor((this.x - this.radius + 1) / this.quadWidth);
        var right = Math.floor((this.x + this.radius - 1) / this.quadWidth);
        if (left < 0) {
            left = 0;
        }

        this.quadrant.push(left);
        this.quadrant.push(right);
        if (this.quadrant[0] == this.quadrant[1]) {
            this.quadrant.pop()
        }
    }
}

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var debugHelper;
var ballList = [];

canvas.addEventListener('mousedown', function (e) {
    ballList.push(new ball(e.clientX, e.clientY, 30));
});

onload = function () {
    setInterval('mainLoop()', 3);
}

function clearRect() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function collisionAdjustment(temp, point2, end) {

    if (end) {
        return;
    }
    collisionAdjustment(point2, temp, true);

}


//mathematic utility functions
function distance(point1, point2) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}

//putting balls in their quadrant buckets (only using vertically aligned buckets)
function gatherQuadData() {
    var quadDict = {}
    var j = 0;
    for (var i = 0; i <= canvas.width; i += canvas.width / 6) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.stroke();



        quadDict[j] = [];
        j++;
    }
    ballList.forEach(function (element, index, array) {
        if (element.quadrant.length == 1) {
            quadDict[element.quadrant[0]].push(element);
        } else {
            quadDict[element.quadrant[0]].push(element);
            quadDict[element.quadrant[1]].push(element);
        }
    });
    debugHelper = quadDict;
    return quadDict;
}

function mainLoop() {
    clearRect();


    var tempDict = gatherQuadData();
    for (var i = 0; i < ballList.length; i++) {
        ballList[i].checkIntersection(tempDict);
        ballList[i].drawBall();

    }
}