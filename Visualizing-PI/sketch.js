let piStrings;
let digits = [];
let idx = 0;
let playing = true;
let fadeMode = false;
let canvasSize;
let baseRadius;

function preload(){
  piStrings = loadStrings('pi-1million.txt');
}

function setup(){
  const container = document.getElementById('canvas-container');
  canvasSize = Math.min(container.clientWidth - 24, container.clientHeight - 24);
  if (canvasSize < 200) canvasSize = 200; 

  const cnv = createCanvas(canvasSize, canvasSize);
  cnv.parent('canvas-container');

  colorMode(HSB, 360, 100, 100, 1);
  angleMode(RADIANS);
  noFill();
  strokeWeight(1);

  // parse digits from the preloaded file
  if (piStrings && piStrings.length > 0){
    const sdigits = piStrings[0].split('');
    digits = sdigits.map(c => parseInt(c, 10)).filter(n => !isNaN(n));
  }

  baseRadius = width * 0.45;

  // draw the circle border once so it's visible from start
  background(40, 8, 98); // light paper-y background in HSB
  stroke(210, 20, 12);
  strokeWeight(2);
  ellipse(width/2, height/2, baseRadius*2, baseRadius*2);
  strokeWeight(1);

  // expose initial status
  updateStatus();
}

function draw(){
  // overlay fading rectangle when fadeMode is true to slowly fade older strokes
  if (fadeMode){
    push();
    noStroke();
    // gentle paper-colored fade
    fill(40, 8, 98, 0.02);
    rect(0,0,width,height);
    pop();
  }

  if (!playing) return;

  // steps per frame determined by speed input
  const speedEl = document.getElementById('speed');
  const steps = speedEl ? int(speedEl.value) : 6;

  for (let s=0; s<steps; s++){
    if (!digits || digits.length < 2) return;

    const d1 = digits[idx % digits.length];
    const d2 = digits[(idx+1) % digits.length];

    // map digits to angles around circle with a little jitter
    const sector = TWO_PI / 10;
    const a1 = map(d1, 0, 9, 0, TWO_PI) + random(-sector*0.35, sector*0.35);
    const a2 = map(d2, 0, 9, 0, TWO_PI) + random(-sector*0.35, sector*0.35);

    const x1 = width/2 + baseRadius * cos(a1);
    const y1 = height/2 + baseRadius * sin(a1);
    const x2 = width/2 + baseRadius * cos(a2);
    const y2 = height/2 + baseRadius * sin(a2);

    // color by digit (hue) and alpha to make dense areas darker
    const hue = map(d1, 0, 9, 200, 20); // bluish -> warm mapping
    stroke(hue, 80, 30, 0.18);

    line(x1,y1,x2,y2);

    idx++;
    if (idx >= digits.length - 1) idx = 0; // loop
  }

  // redraw circle border so it stays crisp above lines
  push();
  stroke(210, 20, 12);
  strokeWeight(2);
  noFill();
  ellipse(width/2, height/2, baseRadius*2, baseRadius*2);
  pop();

  updateStatus();
}

function windowResized(){
  const container = document.getElementById('canvas-container');
  if (!container) return;
  canvasSize = Math.min(container.clientWidth - 24, container.clientHeight - 24);
  if (canvasSize < 200) canvasSize = 200;
  resizeCanvas(canvasSize, canvasSize);
  baseRadius = width * 0.45;

  // redraw background and circle so layout remains neat
  background(40, 8, 98);
  stroke(210, 20, 12);
  strokeWeight(2);
  ellipse(width/2, height/2, baseRadius*2, baseRadius*2);
}

// -------- DOM control functions (called from HTML) --------
function pauseToggle(){
  playing = !playing;
  const b = document.getElementById('btn-play');
  if (b) b.textContent = playing ? 'Pause' : 'Play';
}

function resetSketch(){
  idx = 0;
  clear();
  background(40, 8, 98);
  stroke(210, 20, 12);
  strokeWeight(2);
  ellipse(width/2, height/2, baseRadius*2, baseRadius*2);
}

function toggleFade(){
  fadeMode = !fadeMode;
  const b = document.getElementById('btn-fade');
  if (b) b.textContent = 'Fade: ' + (fadeMode ? 'On' : 'Off');
}

function updateStatus(){
  const sIdx = document.getElementById('status-index');
  const sDigit = document.getElementById('status-digit');
  if (sIdx) sIdx.textContent = idx;
  if (sDigit) sDigit.textContent = (digits && digits.length) ? digits[idx % digits.length] : '-';
}