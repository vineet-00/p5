class Spot {
  constructor(i, j) {
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.i = i;
    this.j = j;
    this.neighbors = [];
    this.previous = null;
    this.wall = false;
  }

  show(col) {
    const x = this.i * w;
    const y = this.j * h;

    noStroke();

    if (this.wall) {
      // render walls as soft circles for visual interest
      fill(123, 74, 160);
      ellipse(x + w / 2, y + h / 2, Math.min(w, h) * 0.6, Math.min(w, h) * 0.6);
    } else if (col) {
      fill(col);
      rect(x, y, w, h);
    } else {
      // subtle grid background
      fill(10, 20, 36, 220);
      rect(x, y, w, h);
    }

    // optionally draw small separators (comment out if too noisy)
    // stroke(255,255,255,3);
    // noFill();
    // rect(x,y,w,h);
  }

  addNeighbor(grid) {
    this.neighbors = [];
    const i = this.i;
    const j = this.j;

    // four-directional neighbors
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }

    // diagonals allowed when global allowDiagonal is true
    if (typeof allowDiagonal !== 'undefined' && allowDiagonal) {
      if (i > 0 && j > 0) {
        this.neighbors.push(grid[i - 1][j - 1]);
      }
      if (i < cols - 1 && j > 0) {
        this.neighbors.push(grid[i + 1][j - 1]);
      }
      if (i > 0 && j < rows - 1) {
        this.neighbors.push(grid[i - 1][j + 1]);
      }
      if (i < cols - 1 && j < rows - 1) {
        this.neighbors.push(grid[i + 1][j + 1]);
      }
    }
  }
}
