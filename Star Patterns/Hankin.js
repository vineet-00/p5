class Hankin {
  constructor(a, v) {
    this.a = a.copy();
    this.v = v.copy();
    this.b = p5.Vector.add(this.a, this.v);
    this.end = null;
    this.pred = Infinity;
  }

  show() {
    if (!this.end) return;
    strokeWeight(1.5);
    stroke(hankinColor);
    line(this.a.x, this.a.y, this.end.x, this.end.y);
  }

  findEnd(other) {
    // robust line intersection (this ray with other ray)
    let den = (other.v.y * this.v.x) - (other.v.x * this.v.y);

    if (!den || abs(den) < 1e-9) {
      return;
    }

    let numa = (other.v.x * (this.a.y - other.a.y)) - (other.v.y * (this.a.x - other.a.x));
    let numb = (this.v.x * (this.a.y - other.a.y)) - (this.v.y * (this.a.x - other.a.x));
    let ua = numa / den;
    let ub = numb / den;

    let x = this.a.x + ua * this.v.x;
    let y = this.a.y + ua * this.v.y;

    if (ua > 0 && ub > 0) {
      let candidate = createVector(x, y);
      let d1 = p5.Vector.dist(candidate, this.a);
      let d2 = p5.Vector.dist(candidate, other.a);
      let d = d1 + d2;
      let diff = abs(d1 - d2);
      // only accept symmetrical-ish intersections (tiny tolerance)
      if (diff < 0.001) {
        if (!this.end) {
          this.end = candidate;
          this.pred = d;
        } else if (d < this.pred) {
          this.pred = d;
          this.end = candidate;
        }
      }
    }
  }
}
