class Edge {
  constructor(a, b) {
    this.a = a;
    this.b = b;
    this.h1 = null;
    this.h2 = null;
  }

  show() {
    // draw the base edge faintly
    strokeWeight(1);
    stroke(edgeColor);
    line(this.a.x, this.a.y, this.b.x, this.b.y);

    // draw hankins if present
    if (this.h1) this.h1.show();
    if (this.h2) this.h2.show();
  }

  hankin() {
    let mid = p5.Vector.add(this.a, this.b);
    mid.mult(0.5);

    let v1 = p5.Vector.sub(this.a, mid);
    let v2 = p5.Vector.sub(this.b, mid);

    let offset1 = mid.copy();
    let offset2 = mid.copy();

    if (delta > 0) {
      v1.setMag(delta);
      v2.setMag(delta);
      offset1 = p5.Vector.add(mid, v2);
      offset2 = p5.Vector.add(mid, v1);
    }

    v1.normalize();
    v2.normalize();

    v1.rotate(radians(-angle));
    v2.rotate(radians(angle));

    this.h1 = new Hankin(offset1, v1);
    this.h2 = new Hankin(offset2, v2);
  }

  findEnds(edge) {
    if (!this.h1 || !this.h2 || !edge.h1 || !edge.h2) return;
    this.h1.findEnd(edge.h1);
    this.h1.findEnd(edge.h2);
    this.h2.findEnd(edge.h1);
    this.h2.findEnd(edge.h2);
  }
}
