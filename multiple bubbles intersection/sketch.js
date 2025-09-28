let bubbles = [];
let selectedBubble = null;
let offsetX, offsetY;

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('canvas-container');
  for(let i = 0; i <= 10; i++){
    let x = random(width);
    let y = random(height);
    let r = random(20, 50);
    bubbles.push(new Bubble(x, y, r));
  }
}

function draw() {
  background(10, 30, 50, 220);
  
  for (let b of bubbles) {
    b.move();
  }

  for (let b of bubbles) {
    let overlapping = false;
    for (let other of bubbles) {
      if (b !== other && b.intersect(other)) {
        overlapping = true;
        break;
      }
    }
    b.changeColor(overlapping ? 255 : 50);
  }

  for (let b of bubbles) {
    b.show();
  }
}

function mousePressed() {
  for (let b of bubbles) {
    if (b.contains(mouseX, mouseY)) {
      selectedBubble = b;
      offsetX = b.x - mouseX;
      offsetY = b.y - mouseY;
      break;
    }
  }
}

function mouseDragged() {
  if (selectedBubble) {
    selectedBubble.x = mouseX + offsetX;
    selectedBubble.y = mouseY + offsetY;
  }
}

function mouseReleased() {
  selectedBubble = null;
}

class Bubble {
  constructor(x, y, r = 50) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 50;
    this.colorBase = color(0, 188, 212);
  }
  
  intersect(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
  }
  
  contains(px, py) {
    return dist(px, py, this.x, this.y) < this.r;
  }
  
  changeColor(bright) {
    this.brightness = bright;
  }
  
  move() {
    if (selectedBubble !== this) {
      this.x += random(-0.8, 0.8);
      this.y += random(-0.8, 0.8);
      if(this.x < -this.r) this.x = width + this.r;
      if(this.x > width + this.r) this.x = -this.r;
      if(this.y < -this.r) this.y = height + this.r;
      if(this.y > height + this.r) this.y = -this.r;
    }
  }
  
  show() {
    stroke(50, this.brightness * 0.7, this.brightness * 0.9);
    strokeWeight(3);
    let c = color(hue(this.colorBase), saturation(this.colorBase), this.brightness);
    fill(c.levels[0], c.levels[1], c.levels[2], this.brightness * 0.4);
    ellipse(this.x, this.y, this.r * 2);

    noFill();
    for (let i = 5; i < this.r; i += 6) {
      stroke(c.levels[0], c.levels[1], c.levels[2], map(i, 5, this.r, 20, 0));
      ellipse(this.x, this.y, this.r * 2 - i);
    }
  }
}
