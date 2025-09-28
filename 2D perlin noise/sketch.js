let inc = 0.02;
let paused = false;
let parentId = 'canvas-container';
let canvasSize = 400;

function setup() {
  const parent = document.getElementById(parentId);
  canvasSize = Math.max(320, Math.min(parent.clientWidth, window.innerHeight - 220));
  const c = createCanvas(canvasSize, canvasSize);
  c.parent(parentId);
  pixelDensity(1);

  setupControls();
  background(28, 36, 48);
}

function windowResized() {
  const parent = document.getElementById(parentId);
  const size = Math.max(320, Math.min(parent.clientWidth, window.innerHeight - 220));
  resizeCanvas(size, size);
  canvasSize = size;
  background(28, 36, 48);
}

function setupControls() {
  const runPauseBtn = document.getElementById('runPauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  const fpsEl = document.getElementById('fps');
  const incEl = document.getElementById('inc');

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
    background(28, 36, 48);
  });

  fpsEl.addEventListener('input', (e) => frameRate(Number(e.target.value) || 30));
  frameRate(Number(fpsEl.value) || 30);

  incEl.addEventListener('input', (e) => inc = Number(e.target.value) || 0.02);
}

function draw() {
  loadPixels();
  let yoff = frameCount * inc * 0.5; // gently animate over time
  for (let y = 0; y < height; y++) {
    let xoff = 0;
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let bright = noise(xoff, yoff) * 255;
      pixels[index + 0] = bright;
      pixels[index + 1] = bright;
      pixels[index + 2] = bright;
      pixels[index + 3] = 255;
      xoff += inc;
    }
    yoff += inc;
  }
  updatePixels();
}
