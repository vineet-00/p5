let sun;
let cam;
let sunTexture;
let textures=[];
function preload(){
  sunTexture = loadImage('data/sun.jpg');
  textures[0] = loadImage('data/mercury.jpg');
  textures[1] = loadImage('data/earth.jpg');
  textures[2] = loadImage('data/saturn.jpg');
}

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  
  canvas.elt.oncontextmenu = () => false;
  
  cam = createEasyCam( {distance:500} );
  
  sun = new Planet(50,0,0,sunTexture);
  sun.spawnMoons(4,1);
}

function draw() {
  background(0);
  lights();
  // translate(width/2,height/2);
  sun.show();
  sun.orbit();
}