let circleX = 100;

function setup() {
  let canvas = createCanvas(420, 420);
  canvas.parent('canvas-container');
  noStroke();
}

function mousePressed() {
  circleX = -50; // Animate from slightly off-canvas for drama
}

function draw() {
  // Deep blue-violet gradient background
  setGradient(0, 0, width, height, color('#1a2053'), color('#10ffe0'), 1);

  // Artistic glow for the moving circle
  for(let r = 90; r > 35; r -= 10){
    fill(180, 100, 100, map(r,90,35,5,20));
    ellipse(circleX, 210, r, r);
  }

  // Pop circle
  fill('#fafffd');
  ellipse(circleX, 210, 65, 65);

  // Luminous rim
  for(let r = 68; r <= 80; r+=3) {
    fill(30, 0, 100, map(r,68,80,7,1));
    ellipse(circleX,210,r);
  }

  circleX = circleX + 2;
}

// Artistic gradient background for p5.js
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}
