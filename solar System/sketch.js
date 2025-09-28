let sun;
let sunTexture;
let textures = [];

function preload() {
  sunTexture = loadImage('data/sun.jpg');
  textures[0] = loadImage('data/mercury.jpg');
  textures[1] = loadImage('data/earth.jpg');
  textures[2] = loadImage('data/saturn.jpg');
}

function setup() {
  let holder = select('#canvas-holder');
  let cnv = createCanvas(600, 600, WEBGL);
  cnv.parent(holder);
  cnv.elt.oncontextmenu = () => false;

  sun = new Planet(50, 0, 0, sunTexture);
  sun.spawnMoons(4);
}

function draw() {
  background(0);
  orbitControl();  // Enables rotate, zoom, pan
  lights();
  sun.show();
  sun.orbit();
}
