let bubble=[];

function setup() {
  createCanvas(windowWidth, windowHeight);
    
}
function mousePressed(){
  let b=new Bubble(mouseX,mouseY,random(10,50));
  bubble.push(b);
}
function mouseDragged(){
  let b=new Bubble(mouseX,mouseY,random(10,50));
  bubble.push(b);
}
function draw() {
  background(0);
  for(let i=0; i<bubble.length;i++){
    bubble[i].move();
    bubble[i].show();
  }
}
class Bubble{
  constructor(x,y,r){
    this.x=x;
    this.y=y;
    this.r=r;
  }
  move(){
    this.x=this.x+random(-5,5);
    this.y=this.y+random(-5,5);
  }
  show(){
    // stroke(255);
    // strokeWeight(4);
    // noFill();
    noStroke();
    fill(random(0,255),random(0,255),random(0,255),50)
    ellipse(this.x,this.y,this.r,this.r);
  }
}