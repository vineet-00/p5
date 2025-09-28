let d = [];

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('canvas-holder');
  for (let i = 0; i < 500; i++) {
    d[i] = new Rain();
  }
}

function draw() {
  // Soft gradient background from dark blue to light gray
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(15, 23, 42), color(71, 85, 105), inter);
    stroke(c);
    line(0, y, width, y);
  }
  
  for (let i = 0; i < 500; i++) {
    d[i].drop();
    d[i].show();
  }
}
