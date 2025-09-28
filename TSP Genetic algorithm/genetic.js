// Simple Genetic Algorithm for TSP (small, clear, reliable)

class GeneticAlgorithm {
  constructor(population, cities) {
    this.population = population; // array of orders
    this.cities = cities;         // array of p5.Vector
    this.fitness = new Array(population.length).fill(0);
    this.recordDistance = Infinity;
    this.bestEver = population[0].slice();
    this.currentBest = population[0].slice();
    this.generation = 0;
  }

  calculateFitness() {
    let currentRecord = Infinity;
    for (let i = 0; i < this.population.length; i++) {
      const d = this.calcDistance(this.cities, this.population[i]);
      if (d < this.recordDistance) {
        this.recordDistance = d;
        this.bestEver = this.population[i].slice();
      }
      if (d < currentRecord) {
        currentRecord = d;
        this.currentBest = this.population[i].slice();
      }
      this.fitness[i] = 1 / (Math.pow(d, 4) + 1); // smaller distance -> larger fitness
    }
  }

  normalizeFitness() {
    let sum = this.fitness.reduce((a,b)=>a+b,0);
    for (let i = 0; i < this.fitness.length; i++) this.fitness[i] /= sum;
  }

  nextGeneration(mutationRate) {
    const newPop = [];
    for (let i = 0; i < this.population.length; i++) {
      const a = this.pickOne(this.population, this.fitness);
      const b = this.pickOne(this.population, this.fitness);
      const child = this.crossOver(a, b);
      this.mutate(child, mutationRate);
      newPop[i] = child;
    }
    this.population = newPop;
    this.generation++;
  }

  pickOne(list, prob) {
    let index = 0;
    let r = Math.random();
    while (r > 0 && index < prob.length) {
      r -= prob[index];
      index++;
    }
    index = Math.max(0, index - 1);
    return list[index].slice();
  }

  crossOver(a, b) {
    const start = Math.floor(Math.random() * a.length);
    const end = Math.floor(Math.random() * a.length);
    const s = Math.min(start, end);
    const e = Math.max(start, end);
    const part = a.slice(s, e);
    const child = part.slice();
    for (let i = 0; i < b.length; i++) {
      if (!child.includes(b[i])) child.push(b[i]);
    }
    // ensure length
    for (let i = 0; i < a.length; i++) if (!child.includes(i)) child.push(i);
    return child;
  }

  mutate(order, rate) {
    for (let i = 0; i < order.length; i++) {
      if (Math.random() < rate) {
        const j = Math.floor(Math.random() * order.length);
        const k = (j + 1) % order.length;
        const tmp = order[j]; order[j] = order[k]; order[k] = tmp;
      }
    }
  }

  calcDistance(points, order) {
    let sum = 0;
    for (let i = 0; i < order.length - 1; i++) {
      const A = points[order[i]];
      const B = points[order[i+1]];
      sum += dist(A.x, A.y, B.x, B.y);
    }
    // close loop
    if (order.length > 1) {
      const last = points[order[order.length - 1]];
      const first = points[order[0]];
      sum += dist(last.x, last.y, first.x, first.y);
    }
    return sum;
  }
}
