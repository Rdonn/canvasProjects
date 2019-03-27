var canvas = document.getElementById('checkers');

canvas.width = 500;
canvas.height = 500;
console.log(canvas);
var c = canvas.getContext('2d');
var mouseClicked = false;
var mousePositionX;
var mousePositionY;
var rectValues = document.getElementById('checkers').getBoundingClientRect();
var canvasX = rectValues.x;
var canvasY = rectValues.y;
var matrix = new Array(canvas.width / 10);
var continueCall = true;
for (var i = 0; i < canvas.width / 10; i++) {
    matrix[i] = new Array(canvas.height / 10);
}

for (var i = 0; i < canvas.width / 10; i++) {
    for (var j = 0; j < canvas.height / 10; j++) {
        matrix[i][j] = 0;
    }
}


function calculateMatrixPosition() {
    var tempy = Math.floor(mousePositionY / 10);
    var tempx = Math.floor(mousePositionX / 10);
    if (tempy > 49) {
        tempy = 49;
    } else if (tempy < 0) {
        tempy = 0;
    }

    if (tempx > 49) {
        tempx = 49;
    } else if (tempx < 0) {
        tempx = 0;
    }

    matrix[tempy][tempx] = 1;
    c.fillRect(tempx * 10, tempy * 10, 10, 10);
    c.stroke();
}

function setMousePosition(e) {
    var rectValues = document.getElementById('checkers').getBoundingClientRect();
    var canvasX = rectValues.x;
    var canvasY = rectValues.y;
    mousePositionX = e.clientX - canvasX;
    mousePositionY = e.clientY - canvasY;
    calculateMatrixPosition();
    //console.log(mousePositionX, mousePositionY);
}

canvas.addEventListener('mousedown', function (e) {
    mouseClicked = true;
    setMousePosition(e);
    //document.getElementById('printPosition').innerText = mousePositionX + "," + mousePositionY;
})

canvas.addEventListener('mousemove', function (e) {
    if (mouseClicked) {
        setMousePosition(e);
        //document.getElementById('printPosition').innerText = mousePositionX + "," + mousePositionY;
    }
})
canvas.addEventListener('mouseup', function (e) {
    mouseClicked = false;
})

function renderGrid() {
    deltaxLine = 10;
    deltayLine = 10;
    for (var i = 0; i < canvas.width; i += deltaxLine) {
        c.beginPath();
        c.moveTo(i, 0);
        c.lineTo(i, canvas.height);
        c.stroke();
    }
    for (var i = 0; i < canvas.height; i += deltayLine) {
        c.beginPath();
        c.moveTo(0, i);
        c.lineTo(canvas.width, i);
        c.stroke();
    }


}

function clearCan() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById('clear').addEventListener('mousedown', function (e) {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            matrix[i][j] = 0;
        }
    }
    clearCan();
    renderGrid();
});

document.getElementById('start').addEventListener('mousedown', function (e) {
    continueCall = true;
    getGeneration();
});

function drawRectBasedOnCoor(y, x) {
    c.fillRect(x * 10, y * 10, 10, 10);
    c.stroke();
}

function checkRules(number, count) {
    if (number == 1) {
        if (count < 2) {
            return 0;
        } else if (count == 2 || count == 3) {
            return 1;
        } else if (count > 3) {
            return 0;
        }
    } else {
        if (count == 3) {
            return 1;
        }
    }
    return 0;
}
neighbors = [
    [0, 1],
    [1, 1],
    [1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [0, -1],
    [-1, 0]
];

function getGeneration() {
    var newMatrix = new Array(50);
    for (var i = 0; i < 50; i++) {
        newMatrix[i] = new Array(50);
    }


    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            var count = 0;
            for (var k = 0; k < neighbors.length; k++) {
                var newY = i + neighbors[k][0];
                var newX = j + neighbors[k][1];
                if (newY < 0 || newY > 49 || newX < 0 || newX > 49) {
                    continue;
                }
                count += matrix[newY][newX];

            }
            newMatrix[i][j] = checkRules(matrix[i][j], count);
        }
    }
    matrix = newMatrix;
    renderNewMatrix();
}

document.getElementById('stop').addEventListener('mousedown', function (e) {
    continueCall = false;
})

function getColor(boundryX, boundryY) {

    var colorNum = Math.floor(Math.random() * 7);
    var colors = [
        "#ffe900",
        "#f20000",
        "#f8102d",
        "#400080",
        "#ff8040",
        "#ff80ff"
    ];
    return colors[Math.floor(boundryX / ((canvas.width / 10) / colors.length))];

}

function renderNewMatrix() {
    clearCan();
    renderGrid();
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] == 1) {
                c.fillStyle = getColor(j, i);
                c.fillRect(j * 10, i * 10, 10, 10);
                c.stroke();
            }
        }
    }
    if (continueCall) {
        setTimeout('getGeneration()', 100);
    }

}