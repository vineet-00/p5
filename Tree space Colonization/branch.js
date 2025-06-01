class Branch{
  constructor(parent, pos, dir){
    this.pos=pos;
    this.parent= parent;
    this.dir=dir;
    this.orgdir=this.dir.copy();
    this.count=0;
    this.len=5;
  }
  
  reset(){
    this.dir=this.orgdir.copy();
    this.count=0;
  }
  
  next(){
    let nextdir= p5.Vector.mult(this.dir,this.len);
    let nextPos= p5.Vector.add(this.pos,nextdir);
    let nextBranch= new Branch(this, nextPos, this.dir.copy());
    return nextBranch;
  }
  
  show(){
    if(this.parent != null){
      stroke(255);
      line(this.pos.x, this.pos.y,this.parent.pos.x, this.parent.pos.y);
    }
  }
}