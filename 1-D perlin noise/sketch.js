let inc = 0.02;      // noise increment (detail)
let start = 0;       // moving offset
let amp = 1.0;       // amplitude multiplier (vertical scale)
let paused = false;
let showSample = true;

const parentId = 'canvas-container';
let canvasSize = 400;

function setup() {
  // responsive canvas inside container
  const parent = document.getElementById(parentId);
  canvasSize = Math.max(320, Math.min(parent.clientWidth, window.innerHeight - 220));
  const c = createCanvas(canvasSize, canvasSize);
  c.parent(parentId);

  // default styling
  strokeWeight(1.5);
  noFill();

  // setup DOM controls
  setupControls();

  // initial background
  background(28, 36, 48);
}

function windowResized() {
  const parent = document.getElementById(parentId);
  const size = Math.max(320, Math.min(parent.clientWidth, window.innerHeight - 220));
  resizeCanvas(size, size);
  canvasSize = size;
  // redraw background clean when resized
  background(28, 36, 48);
}

function setupControls() {
  // run/pause
  const runPauseBtn = document.getElementById('runPauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  const fpsEl = document.getElementById('fps');
  const incEl = document.getElementById('inc');
  const ampEl = document.getElementById('amp');
  const showSampleEl = document.getElementById('showSample');

  runPauseBtn.addEventListener('click', () => {
    paused = !paused;
    if (paused) {
      noLoop();
      runPauseBtn.textContent = 'Run';
      runPauseBtn.classList.remove('primary');
    } else {
      loop();
      runPauseBtn.textContent = 'Pause';
      runPauseBtn.classList.add('primary');
    }
  });

  resetBtn.addEventListener('click', () => {
    // reset start to 0 for a consistent view
    start = 0;
    background(28, 36, 48);
  });

  fpsEl.addEventListener('input', (e) => {
    const v = Number(e.target.value) || 30;
    frameRate(v);
  });
  // initialize fps
  frameRate(Number(fpsEl.value) || 30);

  incEl.addEventListener('input', (e) => {
    inc = Number(e.target.value) || 0.02;
  });

  ampEl.addEventListener('input', (e) => {
    amp = Number(e.target.value) || 1;
  });

  showSampleEl.addEventListener('change', (e) => {
    showSample = !!e.target.checked;
  });
}

function draw() {
  background(28, 36, 48);

  // draw a soft horizontal guide
  stroke(255, 255, 255, 6);
  strokeWeight(1);
  line(0, height / 2, width, height / 2);

  // draw Perlin curve
  beginShape();
  let xoff = start;
  for (let x = 0; x < width; x++) {
    stroke(255, 230, 150); // warm wave color
    strokeWeight(1.6);

    const y = noise(xoff) * height * amp;
    vertex(x, y);

    xoff += inc;
  }
  endShape();

  // optional moving sample dot that demonstrates noise sampling (like your commented code)
  if (showSample) {
    // sample at a position that moves across the noise domain for visual interest
    const sampleXoff = start + 100; // offset sample from the main curve
    const sampleIndex = Math.floor(map(noise(sampleXoff), 0, 1, 0, width - 1));
    const sampleY = noise(sampleXoff) * height * amp;

    fill(125, 211, 252);
    noStroke();
    ellipse(sampleIndex, sampleY, Math.max(6, width * 0.012), Math.max(6, width * 0.012));
  }

  // advance the time offset (keeps core animation behavior)
  start += inc * 0.5; // modest time progression; keeps motion gentle
}
