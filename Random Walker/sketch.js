let pos, pre;
let canvasW = 680;
let canvasH = 480;
let paused = false;
let baseStep = 2;     // same as original 'setMag(2)'
let rareChance = 1;   // threshold r < 1 out of 100
let hueOffset = 0;
let cnv;

function setup(){
  // size based on holder width if present
  const holder = document.getElementById('sketch-holder');
  if (holder) {
    const maxW = Math.min(680, window.innerWidth - 80);
    canvasW = Math.max(320, Math.round(maxW));
    canvasH = Math.round((canvasW * 3) / 4);
  }
  cnv = createCanvas(canvasW, canvasH);
  cnv.parent('sketch-holder');

  pixelDensity(1);
  pos = createVector(width/2, height/2);
  pre = pos.copy();

  background(0);

  colorMode(HSB, 360, 100, 100, 255);
  strokeWeight(2);
  noFill();
  blendMode(ADD);
  frameRate(60);

  const pauseBtn = document.getElementById('pauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  const saveBtn  = document.getElementById('saveBtn');

  if (pauseBtn) pauseBtn.addEventListener('click', togglePause);
  if (resetBtn)  resetBtn.addEventListener('click', resetSketch);
  if (saveBtn)   saveBtn.addEventListener('click', () => saveCanvas(cnv, 'random-walker', 'png'));
}

function draw(){
  if (paused) return;

  hueOffset = (hueOffset + 0.25) % 360;
  const hue = map(pos.x, 0, width, hueOffset, hueOffset + 120) % 360;
  const sat = 85;
  const bri = 95;
  const alpha = 140;

  stroke(hue, sat, bri, alpha);

  line(pos.x, pos.y, pre.x, pre.y);

  pre.set(pos);
  let step = p5.Vector.random2D();
  let r = random(100);

  if (r < rareChance){
    step.mult(random(25, 100)); // rare long leap
  } else {
    step.setMag(baseStep);
  }

  pos.add(step);

  // soft wrap so drawing remains continuous & visible
  if (pos.x < -50) pos.x = width + 50;
  if (pos.x > width + 50) pos.x = -50;
  if (pos.y < -50) pos.y = height + 50;
  if (pos.y > height + 50) pos.y = -50;
}

function togglePause(){
  paused = !paused;
  const btn = document.getElementById('pauseBtn');
  if (btn) btn.textContent = paused ? 'Resume' : 'Pause';
}

function resetSketch(){
  blendMode(BLEND);
  background(0);    // now reliably clears the canvas
  // restore additive glow for drawing
  blendMode(ADD);

  // re-center the walker
  pos.set(width/2, height/2);
  pre.set(pos);
  hueOffset = random(360);
}

function windowResized(){
  const holder = document.getElementById('sketch-holder');
  if (!holder) return;

  const maxW = Math.min(680, window.innerWidth - 80);
  const newW = Math.max(320, Math.round(maxW));
  const newH = Math.round((newW * 3) / 4);

  if (newW !== width) {
    // preserve current drawing by copying to a graphics buffer and scaling
    const pg = createGraphics(newW, newH);
    pg.colorMode(HSB, 360, 100, 100, 255);
    pg.background(18);
    pg.image(get(), 0, 0, newW, newH);

    resizeCanvas(newW, newH);
    image(pg, 0, 0);

    // recenter walker to avoid unexpected off-canvas position
    pos.set(width/2, height/2);
    pre.set(pos);
  }
}
