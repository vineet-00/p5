let ga;
const popSize = 500;
const totalCities = 15;

function setup() {
  createCanvas(600, 600);
  const cities = [];
  const order = [];
  for (let i = 0; i < totalCities; i++) {
    const v = createVector(random(width), random(height/2));
    cities[i] = v;
    order[i] = i;
  }
  const population = [];
  for (let i = 0; i < popSize; i++) {
    population[i] = shuffle(order);
  }

  ga = new GeneticAlgorithm(population, cities);
}

function draw() {
  background(0);
  ga.calculateFitness();
  ga.normalizeFitness();
  ga.nextGeneration(); 

  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < ga.bestEver.length; i++) {
    const n = ga.bestEver[i];
    vertex(ga.cities[n].x, ga.cities[n].y);
    ellipse(ga.cities[n].x, ga.cities[n].y, 16, 16);
  }
  endShape();

  translate(0, height / 2);
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < ga.currentBest.length; i++) {
    const n = ga.currentBest[i];
    vertex(ga.cities[n].x, ga.cities[n].y);
    ellipse(ga.cities[n].x, ga.cities[n].y, 16, 16);
  }
  endShape();
}