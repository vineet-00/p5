
let bubbles = [];

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 60);
    let b = new Bubble(x, y, r);
    bubbles.push(b);
  }
}

function mousePressed() {
  // for (let i = 0; i < bubbles.length; i++) {
  //   bubbles[i].clicked(mouseX, mouseY);
  // }
  for(let i= bubbles.length-1;i>=0;i--){
    if(bubbles[i].hover(mouseX, mouseY)){
    bubbles.splice(i,1);
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
    if(bubbles[i].hover(mouseX, mouseY)){
      bubbles[i].changeColor(255);
    }else{
      bubbles[i].changeColor(0);
    }
    
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }
  
  changeColor(bright){
    this.brightness = bright;
  }
  
  hover(px,py){
    let d = dist(px, py, this.x, this.y);
    if (d > this.r) {
      return false;
    }else{
      return true;
    }
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      this.brightness = 255;
    }
  }

  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  show() {
    stroke(255);
    strokeWeight(4);
    fill(this.brightness, 125);
    ellipse(this.x, this.y, this.r * 2);
  }
}
