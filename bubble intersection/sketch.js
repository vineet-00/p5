let bubble1, bubble2;
let backgroundColor;
let targetColor;
let currentColor;

function setup() {
  const canvas = createCanvas(600, 400);
  canvas.parent('canvas-container');
  bubble1 = new Bubble(200, 200, 50);
  bubble2 = new Bubble(300, 200, 100);

  backgroundColor = color(18, 19, 26);
  targetColor = backgroundColor;
  currentColor = backgroundColor;
}

function draw() {
  // Change background color smoothly based on intersection
  if (bubble1.intersect(bubble2)) {
    targetColor = color(200, 0, 100);
  } else {
    targetColor = color(18, 19, 26);
  }
  currentColor = lerpColor(currentColor, targetColor, 0.1);
  background(currentColor);

  bubble1.show();
  bubble2.x = mouseX;
  bubble2.y = mouseY;
  bubble2.show();
}

class Bubble {
  constructor(x, y, r = 50) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 180;
  }

  intersect(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
  }

  show() {
    stroke(255);
    strokeWeight(4);
    fill(this.brightness, 125);
    ellipse(this.x, this.y, this.r * 2);
  }
}
