let bubbles = [];
const CANVAS_W = 800;
const CANVAS_H = 500;

function setup() {
  let canvas = createCanvas(CANVAS_W, CANVAS_H);
  canvas.parent('canvas-container');
}

function mousePressed() {
  // Restrict bubble placement to inside the canvas
  if (isMouseInCanvas()) {
    bubbles.push(new Bubble(mouseX, mouseY, random(10, 50)));
  }
}

function mouseDragged() {
  if (isMouseInCanvas()) {
    bubbles.push(new Bubble(mouseX, mouseY, random(10, 50)));
  }
}

function draw() {
  background(17, 27, 44, 132); // Gentle blue fade
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
    if (bubbles[i].isGone()) {
      bubbles.splice(i, 1);
      i--;
    }
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.col = color(random(110,255), random(100,255), random(140,255), random(80,170));
    this.life = 220;
  }
  move() {
    this.x += random(-2.3, 2.3);
    this.y += random(-2.3, 2.3);
    this.life -= 1.05;
  }
  show() {
    noStroke();
    fill(this.col.levels[0], this.col.levels[1], this.col.levels[2], this.life);
    ellipse(this.x, this.y, this.r, this.r);
    // Soft highlight
    fill(255, this.life * 0.18);
    ellipse(this.x - this.r * 0.26, this.y - this.r * 0.26, this.r * 0.35, this.r * 0.2);
  }
  isGone() {
    return this.life < 2;
  }
}

// Helper: restricts bubble placement to canvas area
function isMouseInCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}
