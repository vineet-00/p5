class Branch {
  constructor(begin, end) {
    this.begin = begin;
    this.end   = end;
    this.finished = false;
  }

  show() {
    stroke(controls.branchColor);
    strokeWeight(
      map(p5.Vector.dist(this.begin, this.end),
          controls.minLength, 120, 1, 5, true)
    );
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  branchA() {
    const dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(controls.rightAngle_deg * PI / 180);
    dir.mult(controls.lengthMultiplier);
    const newEnd = p5.Vector.add(this.end, dir);
    return new Branch(this.end, newEnd);
  }

  branchB() {
    const dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(-controls.leftAngle_deg * PI / 180);
    dir.mult(controls.lengthMultiplier);
    const newEnd = p5.Vector.add(this.end, dir);
    return new Branch(this.end, newEnd);
  }
}
