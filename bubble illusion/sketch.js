let bubbles = [];

function setup() {
  const canvas = createCanvas(500, 400);
  canvas.parent('canvas-container');
  for (let i = 0; i < 500; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 40);
    let c = color(random(100, 255), random(100, 255), random(100, 255), 50);
    bubbles[i] = new Bubble(x, y, r, c);
  }
}

function draw() {
  background(18, 19, 26);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}

class Bubble {
  constructor(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c; // store color for consistent fill
  }

  move() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  show() {
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, this.r, this.r);
  }
}
