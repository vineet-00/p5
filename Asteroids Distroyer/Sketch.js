let ship;
let asteroids = [];
let lasers = [];

// UI state
let speedMultiplier = 1;
let trails = false;

function setup() {
  // put the canvas into the container so layout stays tidy
  const parent = document.getElementById('canvas-parent');
  const size = Math.max(520, Math.min(parent.clientWidth, 720));
  const cnv = createCanvas(size, size);
  cnv.parent('canvas-parent');

  ship = new Ship();
  asteroids = [];
  lasers = [];

  // initial asteroids
  for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }

  // wire UI
  setupUI();
  updateHud();
  background(0);
}

function setupUI() {
  const runPauseBtn = document.getElementById('runPauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  const addAstBtn = document.getElementById('addAstBtn');
  const speedMulEl = document.getElementById('speedMul');
  const trailsToggle = document.getElementById('trailsToggle');

  // prevent arrow/space default actions (stop page scroll & button activation)
  window.addEventListener('keydown', function (e) {
    const blocked = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];
    const tag = document.activeElement && document.activeElement.tagName;
    const isFormElement = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
    if (blocked.includes(e.code) && !isFormElement) {
      e.preventDefault();
    }
  }, { passive: false });

  runPauseBtn.addEventListener('click', () => {
    if (isLooping()) {
      noLoop();
      runPauseBtn.textContent = 'Run';
      runPauseBtn.classList.remove('primary');
    } else {
      loop();
      runPauseBtn.textContent = 'Pause';
      runPauseBtn.classList.add('primary');
    }
  });

  resetBtn.addEventListener('click', () => {
    ship = new Ship();
    asteroids = [];
    lasers = [];
    for (let i = 0; i < 5; i++) asteroids.push(new Asteroid());
    loop();
    updateHud();
    background(0);
  });

  addAstBtn.addEventListener('click', () => {
    asteroids.push(new Asteroid());
    updateHud();
  });

  // blur buttons after click so they don't retain focus and get activated by Space
  [runPauseBtn, resetBtn, addAstBtn].forEach(btn => {
    btn.addEventListener('click', () => btn.blur());
  });

  speedMulEl.addEventListener('input', (e) => {
    speedMultiplier = Number(e.target.value) || 1;
  });

  trailsToggle.addEventListener('change', (e) => {
    trails = !!e.target.checked;
  });
}


function updateHud() {
  const el = document.getElementById('asteroidCount');
  if (el) el.textContent = String(asteroids.length || 0);
}

function draw() {
  // trails effect: when enabled, draw a semi-transparent rect to create motion blur
  if (trails) {
    push();
    noStroke();
    fill(0, 0, 0, 60); // alpha for trailing effect
    rect(0, 0, width, height);
    pop();
  } else {
    background(0);
  }

  for (let i = asteroids.length - 1; i >= 0; i--) {
    const asteroid = asteroids[i];
    if (ship.hits(asteroid)) {
      // we keep behavior unchanged — just log
      // you can extend to lives / reset later if desired
      // console.log('Ship hit an asteroid!');
    }

    asteroid.render();
    asteroid.update(speedMultiplier);
    asteroid.checkEdges();
  }

  // update & render lasers (iterate backwards to allow splicing)
  for (let i = lasers.length - 1; i >= 0; i--) {
    const laser = lasers[i];
    laser.update();
    laser.render();

    if (laser.offscreen()) {
      lasers.splice(i, 1);
      continue;
    }

    // collision check with asteroids
    for (let j = asteroids.length - 1; j >= 0; j--) {
      const asteroid = asteroids[j];
      if (laser.hits(asteroid)) {
        // break up large asteroids
        if (asteroid.r > 10) {
          const newAst = asteroid.breakup();
          asteroids = asteroids.concat(newAst);
        }
        // remove the hit asteroid and the laser
        asteroids.splice(j, 1);
        lasers.splice(i, 1);
        break;
      }
    }
  }

  // ship
  ship.render();
  ship.turn();
  ship.update();
  ship.checkEdges();

  // HUD
  updateHud();
}

// input handling (same behaviour as original)
function keyPressed() {
  if (key === ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode === RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode === UP_ARROW) {
    ship.setBoosting(true);
  }
}

function keyReleased() {
  ship.setRotation(0);
  ship.setBoosting(false);
}
