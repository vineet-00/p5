class Rocket {
  constructor(dna) {
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    this.fitness = 0;
    this.size = 10;

    if (dna) this.dna = dna;
    else this.dna = new DNA();
  }

  applyforce(force) {
    this.acc.add(force);
  }

  calcFitness() {
    const d = dist(this.pos.x, this.pos.y, target.x, target.y);
    // closer => higher fitness
    this.fitness = map(d, 0, width, width, 0);

    if (this.completed) this.fitness *= 10;
    if (this.crashed) this.fitness /= 10;
  }

  update() {
    const d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
      this.completed = true;
      // snap to target for nicer visuals
      this.pos = target.copy();
    }

    // obstacle collision
    if (this.pos.x > rx && this.pos.x < (rx + rw) && this.pos.y > ry && this.pos.y < (ry + rh)) {
      this.crashed = true;
    }

    // edges
    if (this.pos.x > width || this.pos.x < 0) this.crashed = true;
    if (this.pos.y > height || this.pos.y < 0) this.crashed = true;

    // apply current gene
    this.applyforce(this.dna.genes[count]);

    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    noStroke();

    // body
    fill(230, 186, 139, 200); // soft gold
    rectMode(CENTER);
    rect(0, 0, this.size * 2, this.size * 0.6, 3);

    // nose
    fill(255, 245, 230, 220);
    triangle(this.size, 0, this.size + 6, -3, this.size + 6, 3);

    // subtle exhaust
    if (!this.completed && !this.crashed) {
      push();
      translate(-this.size, 0);
      rotate(random(-0.1, 0.1));
      fill(159, 182, 191, 170);
      ellipse(0, 0, 6, 3);
      pop();
    }
    pop();
  }
}
