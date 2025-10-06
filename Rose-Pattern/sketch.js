let n = 5;
let d = 8;

let sliderN, sliderD;
let valN, valD;
let cnv, canvasContainer;

function setup() {
  canvasContainer = document.getElementById('canvas-container');
  // initial size: we'll compute from container's current size
  const rect = canvasContainer.getBoundingClientRect();

  // create p5 canvas and attach to container
  cnv = createCanvas(Math.max(200, Math.floor(rect.width)), Math.max(200, Math.floor(rect.height)));
  cnv.parent('canvas-container');

  // high-DPI handling
  pixelDensity(min(2, displayDensity()));

  sliderN = document.getElementById('sliderN');
  sliderD = document.getElementById('sliderD');
  valN = document.getElementById('valN');
  valD = document.getElementById('valD');

  // update display values when sliders move
  sliderN.addEventListener('input', () => {
    valN.textContent = sliderN.value;
  });
  sliderD.addEventListener('input', () => {
    valD.textContent = sliderD.value;
  });

  // initialize displayed values
  valN.textContent = sliderN.value;
  valD.textContent = sliderD.value;

  // make sure we resize canvas if the window is resized
  window.addEventListener('resize', handleResize);
  // initial resize to fit nicely
  handleResize();
}

function handleResize() {
  // ensure the canvas fills the panel while leaving space for caption
  const rect = canvasContainer.getBoundingClientRect();
  // choose a square drawing area that fits comfortably inside container
  const w = Math.max(200, Math.floor(rect.width));
  const h = Math.max(200, Math.floor(rect.height));
  const size = Math.min(w, h);
  resizeCanvas(size, size);
}

function draw() {
  // read sliders (keep integers)
  n = parseInt(sliderN.value, 10);
  d = parseInt(sliderD.value, 10);
  const k = n / d;

  // palette
  const bg = color('#071528');    // deep ink
  const paper = color('#fff4e6'); // cream-ish strokes
  const accent = color('#ff6f3c');

  // backdrop 
  background(12, 20, 30); // very dark subtle

  // draw a subtle vignette / "page" behind the rose (keeps comic-book feel)
  noStroke();
  push();
  translate(width / 2, height / 2);
  fill(8, 18, 28, 160);
  ellipse(0, 0, width * 0.98, height * 0.98);
  pop();

  // center and draw rose
  translate(width / 2, height / 2);

  // radius scale so the rose fits neatly (leave margin)
  const R = min(width, height) * 0.45;

  // stroke color depends on ratio to add subtle visual interest
  let t = constrain(k / 4.0, 0, 1);
  // create a color blend: cream <-> accent depending on k
  const c = lerpColor(paper, accent, t);

  stroke(c);
  noFill();
  strokeWeight(1.6);

  beginShape();
  // iterate angle to trace smooth curve; step depends on size for performance
  const step = 0.01;
  for (let a = 0; a < TWO_PI * d; a += step) {
    // the classic rose: r = R * cos(k * a)
    let r = R * cos(k * a);
    // polar to cartesian
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);

  // add a thin "ink" outline for velvet edge
  stroke(6, 12, 18, 120);
  strokeWeight(0.6);
  noFill();
  beginShape();
  for (let a = 0; a < TWO_PI * d; a += step * 2.0) {
    let r = R * cos(k * a) * 0.995;
    vertex(r * cos(a), r * sin(a));
  }
  endShape(CLOSE);
}
