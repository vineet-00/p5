class Population {
  constructor() {
    this.rockets = [];
    this.popsize = 50;
    this.matingpool = [];
    this.generation = 1;
    
    for (var i = 0; i < this.popsize; i++) {
      this.rockets.push(new Rocket());
    }
  }
  
  evaluate() {
    var maxfit = 0;
    
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }
    
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }
    
    this.matingpool = [];
    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
    
    this.generation++;
  }
  
  selection() {
    var newRockets = [];
    
    var bestRocket = this.getBestRocket();
    newRockets[0] = new Rocket(bestRocket.dna);
    
    for (var i = 1; i < this.rockets.length; i++) {
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      var child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    
    this.rockets = newRockets;
  }
  
  getBestRocket() {
    var best = this.rockets[0];
    for (var i = 1; i < this.rockets.length; i++) {
      if (this.rockets[i].fitness > best.fitness) {
        best = this.rockets[i];
      }
    }
    return best;
  }
  
  run() {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
  
  getStats() {
    var completed = 0;
    var crashed = 0;
    var avgFitness = 0;
    
    for (var i = 0; i < this.popsize; i++) {
      if (this.rockets[i].completed) completed++;
      if (this.rockets[i].crashed) crashed++;
      avgFitness += this.rockets[i].fitness;
    }
    
    return {
      completed: completed,
      crashed: crashed,
      avgFitness: avgFitness / this.popsize,
      active: this.popsize - completed - crashed
    };
  }
}
