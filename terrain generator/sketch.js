
var rows, cols;
var scl = 20;
var w = 1400;
var h = 1000;
var flying = 0;
var terrain = [];

var canvasContainer; // DOM element reference for sizing

function setup() {
  // use standard DOM selection instead of p5.select()
  canvasContainer = document.getElementById('canvas-container');

  // ensure container exists
  if (!canvasContainer) {
    // fallback: create and append a container so the sketch still runs
    canvasContainer = document.createElement('div');
    canvasContainer.id = 'canvas-container';
    document.body.appendChild(canvasContainer);
  }

  var cw = canvasContainer.clientWidth || 600;
  var ch = canvasContainer.clientHeight || 600;

  // create canvas sized to fill the right column
  var canvas = createCanvas(cw, ch, WEBGL);
  canvas.parent('canvas-container');

  cols = Math.floor(w / scl);
  rows = Math.floor(h / scl);

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function windowResized() {
  // when the window resizes, resize canvas to fit container
  if (canvasContainer) {
    var cw = canvasContainer.clientWidth || 600;
    var ch = canvasContainer.clientHeight || 600;
    resizeCanvas(cw, ch);
  }
}

function draw() {
  flying -= 0.1;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(10, 18, 24);
  translate(0, 50);
  rotateX(PI / 3);
  fill(200, 200, 200, 150);
  translate(-w / 2, -h / 2);

  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}
