let bubble=[];

function setup() {
  createCanvas(600, 400);
  for(let i=0; i<=5;i++){
    let x=20+100*i;
    bubble[i]=new Bubble(x,200,20);
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
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x,this.y,this.r,this.r);
  }
}