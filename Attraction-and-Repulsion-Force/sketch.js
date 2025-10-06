let attractors = [];
let particles = [];
let maxParticles = 120;
let canvas;
let showTrails = true;
const spawnPerFrame = 1;

function setup() {
  const container = document.getElementById('canvas-container');
  canvas = createCanvas(container.clientWidth, container.clientHeight);
  canvas.parent('canvas-container');

  document.getElementById('clear-attractors').addEventListener('click', () => {
    attractors = [];
  });
  document.getElementById('clear-particles').addEventListener('click', () => {
    particles = [];
  });
  document.getElementById('toggle-trails').addEventListener('click', () => {
    showTrails = !showTrails;
  });
  document.getElementById('burst').addEventListener('click', () => {
    for (let i = 0; i < 30; i++) {
      particles.push(new Particle(random(width), random(height)));
    }
  });

  background(12, 16, 34);
  strokeCap(ROUND);
  noFill();
}

function windowResized() {
  const container = document.getElementById('canvas-container');
  const w = container.clientWidth;
  const h = container.clientHeight;
  resizeCanvas(w, h);
  for (let p of particles) {
    p.prev.x = p.pos.x;
    p.prev.y = p.pos.y;
  }
}

function mousePressed() {
  if (mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height) {
    attractors.push(createVector(mouseX, mouseY));
  }
}

function draw() {
  if (showTrails) {
    noStroke();
    fill(8, 12, 26, 20);
    rect(0, 0, width, height);
  } else {
    background(8, 12, 26);
  }

  for (let s = 0; s < spawnPerFrame; s++) {
    particles.push(new Particle(random(width), random(height)));
  }

  if (particles.length > maxParticles) {
    particles.splice(0, particles.length - maxParticles);
  }

  // draw attractors as a small neon point only (removed halo/ellipse)
  for (let i = 0; i < attractors.length; i++) {
    push();
    noStroke();
    fill(86, 255, 138, 220); // neon green dot
    ellipse(attractors[i].x, attractors[i].y, 10, 10);
    pop();
  }

  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    for (let j = 0; j < attractors.length; j++) {
      particle.attracted(attractors[j]);
    }
    particle.update();
    particle.show();
  }
}
