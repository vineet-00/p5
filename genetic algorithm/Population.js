class Population {
  constructor() {
    this.rockets = [];
    this.popsize = 25;
    this.matingpool = [];
    this.best = Infinity;

    for (let i = 0; i < this.popsize; i++) {
      this.rockets.push(new Rocket());
    }
  }

  evaluate() {
    let maxfit = 0;
    this.best = Infinity;

    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }

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
    for (let i = 0; i < this.rockets.length; i++) {
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
