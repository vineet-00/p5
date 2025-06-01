let inc=0.02;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
}

function draw() {
  loadPixels();
   let yoff=0;
  for(let y=0;y<height;y++){
     let xoff=0;
    for(let x=0;x<width;x++){
     
      var index=(x+y*width)*4;
      let r=noise(xoff,yoff)*255;
      pixels[index +0] = r;
      pixels[index +1] = r;
      pixels[index +2] = r;
      pixels[index +3] = 255;
      xoff+=inc; 
    }
    yoff+=inc;
  }
    
  updatePixels();
  
}