class Asteroid {
  constructor(pos, r) {
    this.pos = pos ? pos.copy() : createVector(random(width), random(height));
    this.r = r ? r * 0.5 : random(15, 50);
    // base velocity magnitude (random unit vector scaled here to give variety)
    this.vel = p5.Vector.random2D().mult(random(0.4, 1.6));
    this.total = floor(random(5, 15));
    this.offset = [];
    for (var i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }
  }

  render() {
    push();
    stroke(220);
    fill(80, 85);
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (let i = 0; i < this.total; i++) {
      const angle = map(i, 0, this.total, 0, TWO_PI);
      const r = this.r + this.offset[i];
      const x = r * cos(angle);
      const y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  update(speedMultiplier = 1) {
    // move using a multiplier so gameplay doesn't change unless UI changes it
    this.pos.add(p5.Vector.mult(this.vel, speedMultiplier));
  }

  breakup() {
    return [new Asteroid(this.pos, this.r), new Asteroid(this.pos, this.r)];
  }

  checkEdges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }

    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
}
