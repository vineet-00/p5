let n = 0;
let c = 4;
let goldenAngle = 137.5;

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  
  drawBackground();
}

function drawBackground() {
  // Soft, warm background gradient
  for (let r = 0; r < width; r += 3) {
    let alpha = map(r, 0, width/2, 8, 0);
    let hue = map(r, 0, width/2, 45, 35); // Warm golden tones
    stroke(hue, 25, 95, alpha);
    strokeWeight(2);
    noFill();
    circle(width/2, height/2, r);
  }
}

function draw() {
  let a = n * goldenAngle;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width / 2;
  let y = r * sin(a) + height / 2;
  
  // Nature-inspired color palette
  let hueBase = (a + r * 0.3) % 360;
  
  // Map to natural color ranges: greens, golds, warm browns
  let hue;
  if (hueBase < 120) {
    hue = map(hueBase, 0, 120, 80, 120); // Green range
  } else if (hueBase < 240) {
    hue = map(hueBase, 120, 240, 35, 60); // Golden/amber range
  } else {
    hue = map(hueBase, 240, 360, 15, 35); // Warm brown/orange range
  }
  
  let saturation = map(sin(n * 0.05), -1, 1, 40, 70);
  let brightness = map(r, 0, width/2, 85, 45);
  let alpha = map(r, 0, width/2, 80, 25);
  
  fill(hue, saturation, brightness, alpha);
  noStroke();
  
  let size = map(sin(n * 0.08), -1, 1, 2.5, 5.5);
  ellipse(x, y, size, size);
  
  // Soft glow effect with natural colors
  if (n % 15 === 0) {
    fill(hue, saturation * 0.4, brightness + 10, 15);
    ellipse(x, y, size * 2.5, size * 2.5);
  }
  
  // Add occasional bright accent points
  if (n % 50 === 0) {
    fill(45, 80, 90, 60); // Warm golden accent
    ellipse(x, y, size * 1.5, size * 1.5);
  }
  
  n++;
  
  if (r > width/2 - 20) {
    n = 0;
    drawBackground();
  }
}

function keyPressed() {
  if (key === ' ') {
    n = 0;
    drawBackground();
  } else if (key === 'g') {
    goldenAngle = goldenAngle === 137.5 ? 137.3 : 137.5;
    n = 0;
    drawBackground();
  }
}
