let rows = 50;
let cols = 50;
let grid = [];
let openSet = [];
let closeSet = [];
let start;
let end;
let w, h;
let path = [];
let current = null;

let allowDiagonal = true;
let running = true;
let stepsPerFrame = 6;
let wallDensity = 0.4;

const canvasParentId = 'canvas-container';

function setup() {
  // create a square canvas sized to the parent container width
  const parent = document.getElementById(canvasParentId);
  const size = Math.max(360, Math.min(parent.clientWidth, window.innerHeight - 140));
  const cnv = createCanvas(size, size);
  cnv.parent(canvasParentId);

  frameRate(60);

  setupUI();
  resetGrid(true);
  background(12, 24, 40);
}

function windowResized() {
  const parent = document.getElementById(canvasParentId);
  const size = Math.max(360, Math.min(parent.clientWidth, window.innerHeight - 140));
  resizeCanvas(size, size);
  // recompute cell sizes and redraw grid (preserve current walls by regenerating from existing grid if present)
  if (grid.length) {
    // Rebuild the grid to match new cell size while keeping wall pattern density
    resetGrid(true);
  }
}

function setupUI() {
  // wire up controls
  const runPauseBtn = document.getElementById('runPauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  const randomBtn = document.getElementById('randomBtn');
  const speedEl = document.getElementById('speed');
  const wallDensityEl = document.getElementById('wallDensity');
  const diagToggle = document.getElementById('diagToggle');

  runPauseBtn.addEventListener('click', () => {
    running = !running;
    if (running) {
      loop();
      runPauseBtn.textContent = 'Pause';
      runPauseBtn.classList.add('primary');
    } else {
      noLoop();
      runPauseBtn.textContent = 'Run';
      runPauseBtn.classList.remove('primary');
    }
  });

  resetBtn.addEventListener('click', () => resetGrid(true));

  randomBtn.addEventListener('click', () => resetGrid(true));

  speedEl.addEventListener('input', (e) => {
    stepsPerFrame = Number(e.target.value) || 1;
  });

  wallDensityEl.addEventListener('input', (e) => {
    wallDensity = Number(e.target.value);
  });

  diagToggle.addEventListener('change', (e) => {
    allowDiagonal = e.target.checked;
    resetGrid(true);
  });
}

function resetGrid(randomWalls = true) {
  const size = width; // canvas is square
  cols = 50;
  rows = 50;
  lastStepTime = millis() - (1000 / Math.max(1, stepsPerFrame));

  // compute cell sizes
  w = width / cols;
  h = height / rows;

  // initialize 2D grid
  grid = new Array(cols);
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
      // set walls based on current density (if randomWalls true)
      if (randomWalls) {
        grid[i][j].wall = random(1) < wallDensity;
      } else {
        grid[i][j].wall = false;
      }
    }
  }

  // add neighbors (based on allowDiagonal)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbor(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  openSet = [];
  closeSet = [];
  path = [];
  openSet.push(start);
  current = null;

  // ensure canvas drawing continues if it was paused
  if (running) {
    loop();
  } else {
    noLoop();
  }
}

function draw() {
  const sPerSec = Math.max(1, Math.floor(stepsPerFrame));
  const intervalMs = 1000 / sPerSec;
  const now = millis();

  // run as many logical steps as needed to catch up (keeps animation smooth if frames drop)
  while (now - lastStepTime >= intervalMs) {
    // take one A* step per interval
    aStarStep();

    // advance the lastStepTime by one interval (not setting to now lets us catch up safely)
    lastStepTime += intervalMs;

    // if we reached the end or search stopped, break out to avoid extra steps
    if (!isLooping() && (openSet.length === 0 || current === end)) {
      break;
    }
  }

  clear();
  background(8, 18, 32);

  // draw grid cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  // open set
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(125, 211, 252, 90));
  }

  // closed set
  for (let i = 0; i < closeSet.length; i++) {
    closeSet[i].show(color(255, 120, 150, 90));
  }

  // build path from current
  if (current) {
    path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }
  }

  // draw path as a smooth polyline
  noFill();
  stroke(255, 240, 120);
  strokeWeight(Math.max(2, (w + h) / 12));
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();
}


function aStarStep() {
  if (openSet.length > 0) {
    // find node in openSet with lowest f
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    current = openSet[winner];

    // reached the end
    if (current === end) {
      noLoop();
      console.log('DONE!');
      return;
    }

    removeFromArray(openSet, current);
    closeSet.push(current);

    const neighbors = current.neighbors;
    for (let n = 0; n < neighbors.length; n++) {
      const neighbor = neighbors[n];

      if (!closeSet.includes(neighbor) && !neighbor.wall) {
        const tempG = current.g + 1;

        let betterPath = false;
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
          betterPath = true;
        } else if (tempG < neighbor.g) {
          betterPath = true;
        }

        if (betterPath) {
          neighbor.g = tempG;
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  } else {
    // no solution
    console.log('No Solution!');
    noLoop();
  }
}

function removeFromArray(arr, ele) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === ele) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  // Manhattan distance (works well for grids)
  return abs(a.i - b.i) + abs(a.j - b.j);
}
