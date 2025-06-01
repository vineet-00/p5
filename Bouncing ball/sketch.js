var ball={
  x:300,
  y:200,
  xspeed:4,
  yspeed:-3
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