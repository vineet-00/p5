// sketch.js — main app glue
let polys = [];
let angle = 75;
let delta = 10;
let tileSize = 100;

let angleRange, deltaRange, gridRange;
let angleVal, deltaVal, gridVal;
let resetBtn, randomBtn;

let hankinColor = '#E879F9';
let edgeColor = 'rgba(255,255,255,0.12)';
let bgColor = '#071226';

function setup(){
  // create canvas inside our container so layout is controlled by CSS
  const container = document.getElementById('canvas-container');
  // choose canvas size from container width (responsive): use 600 or container width
  const size = Math.min(container.clientWidth, 720);
  const cnv = createCanvas(size, size);
  cnv.parent('canvas-container');

  // locate our HTML controls
  angleRange = document.getElementById('angleRange');
  deltaRange = document.getElementById('deltaRange');
  gridRange  = document.getElementById('gridRange');

  angleVal = document.getElementById('angleVal');
  deltaVal = document.getElementById('deltaVal');
  gridVal  = document.getElementById('gridVal');

  resetBtn = document.getElementById('resetBtn');
  randomBtn = document.getElementById('randomBtn');

  // wire events
  angleRange.addEventListener('input', () => {
    angle = Number(angleRange.value);
    angleVal.textContent = angle;
  });
  deltaRange.addEventListener('input', () => {
    delta = Number(deltaRange.value);
    deltaVal.textContent = delta;
  });
  gridRange.addEventListener('input', () => {
    tileSize = Number(gridRange.value);
    gridVal.textContent = tileSize;
    rebuildPolys();
  });

  resetBtn.addEventListener('click', () => {
    angleRange.value = 75;
    deltaRange.value = 10;
    gridRange.value = 100;
    angle = 75; delta = 10; tileSize = 100;
    angleVal.textContent = angle;
    deltaVal.textContent = delta;
    gridVal.textContent = tileSize;
    rebuildPolys();
  });

  randomBtn.addEventListener('click', () => {
    angle = Math.floor(Math.random() * 90);
    delta = Math.floor(Math.random() * 26);
    angleRange.value = angle;
    deltaRange.value = delta;
    angleVal.textContent = angle;
    deltaVal.textContent = delta;
  });

  // default labels
  angleVal.textContent = angle;
  deltaVal.textContent = delta;
  gridVal.textContent = tileSize;

  // build polygons grid
  rebuildPolys();
  pixelDensity(1);
}

function rebuildPolys(){
  polys = [];
  let inc = tileSize;
  // create a grid of polygons covering the canvas, leaving a small margin
  for (let x = 0; x < width; x += inc) {
    for (let y = 0; y < height; y += inc) {
      let poly = new Polygon();
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polys.push(poly);
    }
  }
}

function draw(){
  background(bgColor);
  // draw a subtle vignette or grid background
  noFill();
  strokeWeight(1);
  stroke(255, 10);
  for (let i = 0; i < polys.length; i++) {
    polys[i].hankin();
    polys[i].show();
  }
}
