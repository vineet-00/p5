let d=[];

function setup() {
  createCanvas(600, 400);
  for(let i=0;i<500;i++){
    d[i]=new Rain();
  }
}

function draw() {
  background(230,230,250);
  for(let i=0;i<500;i++){
    d[i].drop();
    d[i].show();
    
  }
}