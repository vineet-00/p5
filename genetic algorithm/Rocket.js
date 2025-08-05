class Rocket {
  constructor(dna) {
    this.pos = createVector(width/2, height - 50);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    
    if (dna) {
      this.dna = dna;
    } else {
      this.dna = new DNA();
    }
    
    this.fitness = 0;
    this.recordDist = Infinity;
    
    this.trail = [];
    this.maxTrailLength = 12;
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  calcFitness() {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    
    if (d < this.recordDist) {
      this.recordDist = d;
    }
    
    this.fitness = map(this.recordDist, 0, width, width, 0);
    
    if (this.completed) {
      this.fitness *= 10;
    }
    
    if (this.crashed) {
      this.fitness /= 10;
    }
    
    if (this.fitness > maxFitness) {
      maxFitness = this.fitness;
    }
  }
  
  update() {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    
    if (d < 15) {
      this.completed = true;
    }
    
    for (let obstacle of obstacles) {
      if (this.pos.x > obstacle.x && 
          this.pos.x < obstacle.x + obstacle.w && 
          this.pos.y > obstacle.y && 
          this.pos.y < obstacle.y + obstacle.h) {
        this.crashed = true;
      }
    }
    
    if (this.pos.x > width || this.pos.x < 0 || 
        this.pos.y > height || this.pos.y < 0) {
      this.crashed = true;
    }
    
    if (count < this.dna.genes.length) {
      this.applyForce(this.dna.genes[count]);
    }
    
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
      
      this.trail.push(this.pos.copy());
      if (this.trail.length > this.maxTrailLength) {
        this.trail.splice(0, 1);
      }
    }
  }
  
  show() {
    this.drawTrail();
    
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    noStroke();
    
    
    if (this.completed) {
      fill(0, 255, 150); 
    } else if (this.crashed) {
      fill(255, 100, 100, 150); 
    } else {
      fill(255, 200, 50); 
    }
    
    rect(0, 0, 25, 5);
    
    pop();
  }
  
  drawTrail() {
    // Rocket exhaust trail
    if (this.trail.length > 1) {
      noFill();
      strokeWeight(1.5);
      
      for (let i = 0; i < this.trail.length - 1; i++) {
        let alpha = map(i, 0, this.trail.length - 1, 0, 120);
        
        if (this.completed) {
          stroke(0, 255, 150, alpha); 
        } else if (this.crashed) {
          stroke(255, 100, 100, alpha * 0.4); 
        } else {
          stroke(255, 150, 0, alpha); 
        }
        
        line(this.trail[i].x, this.trail[i].y, 
             this.trail[i + 1].x, this.trail[i + 1].y);
      }
    }
  }
}
