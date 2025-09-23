let x = 0.01;
let y = 0;
let z = 0;

let a = 10;
let b = 28;
let c = 8.0 / 3.0;

let points = [];

function setup() {
  const canvas = createCanvas(800, 600, WEBGL);
  canvas.parent('canvas-container');
  colorMode(HSB);
  background(0);
  strokeWeight(2);
}


function draw() {
  // Use semi-transparent background to create a fading trail effect
  background(0, 20);

  let dt = 0.01;
  let dx = (a * (y - x)) * dt;
  let dy = (x * (b - z) - y) * dt;
  let dz = (x * y - c * z) * dt;

  x += dx;
  y += dy;
  z += dz;

  points.push(new p5.Vector(x, y, z));
  if (points.length > 4000) points.shift(); // Limit points for performance

  // Move the whole attractor slightly forward to keep it fully visible
  translate(0, 40, 0);

  // Controlled camera movement based on mouse within tighter bounds
  let camX = map(mouseX, 0, width, -200, 200);
  let camY = map(mouseY, 0, height, -200, 200);
  camera(camX, camY, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);

  scale(5); // Scale down slightly to fit canvas nicely

  noFill();

  let hu = 0;
  beginShape();
  for (let v of points) {
    stroke(hu, 255, 255);
    vertex(v.x, v.y, v.z);

    hu++;
    if (hu > 255) {
      hu = 0;
    }
  }
  endShape();
}
