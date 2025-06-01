class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total=0;
    this.tail=[];
  }
  
  death(){
    for(let i=0;i<this.tail.length;i++){
      let pos= this.tail[i];
      let d= dist(this.x,this.y,pos.x,pos.y);
      if(d<1){
        console.log("Starting Over !");
        this.total=0;
        this.tail=[];
      }
    }
  }

  dir(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  update(scl) {
    for(let i=0;i<this.tail.length-1;i++){
      this.tail[i]=this.tail[i+1];
    }

    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }
      
    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;
    
    this.x=constrain(this.x,0,width-scl);
    this.y=constrain(this.y,0,height-scl);
  }

  show(scl) {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }
  
  eat(pos){
    let d=dist(this.x,this.y,pos.x,pos.y);
    
    // console.log(`Snake Position: (${this.x}, ${this.y})`);
    // console.log(`Food Position: (${pos.x}, ${pos.y})`);
    // console.log(`Distance: ${d}`);
    
    if(d<1){
      this.total++;
      return true;
    }else{
      return false;
    }
  }
}