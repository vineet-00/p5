var r = 4;
var k = 30;
var grid = [];
var w = r / Math.sqrt(2);
var active = [];
var cols, rows;
var ordered = [];

function setup() {
  createCanvas(400, 400);
  background(0);
  strokeWeight(4);
  colorMode(HSB);

  // Initialize grid dimensions
  initializeGrid();

  // Add the first sample point in the middle of the canvas
  addInitialSample();
}

function draw() {
  background(0);

  // Perform multiple sampling attempts per frame
  for (var total = 0; total < 25; total++) {
    if (active.length > 0) {
      attemptSampling();
    }
  }

  // Draw all points that have been successfully placed
  drawPoints();
}

// Initialize the grid and setup the number of columns and rows
function initializeGrid() {
  cols = floor(width / w);
  rows = floor(height / w);

  // Fill the grid with undefined (empty cells)
  for (var i = 0; i < cols * rows; i++) {
    grid[i] = undefined;
  }
}

// Add the initial sample point at the center of the canvas
function addInitialSample() {
  var x = width / 2;
  var y = height / 2;
  var pos = createVector(x, y);

  // Place the first sample in the grid and add it to active and ordered lists
  var i = floor(x / w);
  var j = floor(y / w);
  grid[i + j * cols] = pos;
  active.push(pos);
  ordered.push(pos);
}

// Attempt to find a valid sample point near a random active point
function attemptSampling() {
  var randIndex = floor(random(active.length));
  var pos = active[randIndex];
  var found = false;

  // Try generating k new points around the current position
  for (var n = 0; n < k; n++) {
    var sample = generateRandomSampleAround(pos);
    if (isSampleValid(sample)) {
      // If the sample is valid, add it to the grid and active list
      addSampleToGrid(sample);
      found = true;
      break;
    }
  }

  // If no valid sample was found, remove the current active point
  if (!found) {
    active.splice(randIndex, 1);
  }
}

// Generate a random sample around a given position
function generateRandomSampleAround(pos) {
  var sample = p5.Vector.random2D(); // Get a random 2D direction
  var distance = random(r, r * 2);    // Distance from the original point
  sample.setMag(distance);            // Set magnitude of the random direction
  sample.add(pos);                    // Offset by the current position
  return sample;
}

// Check if the generated sample is within bounds and has valid distance
function isSampleValid(sample) {
  var col = floor(sample.x / w);
  var row = floor(sample.y / w);

  // Ensure the sample is within grid bounds
  if (col > -1 && row > -1 && col < cols && row < rows && !grid[col + row * cols]) {
    // Check neighboring cells to ensure minimum distance
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        var index = (col + i) + (row + j) * cols;
        var neighbor = grid[index];

        if (neighbor) {
          var distance = p5.Vector.dist(sample, neighbor);
          if (distance < r) {
            return false; // Too close to a neighbor
          }
        }
      }
    }
    return true; // Valid sample
  }

  return false; // Out of bounds or cell already occupied
}

// Add a valid sample to the grid and lists
function addSampleToGrid(sample) {
  var col = floor(sample.x / w);
  var row = floor(sample.y / w);
  grid[col + row * cols] = sample;
  active.push(sample);
  ordered.push(sample);
}

// Draw all ordered points on the canvas
function drawPoints() {
  for (var i = 0; i < ordered.length; i++) {
    if (ordered[i]) {
      stroke(i % 360, 100, 100);
      strokeWeight(r * 0.5);
      point(ordered[i].x, ordered[i].y);
    }
  }
}
