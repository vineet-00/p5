class Rain{
  constructor(){
    this.x=random(width);
    this.y=random(-500,-50);
    this.z=random(0,20);
    this.yspeed=map(this.z,0,20,1,20);
    this.len=map(this.z,0,20,10,20);
  } 
  
  drop(){
    this.y=this.yspeed+this.y;
    let grav=map(this.z,0,20,0,0.2);
    this.yspeed=this.yspeed+grav
    
    
    if(this.y>height){
      this.y=random(-200,-100);
      this.yspeed=map(this.z,0,20,4,10);
    }
  }
  
  splash(){
    if(this.y>height){
      let points=[];
      
    }
  }
  
  show(){
    let thick=map(this.z,10,20,1,3);
    strokeWeight(thick);
    stroke(138,43,226);
    line(this.x,this.y,this.x,this.y+this.len);
  }
  
}