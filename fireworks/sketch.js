let fireworks = [];
let gravity;

function setup() {
  let canvas = createCanvas(600, 500);
  canvas.parent('canvas-container');
  gravity = createVector(0, 0.2);
  strokeWeight(4);
}

function draw() {
  background(10, 10, 20, 120); // Dark background with fade effect
  
  // Randomly spawn fireworks
  if (random(1) < 0.04) {
    fireworks.push(new Firework());
  }
  
  // Update and display fireworks
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}

// Click to launch firework
function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    fireworks.push(new Firework(mouseX));
  }
}
