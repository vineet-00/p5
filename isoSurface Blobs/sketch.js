let blobs=[];
function setup() {
  createCanvas(400, 200);
  colorMode(HSB);
  for(let i=0;i<10;i++) {
    blobs.push(new Blob(random(0, width), random(0, height)));
  }
}

function draw() {
  background(51);
  loadPixels();
  for(let x=0;x<width;x++){
    for(let y=0;y<height;y++){
      let sum=0;
      for(let i=0;i<blobs.length;i++){
        let xdiff=x-blobs[i].x;
        let ydiff=y-blobs[i].y;
        let d = sqrt((xdiff*xdiff) + (ydiff*ydiff));
        sum += 10 * blobs[i].r/d;
      }
      set(x,y,color(sum,255,255));
    }
  }
  updatePixels();
  
  for(let i=0;i<blobs.length;i++){
    blobs[i].update();
  }
  
}