class Particle{
  constructor(){
    this.pos=createVector(random(width),random(height));
    this.vel=createVector(0,0);
    this.acc=createVector(0,0);
    this.maxspeed=4;
    this.prevpos= this.pos.copy();
  }
  update(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  applyForce(force){
    this.acc.add(force);
  }
  
  show(){
    stroke(255,10);
    strokeWeight(1);
    line(this.pos.x,this.pos.y,this.prevpos.x,this.prevpos.y);
    this.updatePrev();
  }
  
  updatePrev(){
    this.prevpos.x=this.pos.x;
    this.prevpos.y=this.pos.y;
  }
  
  edges(){
    if(this.pos.x<0){
      this.pos.x=width;
      this.updatePrev();
    }
    if(this.pos.x > width){ 
      this.pos.x = 0;
      this.updatePrev();
    }
    if(this.pos.y<0){ 
      this.pos.y=height;
      this.updatePrev();
    }
    if(this.pos.y>height){ 
      this.pos.y=0;
      this.updatePrev();
    }
  }
  
  follow(vector){
    let x= floor(this.pos.x/scl);
    let y= floor(this.pos.y/scl);
    let index=x+y*cols;
    let force=vector[index];
    this.applyForce(force);
  }
}