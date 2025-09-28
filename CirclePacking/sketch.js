// Fixed Circle packing main sketch — mode/image handling corrected

let circles;
let img;
let spots;
let mode = 'kitten'; // default; UI can change (values: 'kitten', 'year2017', 'year2025')
let growthRate = 1.0; // UI-controlled multiplier (cosmetic; preserves packing logic)

// image globals
let kittenImg;
let year2025Img;

function preload() {
  // load images you'll use. Ensure assets exist at these paths.
  kittenImg   = loadImage('assets/kitten.jpg');
  year2025Img = loadImage('assets/2025.png');
}

function setup() {
  // choose canvas size per mode (keeps original sizes)
  // attach canvas to canvas-parent element
  if (mode === 'kitten') {
    createCanvas(600, 600).parent(document.getElementById('canvas-parent'));
  } else {
    createCanvas(900, 400).parent(document.getElementById('canvas-parent'));
  }

  circles = [];
  spots = [];
  // initial image selection and pixel prep
  prepareImageForMode();

  // UI wiring
  setupUI();
  background(0);
}

function prepareImageForMode() {
  // choose correct image object
  if (mode === 'kitten') {
    img = kittenImg;
  } else if (mode === 'year2025') {
    img = year2025Img;
  } else {
    // fallback
    img = kittenImg;
  }

  // prepare spots only for year modes (we read pixels)
  spots = [];

  // ensure pixels are loaded (preload already loaded them, loadPixels is safe)
  img.loadPixels();

  if (mode.startsWith('year')) {
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        let index = (x + y * img.width) * 4;
        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];
        let bval = brightness(color(r, g, b));
        if (bval > 1) {
          spots.push(createVector(x, y));
        }
      }
    }
  }
}

function setupUI() {
  const runPauseBtn = document.getElementById('runPauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  const modeSelect = document.getElementById('modeSelect');
  const growthSlider = document.getElementById('growthRate');

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
    // clear circles and restart
    circles = [];
    loop();
    background(0);
  });

  // Sync select with current mode
  modeSelect.value = mode;

  modeSelect.addEventListener('change', (e) => {
    mode = e.target.value;

    // resize canvas per mode and reprepare image and data
    if (mode === 'kitten') {
      resizeCanvas(600, 600);
    } else {
      // both year variants use the "year" layout (same as earlier behaviour)
      resizeCanvas(900, 400);
    }

    // reprepare spots & image for the newly selected mode
    prepareImageForMode();

    // reset circles and background
    circles = [];
    background(0);

    // ensure draw loop runs
    loop();
  });

  growthSlider.addEventListener('input', (e) => {
    growthRate = Number(e.target.value) || 1.0;
  });

  // initial slider value applied
  growthRate = Number(growthSlider.value) || 1.0;
}

function draw() {
  background(0);

  let total = 5;
  let count = 0;
  let attempts = 0;

  while (count < total) {
    let newCircleInstance = newCircle();
    if (newCircleInstance !== null) {
      circles.push(newCircleInstance);
      count++;
    }
    attempts++;
    if (attempts > 1000) {
      // abundant attempts without success => packing finished
      noLoop();
      console.log("FINISHED");
      break;
    }
  }

  for (let c of circles) {
    if (c.growing) {
      if (c.edges()) {
        c.growing = false;
      } else {
        for (let other of circles) {
          if (c !== other) {
            let d = dist(c.x, c.y, other.x, other.y);
            if (d - 2 < c.r + other.r) {
              c.growing = false;
              break;
            }
          }
        }
      }
    }
    // draw then grow (keeps visual parity with original)
    c.show();
    c.grow();
  }
}

function newCircle() {
  if (mode === 'kitten') {
    let x = floor(random(0, width));
    let y = floor(random(0, height));
    let valid = true;

    for (let c of circles) {
      let d = dist(x, y, c.x, c.y);
      if (d - 2 < c.r) {
        valid = false;
        break;
      }
    }

    if (valid) {
      // sample color from the kitten image (original behavior)
      // map the picked x,y to the image dimensions (images may differ from canvas size)
      const sx = floor(map(x, 0, width, 0, img.width - 1));
      const sy = floor(map(y, 0, height, 0, img.height - 1));
      let index = (sx + sy * img.width) * 4;
      // guard in case img has no pixels for some reason
      if (!img.pixels || img.pixels.length === 0) {
        return new Circle(x, y, color(255));
      }
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let c = color(r, g, b);
      return new Circle(x, y, c);
    } else {
      return null;
    }
  } else if (mode.startsWith('year')) {
    // works for 'year2017' and 'year2025'
    if (!spots || spots.length === 0) return null;
    let rIndex = floor(random(0, spots.length));
    let spot = spots[rIndex];
    // spot coordinates are in image-space; map to canvas if sizes differ
    let x = spot.x;
    let y = spot.y;
    if (img.width !== width || img.height !== height) {
      x = map(spot.x, 0, img.width, 0, width);
      y = map(spot.y, 0, img.height, 0, height);
    }

    let valid = true;
    for (let c of circles) {
      let d = dist(x, y, c.x, c.y);
      if (d < c.r) {
        valid = false;
        break;
      }
    }
    if (valid) {
      return new Circle(x, y); // monochrome circle for year mode
    } else {
      return null;
    }
  } else {
    // unknown mode fallback
    return null;
  }
}
