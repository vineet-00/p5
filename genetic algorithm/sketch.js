var population;
var count=0;
var lifespan=200;
var target;
var rx=100;
var ry = 150;
var rw = 200;
var rh=10;

function setup() {
  createCanvas(400, 300);
  population=new Population();
  target= createVector(width/2,50);
}

function draw() {
  background(51);
  population.run();
  count++;
  if(count == lifespan){
    population.evalute();
    population.selection();
    count =0;
  }
  fill(255);
  rect(rx, ry, rw, rh);
  ellipse(target.x, target.y,16,16);
}