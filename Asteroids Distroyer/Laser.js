// Laser class (unchanged behavior)
class Laser {
  constructor(spos, angle) {
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle).mult(10);
  }

  update() {
    this.pos.add(this.vel);
  }

  render() {
    push();
    stroke(255, 230, 150);
    strokeWeight(3);
    point(this.pos.x, this.pos.y);
    pop();
  }

  hits(asteroid) {
    const d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < asteroid.r;
  }

  offscreen() {
    return (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0);
  }
}
