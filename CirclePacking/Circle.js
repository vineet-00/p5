// Circle class (unchanged logic, growth amount controlled by global growthRate)
class Circle {
  constructor(x, y, color = null) {
    this.x = x;
    this.y = y;
    this.r = 1;
    this.color = color;
    this.growing = true;
  }

  grow() {
    if (this.growing) {
      // growthRate is controlled by UI; default is 1.0 (preserves original rhythm)
      this.r += growthRate;
    }
  }

  edges() {
    return (this.x + this.r > width || this.x - this.r < 0 ||
            this.y + this.r > height || this.y - this.r < 0);
  }

  show() {
    if (this.color) {
      noStroke();
      fill(this.color);
    } else {
      stroke(255);
      noFill();
    }
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}
