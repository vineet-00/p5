var n=0;
var c=4;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  colorMode(HSB);
  background(0);
}

function draw() {
  var a = n*137.3; 
  // 137.5 for new pattern
  var r= c* sqrt(n);
  
  var x= r* cos(a) + width/2;
  var y= r* sin(a) + height/2;
  
  fill((a-r)%255,255,255);
  noStroke();
  ellipse(x,y,4,4);
  
  n++;
}