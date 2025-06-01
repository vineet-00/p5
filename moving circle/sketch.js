
let circleX=100;
function setup() {
  createCanvas(400, 400);
}
function mousePressed(){
  circleX=0;
}

function draw() {
  background(0);
  fill(255);
  noStroke();
  circle(circleX,200,65);
  circleX = circleX +1;
}