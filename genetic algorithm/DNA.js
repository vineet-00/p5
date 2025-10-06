class DNA {
  constructor(genes) {
    if (genes) {
      this.genes = genes;
    } else {
      this.genes = [];
      for (let i = 0; i < lifespan; i++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(geneMag); // stronger thrust
      }
    }
  }

  crossover(partner) {
    const newgenes = [];
    const mid = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i > mid) newgenes[i] = this.genes[i].copy();
      else newgenes[i] = partner.genes[i].copy();
    }
    return new DNA(newgenes);
  }

  mutation() {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(geneMag);
      }
    }
  }
}
