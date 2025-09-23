class Particle {
  constructor(x, y, firework, color) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    this.color = color || [255, 255, 255];
    this.acc = createVector(0, 0);
    
    if (firework) {
      this.vel = createVector(0, random(-16, -8));
    } else {
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(3, 15));
    }
  }
  
  update() {
    if (!this.firework) {
      this.vel.mult(0.92);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  done() {
    return this.lifespan < 0;
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  show() {
    if (!this.firework) {
      strokeWeight(3);
      stroke(this.color[0], this.color[1], this.color[2], this.lifespan);
    } else {
      strokeWeight(5);
      stroke(255, 200, 100);
    }
    point(this.pos.x, this.pos.y);
  }
}
