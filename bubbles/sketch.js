let bubbles = [];

function setup() {
  const canvas = createCanvas(600, 400);
  canvas.parent('canvas-container');
  for (let i = 0; i <= 5; i++) {
    let x = 40 + 100 * i;
    bubbles.push(new Bubble(x, 200, 32));
  }
}

function draw() {
  // Water-like gradient background
  setGradientBackground();
  for (let bubble of bubbles) {
    bubble.move();
    bubble.show();
  }
}

// Adds a new bubble where the user clicks
function mousePressed() {
  if (mouseY >= 0 && mouseY < height) {
    let r = random(16, 38);
    bubbles.push(new Bubble(mouseX, mouseY, r));
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.alpha = random(140, 220); // bubble transparency
    this.offset = random(TWO_PI);
  }
  move() {
    this.x += random(-1.5, 1.5);
    this.y += random(-2, -0.5); // bubbles drift gently upward
    // Wiggle effect
    this.x += sin(frameCount * 0.03 + this.offset) * 0.8;
    // Fade out and remove if out of canvas
    if (this.y + this.r < 0) {
      this.respawn();
    }
  }
  show() {
    noFill();
    stroke(255, this.alpha);
    strokeWeight(2.5);
    ellipse(this.x, this.y, this.r, this.r);
    // Inner highlight for realism
    noStroke();
    fill(255, 60);
    ellipse(this.x - this.r * 0.23, this.y - this.r * 0.19, this.r * 0.38, this.r * 0.29);
  }
  respawn() {
    this.x = random(width);
    this.y = height + this.r;
    this.r = random(16, 38);
    this.alpha = random(140, 220);
    this.offset = random(TWO_PI);
  }
}

function setGradientBackground() {
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(57, 160, 237), color(19, 76, 116), inter);
    stroke(c);
    line(0, i, width, i);
  }
}
