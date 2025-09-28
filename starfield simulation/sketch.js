// sketch.js - main p5 sketch
// Simplified: mouse-only speed control, responsive canvas, one "midnight" palette.

let stars = [];
const STAR_COUNT = 800;       // adjust for performance if needed
let focal;
let centerX, centerY;
let paletteColors = [];

function setup() {
  // attach canvas inside container and be responsive
  const w = Math.max(420, Math.min(window.innerWidth * 0.92, 1100));
  const h = Math.max(380, Math.min(window.innerHeight * 0.72, 800));
  const cnv = createCanvas(w, h);
  cnv.parent('canvas-container');

  pixelDensity(min(2, window.devicePixelRatio || 1));
  noStroke();

  centerX = width / 2;
  centerY = height / 2;
  focal = width / 2;

  // prepare the midnight palette (array of RGB arrays)
  const rawPalette = [
    [255, 255, 255],   // white
    [190, 220, 255],   // cool blue
    [150, 180, 255],   // soft light blue
    [245, 246, 255]    // very light
  ];
  // convert to p5 color objects (avoid calling color() at parse time outside p5)
  paletteColors = rawPalette.map(c => color(c[0], c[1], c[2]));

  // create stars
  recreateStars();

  // update star count label (small UI text)
  const countEl = document.getElementById('starCount');
  if (countEl) countEl.textContent = `${STAR_COUNT} stars`;
}

function recreateStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(new Star(width, height, paletteColors));
  }
}

function draw() {
  // subtle semi-transparent background to produce motion blur / trails
  background(2, 6, 18, 20);

  // mouse-controlled speed (horizontal movement)
  let mx = constrain(mouseX, 0, width);
  let speed = map(mx, 0, width, 0, 50); // 0..50 linear mapping
  // scale down a bit for smoother motion
  const scaledSpeed = speed * 0.05;

  // draw stars
  push();
  for (let i = 0; i < stars.length; i++) {
    stars[i].update(scaledSpeed);
    stars[i].show(centerX, centerY, focal);
  }
  pop();
}

function windowResized() {
  const w = Math.max(420, Math.min(window.innerWidth * 0.92, 1100));
  const h = Math.max(380, Math.min(window.innerHeight * 0.72, 800));
  resizeCanvas(w, h);
  centerX = width / 2;
  centerY = height / 2;
  focal = width / 2;
  recreateStars();
}
