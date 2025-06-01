function setup() {
  createCanvas(360, 360);
  pixelDensity(1);
    
  
}

function draw() {
  loadPixels();
  let maxIterations =100;
  for(let x=0; x<width;x++){
    for(let y=0;y<height;y++){
      
      let a = map(x,0,width,2,-2);
      let b = map(y,0,height,-2,2);
      
      let n=0;
      let ca=a;
      let cb=b;
      while(n<maxIterations){
        var aa=a*a-b*b;
        var bb= 2*a*b;
        
        a=aa + ca;
        b=bb + cb;
        
        if(a+b>16){
          break;
        }
        n++;
      }
      var bright = map(n,0,maxIterations,0,255);
      
      let pix=(x+y*width) *4;
      pixels[pix+0]=bright;
      pixels[pix+1]=bright;
      pixels[pix+2]=bright;
      pixels[pix+3]=255;
    }
  }
  updatePixels();
}