// let xoff1=0;
// let xoff2=1000;
let inc=0.02;
let start=0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);
  noFill();
  beginShape();
  let xoff=start;
  for(let x=0;x<width;x++){
    stroke(255);
    y=noise(xoff)*height;
    vertex(x,y);
    xoff+=inc;
  }
  start+=inc;
  endShape();
  
//   let x= map(noise(xoff1),0,1,0,width);
//   let y=map(noise(xoff2),0,1,0,height);
  
//   xoff1 += 0.01;
//   xoff2 +=0.01;
//   ellipse(x,y,24,24);
}