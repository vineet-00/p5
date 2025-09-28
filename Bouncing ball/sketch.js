var ball={
  x:300,
  y:200,
  xspeed:4,
  yspeed:-3
}
var ball = {
  x: 300,
  y: 200,
  xspeed: 4,
  yspeed: -3,
};

function setup() {
  const canvas = createCanvas(600, 400);
  canvas.parent('canvas-container');
  background(28, 28, 41);
}

function draw() {
  background(28, 28, 41);
  display();
  move();
  bounce();
}

function move() {
  ball.x += ball.xspeed;
  ball.y += ball.yspeed;
}

function bounce() {
  if (ball.x < 12 || ball.x > width - 12) {
    ball.xspeed *= -1;
  }
  if (ball.y < 12 || ball.y > height - 12) {
    ball.yspeed *= -1;
  }
}

function display() {
  stroke(220, 220, 255);
  strokeWeight(4);
  noFill();
  ellipse(ball.x, ball.y, 24, 24);
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  display();
  move();
  bounce();
  
}

function move(){
  ball.x= ball.x + ball.xspeed;
  ball.y= ball.y + ball.yspeed;
}

function bounce(){
  
  if(ball.x<0 || ball.x>width){
    ball.xspeed = ball.xspeed *-1;
  } 
  
  if(ball.y<0 || ball.y>height){
    ball.yspeed = ball.yspeed *-1;
  } 
  
}

function display(){
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(ball.x,ball.y,24,24);
  
}