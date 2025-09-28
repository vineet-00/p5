// sketch.js
// L-System Fractal Tree with angle slider and Reset (no Save button)

let axiom = "F";
let sentence = axiom;
let rules = [];
let len;
let initialLen = 120;
let angle;
let canvas;
const containerId = 'canvas-container';

rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
};

function generate() {
  // same algorithm: shorten length and rewrite sentence
  len *= 0.5;
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current === rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  displaySentence();
  turtle();
}

function turtle() {
  // dark background and soft stroke color
  background(8, 14, 24);
  resetMatrix();
  stroke(160, 220, 180, 220); // soft green-ish stroke (RGB interpreted)
  strokeWeight(1.4);
  translate(width / 2, height);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    if (current === "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current === "+") {
      rotate(angle);
    } else if (current === "-") {
      rotate(-angle);
    } else if (current === "[") {
      push();
    } else if (current === "]") {
      pop();
    }
  }
}

function displaySentence() {
  const sentElem = document.getElementById('sentence-text');
  sentElem.textContent = sentence;
}

function resetToAxiom() {
  sentence = axiom;
  len = initialLen;
  displaySentence();
  turtle();
}

function computeCanvasSize() {
  const holder = document.getElementById(containerId);
  if (!holder) return { w: 420, h: 420 };
  const rect = holder.getBoundingClientRect();
  const side = Math.floor(Math.min(rect.width, rect.height));
  return { w: Math.max(300, side), h: Math.max(300, side) };
}

function setup() {
  // initial values
  len = initialLen;
  angle = radians(25);

  // create responsive canvas that fits the container
  const size = computeCanvasSize();
  canvas = createCanvas(size.w, size.h);
  canvas.parent(containerId);

  // initial draw
  displaySentence();
  turtle();

  // UI wiring
  const genBtn = document.getElementById('generate-btn');
  const resetBtn = document.getElementById('reset-btn');
  const angleSlider = document.getElementById('angle-slider');
  const angleValue = document.getElementById('angle-value');

  if (genBtn)   genBtn.addEventListener('click', generate);
  if (resetBtn) resetBtn.addEventListener('click', resetToAxiom);

  if (angleSlider) {
    angleSlider.addEventListener('input', (e) => {
      const deg = Number(e.target.value);
      angle = radians(deg);
      if (angleValue) angleValue.textContent = `${deg}°`;
      // redraw immediately so user sees effect
      turtle();
    });
  }
}

function windowResized() {
  const size = computeCanvasSize();
  if (size.w !== width || size.h !== height) {
    const pg = createGraphics(size.w, size.h);
    pg.background(8, 14, 24);
    pg.image(get(), 0, 0, size.w, size.h);

    resizeCanvas(size.w, size.h);
    image(pg, 0, 0);
    turtle();
  }
}
