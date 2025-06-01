class Rocket{
  constructor(dna){
    this.pos= createVector(width/2,height);
    this.vel= createVector();
    this.acc= createVector();
    this.completed=false;
    this.crashed = false;
    if(dna){
      this.dna=dna;
    }
    else{
      this.dna = new DNA();
    }
    this.fitness=0;
  }
  
  applyforce(force){
    this.acc.add(force);
  }
  
  calcFitness(){
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness=map(d,0,width,width,0);
    
    if(this.completed){
      this.fitness *=10;
    }
    if(this.crashed){
      this.fitness /=10;
      
    }
  }
  
  update(){
    var d = dist(this.pos.x, this.pos.y,target.x, target.y);
    if(d<10){
      this.completed=true;
    }
    
    if(this.pos.x >rx && this.pos.x<(rx + rw) && this.pos.y > ry && this.pos.y < (ry +rh) ){
      this.crashed=true;
    }
    
    if(this.pos.x > width || this.pos.x <0){
      this.crashed=true;
    }
    if(this.pos.y > height || this.pos.y<0){
      this.crashed=true;
    }
    
    this.applyforce(this.dna.genes[count]);
    if(!this.completed && !this.crashed){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }
  
  show(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    noStroke();
    fill(255,150);
    rect(0,0,25,5);
    pop();
  }
}