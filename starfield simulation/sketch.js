let star=[];
let speed;

function setup() {
  createCanvas(600,600);
  for(let i=0;i<800;i++){
    star[i]=new Stars();
  }
}

function draw() {
  background(0);
  speed=map(mouseX,0,width,0,50);
  translate(width / 2, height / 2);
  for (let i = 0; i < star.length; i++) {
    star[i].update();
    star[i].show();
  }
}