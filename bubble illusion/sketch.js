let bubble=[];

function setup() {
  createCanvas(500, 400);
    for(let i=0; i<=500;i++){
    let x=random(width);
    let y=random(height);
    let r=random(10,40);
    bubble[i]=new Bubble(x,y,r);
  }
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