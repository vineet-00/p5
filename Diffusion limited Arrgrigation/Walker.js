class Walker{
  constructor(x, y){
    if (arguments.length == 2) {
      this.pos = createVector(x, y);
      this.stuck = true;
    } else {
      this.pos = randomPoint();
      this.stuck = false;
    }
    this.r = radius;
    
//     this.stuck=stuck || false;
  }
  
  walk(){
    var vel =p5.Vector.random2D();
    this.pos.add(vel);
    this.pos.x =constrain(this.pos.x, 0, width);
    this.pos.y =constrain(this.pos.y, 0, height);
  }
  
  checkStuck(others){
    for(var i=0; i< others.length; i++){
      var d = distSq(this.pos,others[i].pos);
      if(d< (this.r * others[i].r * 4)){
        this.stuck=true;
        return true;
      }
    }
    return false;
  }
  
  show(){
    stroke(255,100);
    if(this.stuck){
      fill(255,0,100);
    }else{
      fill(255);
    }
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }
  
  
}

function randomPoint(){
  var i=floor(random(4));
  if(i===0){
    var x=random(width);
    return createVector(x,0);
  }else if(i===1){
    var x=random(width);
    return createVector(x,height);
  }else if(i===2){
    var y=random(height);
    return createVector(0,y);
  }else{
    var y=random(height);
    return createVector(width,y);
  }
}

function distSq(a,b){
    var dx =b.x -a.x;
    var dy =b.y -a.y;
    
    return (dx*dx + dy*dy);
  }