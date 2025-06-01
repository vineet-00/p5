let cities = [];
let maxCities = 10;

let order = [];
let totalPermutation;
let count = 0;

let recordDistance;
let bestEver;

function setup() {
  createCanvas(400, 600);
  intializeCities();
  initializeOrder();
  
  recordDistance = calDistance(cities, order); // Initialize the record distance
  bestEver = order.slice(); // Store the best path
  totalPermutation = factorial(maxCities); // Compute total permutations
}

function draw() {
  background(0);
  
  drawCities();
  drawBestPath();
  drawCurrentPath();
  
  let currentDist = calDistance(cities, order);
  if (currentDist < recordDistance) {
    recordDistance = currentDist;
    bestEver = order.slice(); // Update best ever path
  }
  
  displayProgress();
  generateNextOrder();
}

// Initializes random city locations
function intializeCities() {
  for (var i = 0; i < maxCities; i++) {
    let v = createVector(random(width), random(height / 2));
    cities[i] = v;
  }
}

// Initializes the order array
function initializeOrder() {
  for (var i = 0; i < maxCities; i++) {
    order.push(i);
  }
}

// Draw the cities on the canvas
function drawCities() {
  fill(255);
  for (let city of cities) {
    ellipse(city.x, city.y, 8, 8);
  }
}

// Draw the best path found so far
function drawBestPath() {
  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < bestEver.length; i++) {
    let n = bestEver[i];
    vertex(cities[n].x, cities[n].y); // Use bestEver order
  }
  endShape();
}

// Draw current path (under exploration)
function drawCurrentPath() {
  translate(0, height / 2);
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < order.length; i++) {
    let n = order[i];
    vertex(cities[n].x, cities[n].y); // Use current order
  }
  endShape();
}

// Display the progress percentage
function displayProgress() {
  textSize(32);
  fill(255);
  var percent = 100 * (count / totalPermutation);
  text(nf(percent, 0, 2) + "% completed", 20, height / 2 - 50);
}

// Calculates the total distance for given order
function calDistance(points, order) {
  var total = 0;
  for (let i = 0; i < order.length - 1; i++) {
    let cityA = points[order[i]];
    let cityB = points[order[i + 1]];
    total += dist(cityA.x, cityA.y, cityB.x, cityB.y);
  }
  return total;
}

// Generates the next lexicographic order
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
