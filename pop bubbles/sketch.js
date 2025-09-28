let bubbles = [];
const colors = [
  '#a8dadc', // soft cyan
  '#457b9d', // steel blue
  '#1d3557', // deep navy
  '#f4a261', // light orange
  '#e76f51'  // coral red
];

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('canvas-holder');
  for (let i = 0; i < 15; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(30, 60);
    let c = color(random(colors));
    let b = new Bubble(x, y, r, c);
    bubbles.push(b);
  }
  noStroke();
}

function mousePressed() {
  for(let i = bubbles.length - 1; i >= 0; i--) {
    if(bubbles[i].hover(mouseX, mouseY)) {
      bubbles.splice(i, 1);
    }
  }
}

function draw() {
  clear();
  background('#283e51');
  for (let b of bubbles) {
    b.move();
    b.show();
    if(b.hover(mouseX, mouseY)){
      b.changeBrightness(255);
    } else{
      b.changeBrightness(150);
    }
  }
}

class Bubble {
  constructor(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.baseColor = color(c);
    this.brightness = 150;
  }
  
  changeBrightness(bright) {
    this.brightness = bright;
  }
  
  hover(px, py) {
    return dist(px, py, this.x, this.y) < this.r;
  }

  move() {
    this.x += random(-1.5, 1.5);
    this.y += random(-1.5, 1.5);
    this.x = constrain(this.x, this.r, width - this.r);
    this.y = constrain(this.y, this.r, height - this.r);
  }
  
  show() {
    colorMode(RGB);
    let c = this.baseColor;
    fill(red(c), green(c), blue(c), this.brightness * 0.8);
    ellipse(this.x, this.y, this.r * 2);
    stroke(255, this.brightness * 0.5);
    strokeWeight(3);
    ellipse(this.x, this.y, this.r * 2);
    noStroke();
  }
}
