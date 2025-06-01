var tree=[];
var walkers=[];
// var r=4;
var maxWalkers=10;
var iterations=1000;
let radius = 8;
let hu = 0;
let shrink = 0.995;


function setup() {
  createCanvas(400, 400);
  tree[0] = new Walker(width/2,height/2);
  radius *= shrink;
  for(var i=0; i<maxWalkers;i++){
    walkers[i] = new Walker();
    radius *= shrink;
  }
}

function draw() {
  background(0);
  
  for(var i=0; i< tree.length; i++){
    tree[i].show();
  }
  
  for(var i=0; i< walkers.length; i++){
    walkers[i].show();
  }
  
  for(var n=0; n<iterations;n++){
    for(var i=walkers.length-1; i>0 ; i--){
      walkers[i].walk();
      // walkers[i].show();
    
      if(walkers[i].checkStuck(tree)){
        tree.push(walkers[i]);
        walkers.splice(i,1);
      }
    }
    // var r= walkers[walkers.length-1].r;
    while(walkers.length < maxWalkers){
      radius *= shrink;
      if(radius > 1){
        walkers.push(new Walker());
      }
    }
  }
}