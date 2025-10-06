class Population {
  constructor() {
    this.rockets = [];
    this.popsize = POP_SIZE || 25;
    this.matingpool = [];
    this.best = Infinity;
    this.bestRocket = null;

    for (let i = 0; i < this.popsize; i++) {
      this.rockets.push(new Rocket());
    }
  }

  evaluate() {
    let maxfit = 0;
    this.best = Infinity;
    this.bestRocket = null;

    // compute fitness and track max
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
        this.bestRocket = this.rockets[i];
      }
    }

    // avoid division by zero
    if (maxfit === 0) maxfit = 1;

    // normalize and build mating pool
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    this.matingpool = [];
    for (let i = 0; i < this.popsize; i++) {
      const n = floor(this.rockets[i].fitness * 100);
      for (let j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }

    // compute best distance for stats (smaller is better)
    for (let i = 0; i < this.popsize; i++) {
      const d = dist(this.rockets[i].pos.x, this.rockets[i].pos.y, target.x, target.y);
      if (d < this.best) this.best = d;
    }
  }

  selection() {
    const newRockets = [];

    // Elitism: keep the best rocket(s) unchanged (preserve top solution)
    const elitismCount = 2;
    if (this.bestRocket) {
      for (let e = 0; e < elitismCount && e < this.popsize; e++) {
        // deep-copy genes for elite so later mutation doesn't touch original
        const eliteGenes = this.bestRocket.dna.genes.map(g => g.copy());
        newRockets.push(new Rocket(new DNA(eliteGenes)));
      }
    }

    // fill the remainder of new population using mating pool
    for (let i = newRockets.length; i < this.rockets.length; i++) {
      // if mating pool empty (low fitness all around), fall back to random rockets
      if (this.matingpool.length === 0) {
        newRockets[i] = new Rocket();
        continue;
      }
      const parentA = random(this.matingpool).dna;
      const parentB = random(this.matingpool).dna;
      const childDNA = parentA.crossover(parentB);
      childDNA.mutation();
      newRockets[i] = new Rocket(childDNA);
    }
    this.rockets = newRockets;
  }

  run() {
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}
