var snake;
var scl = 20;
var food;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('canvas-holder');
  snake = new Snake();
  frameRate(10); // Original speed
  pickLocation();
}

function draw() {
  background(25, 25, 25); // Dark background
  
  snake.death();
  snake.update(scl);
  snake.show(scl);
  
  if (snake.eat(food)) {
    pickLocation();
  }
  
  fill(255, 0, 100); // Original food color
  rect(food.x, food.y, scl, scl);
}

function pickLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  }
}
