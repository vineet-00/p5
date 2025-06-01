let x,y;
let r,g,b;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  x=random(width);
  y=random(height);
  r=random(255);
  g=0;
  b=random(255);
  fill(r,g,b,100);
  noStroke();
  circle(x,y,20);
}