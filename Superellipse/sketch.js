let cnv;
let n = 2.0;      // exponent
let a = 100;      // scale X
let b = 100;      // scale Y
let step = 0.1;   // angle increment
let anim = false;
let rotating = false;
let angleOffset = 0;

let mic = null;
let soundReactive = false;

const bgColor = '#071226';
const strokeColor = '#7dd3fc';

function setup() {
  // attach canvas to container so layout is controlled by CSS
  const container = document.getElementById('canvas-container');
  const size = Math.min(Math.max(container.clientWidth, 300), 800);
  cnv = createCanvas(size, size);
  cnv.parent('canvas-container');
  pixelDensity(1);

  // UI refs
  const nRange = document.getElementById('nRange');
  const aRange = document.getElementById('aRange');
  const bRange = document.getElementById('bRange');
  const stepRange = document.getElementById('stepRange');

  const nVal = document.getElementById('nVal');
  const aVal = document.getElementById('aVal');
  const bVal = document.getElementById('bVal');
  const stepVal = document.getElementById('stepVal');

  const animateBtn = document.getElementById('animateBtn');
  const rotateBtn = document.getElementById('rotateBtn');
  const soundBtn = document.getElementById('soundBtn');
  const saveBtn = document.getElementById('saveBtn');

  // Presets
  document.querySelectorAll('.presets button').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseFloat(btn.getAttribute('data-n'));
      nRange.value = val;
      n = val;
      nVal.textContent = n.toFixed(2);
    });
  });

  // ranges
  nRange.addEventListener('input', () => { n = parseFloat(nRange.value); nVal.textContent = n.toFixed(2); });
  aRange.addEventListener('input', () => { a = parseInt(aRange.value); aVal.textContent = a; });
  bRange.addEventListener('input', () => { b = parseInt(bRange.value); bVal.textContent = b; });
  stepRange.addEventListener('input', () => { step = parseFloat(stepRange.value); stepVal.textContent = step.toFixed(2); });

  // buttons
  animateBtn.addEventListener('click', () => {
    anim = !anim;
    animateBtn.textContent = 'Animate: ' + (anim ? 'On' : 'Off');
  });

  rotateBtn.addEventListener('click', () => {
    rotating = !rotating;
    rotateBtn.textContent = 'Rotate: ' + (rotating ? 'On' : 'Off');
  });

  soundBtn.addEventListener('click', async () => {
    if (!soundReactive) {
      // try to start microphone (user gesture required)
      try {
        mic = new p5.AudioIn();
        await mic.start();
        soundReactive = true;
        soundBtn.textContent = 'Sound Reactive: On';
        soundBtn.classList.remove('ghost');
      } catch (e) {
        console.warn('Mic not available or permission denied', e);
        alert('Microphone unavailable or permission denied.');
      }
    } else {
      // stop mic
      if (mic) {
        try { mic.stop(); } catch (e) {}
        mic = null;
      }
      soundReactive = false;
      soundBtn.textContent = 'Sound Reactive: Off';
      soundBtn.classList.add('ghost');
    }
  });

  saveBtn.addEventListener('click', () => {
    // save canvas as png
    saveCanvas(cnv, 'superellipse', 'png');
  });
}

function sgn(val) {
  if (val > 0) return 1;
  if (val < 0) return -1;
  return 0;
}

function draw() {
  background(bgColor);
  translate(width / 2, height / 2);

  // animate exponent slightly if requested
  if (anim) {
    n = 1.5 + 1.5 * sin(frameCount * 0.02);
    // clamp into slider range visually (UI control won't move)
  }

  // sound-reactive modulation
  if (soundReactive && mic) {
    const lvl = mic.getLevel();
    // map loudness to scale or exponent subtly
    const factor = map(lvl, 0, 0.2, 0.9, 1.8, true);
    // apply to 'a' & 'b' for pulsating effect
    const currentA = a * factor;
    const currentB = b * factor;
    renderSuperellipse(currentA, currentB, n, step);
  } else {
    renderSuperellipse(a, b, n, step);
  }

  // rotation
  if (rotating) {
    angleOffset += 0.01;
    push();
    rotate(angleOffset);
    pop();
  }
}

function renderSuperellipse(A, B, N, stepSize) {
  stroke(strokeColor);
  strokeWeight(2);
  noFill();

  beginShape();
  // We'll rotate the whole shape by angleOffset if rotating, for pleasant motion
  push();
  if (rotating) rotate(angleOffset);

  for (let theta = 0; theta < TWO_PI + 0.0001; theta += stepSize) {
    // original code used na = 2 / n
    const na = 2.0 / N;
    const cx = Math.cos(theta);
    const sy = Math.sin(theta);

    // careful: use absolute then restore sign
    const x = Math.pow(Math.abs(cx), na) * A * sgn(cx);
    const y = Math.pow(Math.abs(sy), na) * B * sgn(sy);

    vertex(x, y);
  }
  endShape(CLOSE);

  pop();
}
