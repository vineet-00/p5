let total = 48;        // grid density (higher -> smoother but heavier)
let globe = [];        // 2D array of vertex vectors
let rBase = 200;       // base radius (scaled to canvas)
let a = 1, b = 1;      // superf params
let m = 0;             // morph parameter (varies over time)
let mchange = 0;
let offset = 0;

// color palette (lighter / more visible)
let deepIndigo, softTeal, warmSand;

function setup() {
  // create canvas inside holder and make it responsive
  const holder = document.getElementById('canvas-holder');
  const w = Math.max(420, Math.min(window.innerWidth * 0.92, 1000));
  const h = Math.max(380, Math.min(window.innerHeight * 0.72, 760));
  const cnv = createCanvas(w, h, WEBGL);
  cnv.parent('canvas-holder');

  // lighter, less-dark palette
  // deepIndigo is still deep but slightly brighter; softTeal is more vivid;
  // warmSand is lighter (for clearer highlights)
  deepIndigo = color('#123a49'); // slightly lighter deep base
  softTeal  = color('#3ba1a0'); // brighter teal
  warmSand  = color('#f0e6d6'); // lighter warm sand highlight

  noStroke(); // we'll add a very subtle stroke per-band while drawing
  smooth();

  // scale base radius to canvas size for consistency
  rBase = min(width, height) * 0.36;

  // initialize globe array
  for (let i = 0; i < total + 1; i++) {
    globe[i] = [];
    for (let j = 0; j < total + 1; j++) {
      globe[i][j] = createVector();
    }
  }
}

function superShape(theta, mVal, n1, n2, n3) {
  // classical superformula (Gielis)
  let t1 = abs((1 / a) * cos((mVal * theta) / 4));
  t1 = pow(t1, n2);
  let t2 = abs((1 / b) * sin((mVal * theta) / 4));
  t2 = pow(t2, n3);
  let t3 = t1 + t2;
  const r = pow(t3, -1 / n1);
  return r;
}

function draw() {
  // subtle background for WEBGL canvas
  background(12, 24, 36); // slightly brighter than before to increase contrast

  // animate morph parameter gently
  m = map(sin(mchange), -1, 1, 0.5, 7.0);
  mchange += 0.01;

  // lights - brighter, warm highlight so geometry reads clearer
  ambientLight(60, 70, 80); // slightly higher ambient to lift darker faces
  directionalLight(180, 180, 170, -0.5, -0.6, -0.2); // soft cool directional
  // stronger warm point light that helps the warmSand highlights pop
  pointLight(255, 230, 190, 280, -160, 220);

  // interactive rotation: horizontal mouse controls speed, vertical tilts shape
  let mx = constrain(mouseX, 0, width);
  let my = constrain(mouseY, 0, height);
  let speed = map(mx, 0, width, -0.02, 0.06);
  let tilt = map(my, 0, height, -0.55, 0.55);

  rotateY(frameCount * 0.005 + speed * 12);
  rotateX(tilt);

  // compute globe vertices per frame (keeps the morphing)
  for (let i = 0; i < total + 1; i++) {
    const lat = map(i, 0, total, -HALF_PI, HALF_PI);
    const r2 = superShape(lat, m, 0.2, 1.7, 1.7);
    for (let j = 0; j < total + 1; j++) {
      const lon = map(j, 0, total, -PI, PI);
      const r1 = superShape(lon, m, 0.2, 1.7, 1.7);

      const x = rBase * r1 * cos(lon) * r2 * cos(lat);
      const y = rBase * r1 * sin(lon) * r2 * cos(lat);
      const z = rBase * r2 * sin(lat);
      globe[i][j].set(x, y, z);
    }
  }

  // offset for soft color cycling (very subtle)
  offset += 0.6;

  // draw the surface using TRIANGLE_STRIP for smoothness
  for (let i = 0; i < total; i++) {
    // blend deepIndigo -> softTeal across latitudes
    const t = i / total;
    const colMid = lerpColor(deepIndigo, softTeal, t);

    // increase highlight influence (brighter warm sand mixing)
    const highlightBlend = pow(sin((t + offset * 0.002) * PI), 2) * 0.22; // stronger warm mix
    const highlightMix = lerpColor(colMid, warmSand, highlightBlend);

    // brighter alpha range so faces are more visible
    const rCol = red(highlightMix), gCol = green(highlightMix), bCol = blue(highlightMix);
    const alpha = map(abs(t - 0.5), 0, 0.5, 250, 180); // generally brighter

    // apply fill and a very subtle stroke to define mesh
    fill(rCol, gCol, bCol, alpha);
    stroke(255, 255, 255, 12); // tiny white stroke for gentle edge definition
    strokeWeight(0.35);

    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < total + 1; j++) {
      const v1 = globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      const v2 = globe[i + 1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }

  // reset stroke for safety (future drawing)
  noStroke();
}

function windowResized() {
  // adapt to holder size
  const holder = document.getElementById('canvas-holder');
  const w = Math.max(420, Math.min(window.innerWidth * 0.92, 1000));
  const h = Math.max(380, Math.min(window.innerHeight * 0.72, 760));
  resizeCanvas(w, h);
  rBase = min(width, height) * 0.36;
}
