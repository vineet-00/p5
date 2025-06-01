class GeneticAlgorithm {
  constructor(population, cities) {
    this.population = population;
    this.cities = cities;
    this.fitness = [];
    this.recordDistance = Infinity;
    this.bestEver = null;
    this.currentBest = null;
  }

  calculateFitness() {
    let currentRecord = Infinity;
    for (let i = 0; i < this.population.length; i++) {
      const d = this.calcDistance(this.cities, this.population[i]);

      if (d < this.recordDistance) {
        this.recordDistance = d;
        this.bestEver = this.population[i];
      }

      if (d < currentRecord) {
        currentRecord = d;
        this.currentBest = this.population[i];
      }
      this.fitness[i] = 1 / (pow(d, 8) + 1);
    }
  }

  normalizeFitness() {
    let sum = 0;
    for (let i = 0; i < this.fitness.length; i++) {
      sum += this.fitness[i];
    }
    for (let i = 0; i < this.fitness.length; i++) {
      this.fitness[i] /= sum; // Fixed here
    }
  }

  nextGeneration() {
    const newpopulation = [];
    for (let i = 0; i < this.population.length; i++) {
      const orderA = this.pickOne(this.population, this.fitness);
      const orderB = this.pickOne(this.population, this.fitness);
      const order = this.crossOver(orderA, orderB);
      this.mutate(order, 0.01);
      newpopulation[i] = order;
    }
    this.population = newpopulation;
  }

  pickOne(list, prob) {
    let index = 0;
    let r = random(1);
    while (r > 0) {
      r -= prob[index];
      index++;
    }
    index--;
    return list[index].slice();
  }

  crossOver(orderA, orderB) {
    const start = floor(random(orderA.length));
    const end = floor(random(start + 1, orderA.length));
    const newOrder = orderA.slice(start, end);
    for (let i = 0; i < orderB.length; i++) {
      const city = orderB[i];
      if (!newOrder.includes(city)) { // Fixed here
        newOrder.push(city);
      }
    }
    return newOrder;
  }

  mutate(order, mutationRate) {
    for (let i = 0; i < order.length; i++) {
      if (random(1) < mutationRate) {
        const indexA = floor(random(order.length));
        const indexB = (indexA + 1) % order.length;
        this.swap(order, indexA, indexB);
      }
    }
  }

  swap(a, i, j) {
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }

  calcDistance(points, order) {
    let sum = 0;
    for (let i = 0; i < order.length - 1; i++) { // Fixed loop condition here
      const cityA = points[order[i]];
      const cityB = points[order[i + 1]];
      sum += dist(cityA.x, cityA.y, cityB.x, cityB.y);
    }
    return sum;
  }
}
