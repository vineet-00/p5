var snake;
var scl=20;
var food;
function setup() {
  createCanvas(600, 600);
  snake = new Snake();
  frameRate(10);
  pickLocation();
  
}

function draw() {
  background(51);
  snake.death();
  snake.update(scl);
  snake.show(scl);
  
  if (snake.eat(food)) {
    pickLocation();
  }
  
  fill(255,0,100);
  rect(food.x,food.y,scl,scl);
  
}

function pickLocation(){
    let cols=floor(width/scl);
    let rows=floor(height/scl);
    
    food = createVector(floor(random(cols)),floor(random(rows)));
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