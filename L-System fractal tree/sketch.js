let axiom = "F";
let sentence = axiom;
let rules = [];
let len = 100;
let angle;
let canvas;

rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
};

function generate() {
  len *= 0.5;
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
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
  background(34, 39, 46);
  resetMatrix();
  stroke(255, 180);
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

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent('canvas-container');
  angle = radians(25);
  createP(axiom).style('color', 'white');
  displaySentence();
  turtle();
  const genBtn = document.getElementById('generate-btn');
  genBtn.addEventListener('click', generate);
}
