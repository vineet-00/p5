class Walker {
  constructor(x, y) {
    if (arguments.length === 2) {
      this.pos = createVector(x, y);
      this.stuck = true;
    } else {
      this.pos = randomPoint();
      this.stuck = false;
    }
    this.r = radius;
  }
  
  walk() {
    let vel = p5.Vector.random2D();
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }
  
  checkStuck(others) {
    for (let other of others) {
      let d = distSq(this.pos, other.pos);
      if (d < (this.r * other.r * 4)) {
        this.stuck = true;
        return true;
      }
    }
    return false;
  }
  
  show() {
    stroke(255, 100);
    fill(this.stuck ? color(255, 0, 100) : 255);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

function randomPoint() {
  let side = floor(random(4));
  if (side === 0) {
    return createVector(random(width), 0);       // top edge
  } else if (side === 1) {
    return createVector(random(width), height);  // bottom edge
  } else if (side === 2) {
    return createVector(0, random(height));      // left edge
  } else {
    return createVector(width, random(height));  // right edge
  }
}

function distSq(a, b) {
  let dx = b.x - a.x;
  let dy = b.y - a.y;
  return dx * dx + dy * dy;
}
