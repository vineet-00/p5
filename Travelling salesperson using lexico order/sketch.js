// TSP (lexicographic order) — visuals enhanced, layout-friendly
// Algorithm logic kept as originally provided (next lexicographic permutation)

let cities = [];
let maxCities = 10;

let order = [];
let totalPermutation;
let count = 0;

let recordDistance;
let bestEver;

let canvasContainer; // DOM container
let canvasW, canvasH;

function setup() {
  // attach canvas to the right column container and size to it
  canvasContainer = document.getElementById('canvas-container');
  if (!canvasContainer) {
    canvasContainer = document.createElement('div');
    canvasContainer.id = 'canvas-container';
    document.body.appendChild(canvasContainer);
  }
  // use container's inner size
  canvasW = canvasContainer.clientWidth || 600;
  canvasH = canvasContainer.clientHeight || 600;

  // create canvas sized to fill the right column
  var cnv = createCanvas(canvasW, canvasH);
  cnv.parent('canvas-container');

  // initialize
  intializeCities();
  initializeOrder();

  recordDistance = calDistance(cities, order); // Initialize the record distance
  bestEver = order.slice(); // Store the best path
  totalPermutation = factorial(maxCities); // Compute total permutations

  // show actual city count in the left card
  const cityCountEl = document.getElementById('city-count');
  if (cityCountEl) cityCountEl.textContent = maxCities;
  textFont('Helvetica, Arial, sans-serif');
}

function windowResized() {
  // keep canvas sized to container
  if (canvasContainer) {
    canvasW = canvasContainer.clientWidth || 600;
    canvasH = canvasContainer.clientHeight || 600;
    resizeCanvas(canvasW, canvasH);
  }
}

function draw() {
  // subtle background grid for context
  background(10, 16, 22);
  drawGrid();

  // Draw best path at top area (magenta, bold)
  drawBestPath();

  // Draw current path at lower half (white thin)
  drawCurrentPath();

  // show cities on both halves
  drawCities();

  // compute distances and possibly update best
  let currentDist = calDistance(cities, order);
  if (currentDist < recordDistance) {
    recordDistance = currentDist;
    bestEver = order.slice(); // Update best ever path
  }

  // show textual info overlay
  displayProgress(currentDist);

  // next permutation
  generateNextOrder();
}

/* ----- Drawing helpers ----- */

function drawGrid() {
  stroke(255, 255, 255, 6);
  strokeWeight(1);
  for (let x = 0; x < width; x += 40) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += 40) {
    line(0, y, width, y);
  }
  noStroke();
}

function intializeCities() {
  cities = [];
  // place cities in upper half and we'll mirror them for lower half drawing using same coords
  for (var i = 0; i < maxCities; i++) {
    let v = createVector(random(40, width - 40), random(40, height / 2 - 40));
    cities[i] = v;
  }
}

function initializeOrder() {
  order = [];
  for (var i = 0; i < maxCities; i++) {
    order.push(i);
  }
}

function drawCities() {
  // draw city markers for both top and bottom views
  for (let i = 0; i < cities.length; i++) {
    const c = cities[i];
    // top city marker (small)
    noStroke();
    fill(255, 200, 255);
    ellipse(c.x, c.y, 8, 8);

    // bottom mirrored marker (slightly dimmer)
    fill(220);
    ellipse(c.x, c.y + height / 2, 6, 6);

    // labels: small index near bottom marker for clarity
    fill(180);
    textSize(12);
    textAlign(LEFT, CENTER);
    text(i, c.x + 8, c.y + height / 2);
  }
}

function drawBestPath() {
  // draw best path (magenta) across the top half
  stroke(200, 40, 200, 220);
  strokeWeight(3.5);
  noFill();
  beginShape();
  for (let i = 0; i < bestEver.length; i++) {
    let n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();
  // close loop visually
  stroke(200, 40, 200, 110);
  line(cities[bestEver[bestEver.length - 1]].x, cities[bestEver[bestEver.length - 1]].y,
       cities[bestEver[0]].x, cities[bestEver[0]].y);
}

function drawCurrentPath() {
  // draw current path (white, thin) in the lower half
  push();
  translate(0, height / 2);
  stroke(255, 255, 255, 180);
  strokeWeight(1.2);
  noFill();
  beginShape();
  for (let i = 0; i < order.length; i++) {
    let n = order[i];
    vertex(cities[n].x, cities[n].y); // same city coords but translated down
  }
  endShape();
  // close loop for current order
  stroke(255, 255, 255, 80);
  line(cities[order[order.length - 1]].x, cities[order[order.length - 1]].y,
       cities[order[0]].x, cities[order[0]].y);
  pop();
}

/* ----- Info overlay ----- */
function displayProgress(currentDist) {
  // top-left panel
  const pad = 14;
  noStroke();
  fill(12, 22, 30, 200);
  rect(pad - 6, pad - 6, 260, 110, 8);

  fill(255);
  textSize(14);
  textAlign(LEFT, TOP);
  text('Progress (permutations):', pad, pad);
  textSize(20);
  text(nf(count, 0, 0) + ' / ' + nf(totalPermutation, 0, 0), pad, pad + 22);

  textSize(14);
  text('Best distance:', pad, pad + 50);
  textSize(18);
  text(nf(recordDistance, 0, 2), pad, pad + 68);

  textSize(14);
  text('Current distance:', pad, pad + 92);
  textSize(16);
  text(nf(currentDist, 0, 2), pad + 140, pad + 92);
}

/* ----- Distance & permutation logic (kept from original) ----- */

function calDistance(points, orderArr) {
  var total = 0;
  for (let i = 0; i < orderArr.length - 1; i++) {
    let cityA = points[orderArr[i]];
    let cityB = points[orderArr[i + 1]];
    total += dist(cityA.x, cityA.y, cityB.x, cityB.y);
  }
  return total;
}

// Generates the next lexicographic order (kept same logic as provided)
function generateNextOrder() {
  count++;
  let largestI = -1;
  for (let i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }

  // If no such 'i' is found, we've finished all permutations
  if (largestI === -1) {
    noLoop();
    console.log('Finished all permutations');
    return;
  }

  let largestJ = -1;
  for (let j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  swap(order, largestI, largestJ);

  let endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}

// Swaps two elements in an array
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Calculates the factorial of a number
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
