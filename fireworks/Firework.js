class Firework {
  constructor(x) {
    // Clamp x coordinate within canvas width (0 to width)
    let launchX = x !== undefined ? constrain(x, 10, width - 10) : random(10, width - 10);
    this.firework = new Particle(launchX, height, true);
    this.exploded = false;
    this.particles = [];
    this.color = [random(100, 255), random(100, 255), random(100, 255)];
  }
  
  done() {
    return this.exploded && this.particles.length === 0;
  }
  
  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }
  
  explode() {
    for (let i = 0; i < 150; i++) {
      let p = new Particle(this.firework.pos.x, this.firework.pos.y, false, this.color);
      this.particles.push(p);
    }
  }
  
  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (let particle of this.particles) {
      particle.show();
    }
  }
}
