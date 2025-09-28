class Ship {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
    this.isBoosting = false;
  }

  setBoosting(isBoosting) {
    this.isBoosting = isBoosting;
  }

  update() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }

  boost() {
    const force = p5.Vector.fromAngle(this.heading).mult(0.12);
    this.vel.add(force);
  }

  hits(asteroid) {
    const d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < this.r + asteroid.r;
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    noFill();
    stroke(126, 255, 235);
    strokeWeight(2);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
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

  setRotation(angle) {
    this.rotation = angle;
  }

  turn() {
    this.heading += this.rotation;
  }
}
