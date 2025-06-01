class MyBlob{
  constructor(x,y,r){
    this.pos = createVector(x, y);
    this.r=r;
  }
  
  update(){
    var vel = createVector(mouseX-width/2,mouseY-height/2);
    vel.setMag(3);
    this.pos.add(vel);
  }
  
  eats(other){
    var d= p5.Vector.dist(this.pos,other.pos);
    if(d < this.r + other.r){
      var sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r=
      return true;
    }else{
      return false;
    }
  }
  
  show(){
    fill(255);
    ellipse(this.pos.x,this.pos.y,this.r*2, this.r*2);
  }
}