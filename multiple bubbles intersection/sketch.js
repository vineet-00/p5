let bubble=[];


function setup() {
  createCanvas(600, 400);
  
  
  for(let i=0;i<=10;i++){
    let x=random(width);
    let y=random(height);
    let r=random(10,50);
    bubble[i]=new Bubble(x,y,r);
  }
}

function draw() {
  background(0);
  
  for(let b of bubble){
    b.show();
    b.move();
    let overlapping=false;
    for(let other of bubble){
      if(b !== other && b.intersect(other)){
        overlapping=true;
      }
    }
    if(overlapping){
      b.changeColor(255);
    }else{
      b.changeColor(0);
    }
    
  }
}

class Bubble {
  constructor(x, y, r=50) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }
  
  intersect(other){
    let d= dist(this.x,this.y,other.x,other.y);
    if(d<this.r+other.r){
      return true;
    }else{
      return false;
    }
  }
  
  changeColor(bright){
    this.brightness=bright;
  }

  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  show() {
    stroke(255);
    strokeWeight(4);
    fill(this.brightness, 125);
    ellipse(this.x, this.y, this.r * 2);
  }
}
