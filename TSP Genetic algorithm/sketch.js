// Minimal sketch glue (p5.js)
// Simple defaults; Pause and Reset control the run.

let ga;
const POP = 300;
const CITIES = 15;
const MUT = 0.01;

let pauseBtn, resetBtn;
let genEl, bestEl;

function setup() {
  const holder = document.getElementById('sketch-holder');
  const cnv = createCanvas(700, 520);
  cnv.parent(holder);

  pauseBtn = document.getElementById('pauseBtn');
  resetBtn = document.getElementById('resetBtn');
  genEl = document.getElementById('gen');
  bestEl = document.getElementById('best');

  pauseBtn.addEventListener('click', () => {
    if (isLooping()) { noLoop(); pauseBtn.textContent = 'Resume'; }
    else { loop(); pauseBtn.textContent = 'Pause'; }
  });
  resetBtn.addEventListener('click', resetAll);

  resetAll();
  frameRate(30);
}

function resetAll() {
  // create cities in upper half (keeps visuals clear)
  const cities = [];
  for (let i = 0; i < CITIES; i++) {
    cities.push(createVector(random(30, width - 30), random(30, height / 2 - 30)));
  }

  const baseOrder = [];
  for (let i = 0; i < CITIES; i++) baseOrder.push(i);

  const population = [];
  for (let i = 0; i < POP; i++) population.push(shuffle(baseOrder.slice()));

  ga = new GeneticAlgorithm(population, cities);
  genEl.textContent = '0';
  bestEl.textContent = '∞';
  loop();
  pauseBtn.textContent = 'Pause';
}

function draw() {
  background(8, 24, 30);

  if (!ga) return;

  ga.calculateFitness();
  ga.normalizeFitness();
  ga.nextGeneration(MUT);

  // draw bestEver - magenta line
  push();
  stroke(255, 80, 220); strokeWeight(3); noFill();
  beginShape();
  for (let i = 0; i < ga.bestEver.length; i++) {
    const n = ga.bestEver[i];
    vertex(ga.cities[n].x, ga.cities[n].y);
  }
  endShape(CLOSE);
  for (let i = 0; i < ga.bestEver.length; i++) {
    const n = ga.bestEver[i];
    fill(255, 80, 220); noStroke(); circle(ga.cities[n].x, ga.cities[n].y, 9);
  }
  pop();

  // draw currentBest below (white)
  push();
  translate(0, height / 2 + 6);
  stroke(230); strokeWeight(1.2); noFill();
  beginShape();
  for (let i = 0; i < ga.currentBest.length; i++) {
    const n = ga.currentBest[i];
    vertex(ga.cities[n].x, ga.cities[n].y);
  }
  endShape(CLOSE);
  for (let i = 0; i < ga.currentBest.length; i++) {
    const n = ga.currentBest[i];
    fill(255); noStroke(); ellipse(ga.cities[n].x, ga.cities[n].y, 7);
  }
  pop();

  genEl.textContent = ga.generation;
  bestEl.textContent = nf(ga.recordDistance, 0, 2);
}
