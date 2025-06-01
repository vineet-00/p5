class Firework{
  constructor(){
    this.firework=new Particle(random(width),height,true); 
    this.exploded=false;
    this.particles=[];
  }
  
  done(){
    if(this.exploded && this.particles.length === 0){
      return true;
    }
  }
  
  update(){
    if(!this.exploded){
      this.firework.update();
      this.firework.applyForce(gravity);
      if(this.firework.vel.y >=0){
        this.exploded=true;
        this.explode();
      }
    }  
    for(var i=this.particles.length-1;i>=0;i--){
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if(this.particles[i].done()){
        this.particles.splice(i,1);
      }
    }
  }
  
  explode(){
    for(var i=0;i<100;i++){
      const p = new Particle(this.firework.pos.x,this.firework.pos.y,false)
      this.particles.push(p);
    }
  }
  
  show(){
    if(!this.exploded){
      this.firework.show();
    }
    for(var i=0; i<this.particles.length;i++){
      this.particles[i].show();
    }
  }
}