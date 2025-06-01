class Planet{
  constructor(radius, distance,o,img){
    this.v=p5.Vector.random3D();
    this.radius = radius;
    this.distance=distance;
    this.v.mult(this.distance);
    this.angle=random(TWO_PI);
    this.orbitSpeed=o;
    this.planets=null;
    this.texture=img;
  }
  
  orbit(){
    this.angle += this.orbitSpeed;
    if(this.planets != null){
      for(let i=0;i<this.planets.length;i++){
        this.planets[i].orbit();
      }
    }
  }
  
  spawnMoons(total,level){
    this.planets=[];
    for(let i=0;i<total;i++){
      let r=this.radius/(level*2);
      let d= random((this.radius + r),(this.radius+r)*2);
      let o=random(-0.1,0.1);
      // let angle=random(TWO_PI);
      let index= int(random(0,textures.length));
      this.planets[i]=new Planet(r,d,o,textures[index]);
      if(level<2){
        let num=Math.floor(random(0,3));
        this.planets[i].spawnMoons(num,level+1);  
      }
    }  
  }
  
  show(){
    push();
    noStroke();
    fill(255);
    rotate(this.angle);
    
    let v2 = createVector(1,0,1);
    let p= this.v.cross(v2);
    translate(this.v.x,this.v.y,this.v.z);
    // translate(this.distance,0);
    texture(this.texture);
    sphere(this.radius);
    // ellipse(0,0,this.radius*2);
    
    if(this.planets!=null){
      for(let i=0;i<this.planets.length;i++){
        this.planets[i].show();
      }
    }
    pop();
  }
  
}