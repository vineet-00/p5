let bubbles = [];

function setup() {
  const canvas = createCanvas(600, 400);
  canvas.parent('canvas-container');
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 60);
    let b = new Bubble(x, y, r);
    bubbles.push(b);
  }
}

function draw() {
  background(18, 19, 26); // dark background matching css gradient
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
    bubbles[i].hover(mouseX, mouseY);
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }

  hover(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      // smoothly increase brightness on hover with lerp
      this.brightness = lerp(this.brightness, 255, 0.1);
    } else {
      // smoothly decrease brightness when not hovered
      this.brightness = lerp(this.brightness, 0, 0.05);
    }
  }

  move() {
    this.x += random(-1.5, 1.5);
    this.y += random(-1.5, 1.5);
    // constrain to canvas edges with padding for radius
    this.x = constrain(this.x, this.r, width - this.r);
    this.y = constrain(this.y, this.r, height - this.r);
  }

  show() {
    stroke(255);
    strokeWeight(4);
    // fill with brightness and slight alpha for glow effect
    fill(this.brightness, 130);
    ellipse(this.x, this.y, this.r * 2);

    // additional glow highlight on hover
    if (this.brightness > 10) {
      noFill();
      stroke(255, this.brightness * 0.6);
      strokeWeight(8);
      ellipse(this.x, this.y, this.r * 2 + 12);
    }
  }
}
