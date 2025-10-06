let population;
let count = 0;
let lifespan = 200;
let target;
let rx = 100;
let ry = 150;
let rw = 200;
let rh = 10;
let generation = 0;
let paused = false;

function setup() {
  // canvas size chosen so layout fits standard desktop view without scrolling
  const canvasW = 480;
  const canvasH = 320;
  const canvas = createCanvas(canvasW, canvasH);
  canvas.parent('canvas-holder');

  // crisp rendering on high-DPI displays
  pixelDensity(1);

  population = new Population();
  target = createVector(width / 2, 50);

  // UI wiring
  select('#btn-toggle').mousePressed(togglePause);
  select('#btn-reset').mousePressed(resetSim);

  updateStats();
}

function draw() {
  // subtle star-ish background tone
  background(7, 25, 36);

  // draw subtle grid or depth
  push();
  noFill();
  stroke(255, 255, 255, 4);
  for (let i = 0; i < width; i += 40) line(i, 0, i, height);
  pop();

  // run population and increment counter if not paused
  population.run();

  // draw obstacle
  noStroke();
  fill(18, 58, 62);
  rect(rx, ry, rw, rh, 3);

  // draw target (glow)
  push();
  translate(target.x, target.y);
  for (let i = 12; i > 0; i--) {
    fill(231, 185, 139, i * 6);
    ellipse(0, 0, i * 2.6, i * 2.6);
  }
  fill(255, 245, 230);
  ellipse(0, 0, 8, 8);
  pop();

  if (!paused) {
    count++;
    if (count == lifespan) {
      population.evaluate();
      population.selection();
      count = 0;
      generation++;
      updateStats();
    }
  }

  // draw small HUD inside canvas (optional)
  push();
  noStroke();
  fill(255, 255, 255, 12);
  rect(8, 8, 120, 42, 8);
  fill(200);
  textSize(11);
  fill(160);
  text(`Gen: ${generation}`, 16, 24);
  text(`Frame: ${count}/${lifespan}`, 16, 40);
  pop();
}

function togglePause() {
  paused = !paused;
  select('#btn-toggle').html(paused ? 'Resume' : 'Pause');
  if (!paused) loop();
  else noLoop();
}

function resetSim() {
  population = new Population();
  count = 0;
  generation = 0;
  paused = false;
  select('#btn-toggle').html('Pause');
  loop();
  updateStats();
}

function updateStats() {
  select('#stat-gen').html(generation);
  select('#stat-pop').html(population.popsize);
  select('#stat-life').html(lifespan);
  select('#stat-best').html(isFinite(population.best) ? nf(population.best, 1, 2) : '—');
}
