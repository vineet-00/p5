var blob;
var blobs=[];
function setup() {
  createCanvas(600, 600);
  blob=new MyBlob(width/2,height/2,64);
  for(var i=0;i<100;i++){
    var x =random(-width,width);
    var y= random(-height,height);
    blobs[i]=new MyBlob(x,y,16);
  }
}

function draw() {
  background(0);
  translate(width/2 - blob.pos.x, height/2 - blob.pos.y);
  for(var i=blobs.length-1;i>=0;i--){
    if(blob.eats(blobs[i])){
      blobs.splice(i,1);
    }
  }
  blob.show();
  blob.update();
  for(var i=0;i<10;i++){
    blobs[i].show();
  }
}