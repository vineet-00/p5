var r = 6; // radius for spacing
var k = 30;
var grid = [];
var w = r / Math.sqrt(2);
var active = [];
var cols, rows;
var ordered = [];

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent("main"); 
  background(15);
  strokeWeight(2);
  colorMode(HSB);

  initializeGrid();
  addInitialSample();
}

function draw() {
  background(15, 80, 10); // dark smooth background

  for (var total = 0; total < 5; total++) {
    if (active.length > 0) {
      attemptSampling();
    }
  }

  drawPoints();
}

function initializeGrid() {
  cols = floor(width / w);
  rows = floor(height / w);
  for (var i = 0; i < cols * rows; i++) {
    grid[i] = undefined;
  }
}

function addInitialSample() {
  var x = width / 2;
  var y = height / 2;
  var pos = createVector(x, y);
  var i = floor(x / w);
  var j = floor(y / w);
  grid[i + j * cols] = pos;
  active.push(pos);
  ordered.push(pos);
}

function attemptSampling() {
  var randIndex = floor(random(active.length));
  var pos = active[randIndex];
  var found = false;

  for (var n = 0; n < k; n++) {
    var sample = generateRandomSampleAround(pos);
    if (isSampleValid(sample)) {
      addSampleToGrid(sample);
      found = true;
      break;
    }
  }

  if (!found) {
    active.splice(randIndex, 1);
  }
}

function generateRandomSampleAround(pos) {
  var sample = p5.Vector.random2D();
  var distance = random(r, r * 2);
  sample.setMag(distance);
  sample.add(pos);
  return sample;
}

function isSampleValid(sample) {
  var col = floor(sample.x / w);
  var row = floor(sample.y / w);

  if (col > -1 && row > -1 && col < cols && row < rows && !grid[col + row * cols]) {
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        var index = (col + i) + (row + j) * cols;
        var neighbor = grid[index];
        if (neighbor) {
          var distance = p5.Vector.dist(sample, neighbor);
          if (distance < r) {
            return false;
          }
        }
      }
    }
    return true;
  }
  return false;
}

function addSampleToGrid(sample) {
  var col = floor(sample.x / w);
  var row = floor(sample.y / w);
  grid[col + row * cols] = sample;
  active.push(sample);
  ordered.push(sample);
}

function drawPoints() {
  for (var i = 0; i < ordered.length; i++) {
    if (ordered[i]) {
      let hue = map(i, 0, ordered.length, 180, 320); // smooth gradient
      stroke(hue, 80, 100);
      point(ordered[i].x, ordered[i].y);
    }
  }
}
