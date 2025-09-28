class Polygon {
  constructor() {
    this.edges = [];
    this.vertices = [];
  }

  show() {
    for (let i = 0; i < this.edges.length; i++) {
      this.edges[i].show();
    }
  }

  addVertex(x, y) {
    let a = createVector(x, y);
    let total = this.vertices.length;

    if (total > 0) {
      let previous = this.vertices[total - 1];
      let edge = new Edge(previous, a);
      this.edges.push(edge);
    }
    this.vertices.push(a);
  }

  hankin() {
    for (let i = 0; i < this.edges.length; i++) {
      this.edges[i].hankin();
    }

    for (let i = 0; i < this.edges.length; i++) {
      for (let j = 0; j < this.edges.length; j++) {
        if (i !== j) {
          this.edges[i].findEnds(this.edges[j]);
        }
      }
    }
  }

  close() {
    let total = this.vertices.length;
    if (total > 1) {
      let last = this.vertices[total - 1];
      let first = this.vertices[0];
      let edge = new Edge(last, first);
      this.edges.push(edge);
    }
  }
}
