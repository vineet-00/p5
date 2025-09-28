// Mandelbrot Explorer with palettes
let minReal = -2.5, maxReal = 1, minImag = -1.25, maxImag = 1.25;
let zoom = 1, centerX = -0.75, centerY = 0;
let baseMaxIterations = 500;

let canvas;
let iterRange, iterValue, paletteSelect, zoomLevelEl, centerXEl, centerYEl;

function setup() {
  const side = 600;
  canvas = createCanvas(side, side);
  canvas.parent('canvas-container');
  pixelDensity(1);

  // UI hooks
  document.getElementById('resetBtn').onclick = resetView;
  document.getElementById('zoomInBtn').onclick = () => zoomAt(centerX, centerY, 2);
  document.getElementById('zoomOutBtn').onclick = () => zoomAt(centerX, centerY, 0.5);

  iterRange = document.getElementById('iterRange');
  iterValue = document.getElementById('iterValue');
  paletteSelect = document.getElementById('paletteSelect');
  zoomLevelEl = document.getElementById('zoomLevel');
  centerXEl = document.getElementById('centerX');
  centerYEl = document.getElementById('centerY');

  iterRange.oninput = () => {
    baseMaxIterations = Number(iterRange.value);
    iterValue.textContent = baseMaxIterations;
    drawMandelbrot();
  };
  paletteSelect.onchange = drawMandelbrot;

  updateInfo();
  drawMandelbrot();
}

function mousePressed() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    const clickReal = map(mouseX, 0, width, minReal, maxReal);
    const clickImag = map(mouseY, 0, height, minImag, maxImag);
    zoomAt(clickReal, clickImag, 2);
  }
}

function zoomAt(real, imag, factor) {
  const realRange = (maxReal - minReal) / factor;
  const imagRange = (maxImag - minImag) / factor;
  minReal = real - realRange/2;
  maxReal = real + realRange/2;
  minImag = imag - imagRange/2;
  maxImag = imag + imagRange/2;
  centerX = real;
  centerY = imag;
  zoom *= factor;
  updateInfo();
  drawMandelbrot();
}

function resetView() {
  minReal = -2.5; maxReal = 1; minImag = -1.25; maxImag = 1.25;
  zoom = 1; centerX = -0.75; centerY = 0;
  updateInfo();
  drawMandelbrot();
}

function updateInfo() {
  zoomLevelEl.textContent = zoom.toFixed(2) + 'x';
  centerXEl.textContent = centerX.toFixed(6);
  centerYEl.textContent = centerY.toFixed(6);
}

function drawMandelbrot() {
  loadPixels();
  const maxIterations = baseMaxIterations;
  const escapeR2 = 16;
  const palette = paletteSelect.value;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const a0 = map(x, 0, width, minReal, maxReal);
      const b0 = map(y, 0, height, minImag, maxImag);
      let a = a0, b = b0, n = 0;

      while (n < maxIterations) {
        const aa = a*a - b*b;
        const bb = 2*a*b;
        a = aa + a0;
        b = bb + b0;
        if (a*a + b*b > escapeR2) break;
        n++;
      }

      const pix = (x + y * width) * 4;
      if (n === maxIterations) {
        pixels[pix+0] = 0; pixels[pix+1] = 0; pixels[pix+2] = 0; pixels[pix+3] = 255;
      } else {
        const t = n / maxIterations;
        let col = {r:0,g:0,b:0};
        if (palette === 'fire') col = firePalette(t);
        else if (palette === 'ocean') col = oceanPalette(t);
        else if (palette === 'mono') col = monoPalette(t);
        else col = classicPalette(t);
        pixels[pix] = col.r; pixels[pix+1] = col.g; pixels[pix+2] = col.b; pixels[pix+3] = 255;
      }
    }
  }
  updatePixels();
}

/* Color palettes */
function classicPalette(t) {
  // violet → red → gold
  if (t < 0.5) return lerpRGB({r:70,g:0,b:90},{r:200,g:20,b:40},t/0.5);
  return lerpRGB({r:200,g:20,b:40},{r:255,g:220,b:50},(t-0.5)/0.5);
}
function firePalette(t) {
  if (t < 0.5) return lerpRGB({r:50,g:0,b:0},{r:255,g:80,b:0},t/0.5);
  return lerpRGB({r:255,g:80,b:0},{r:255,g:230,b:180},(t-0.5)/0.5);
}
function oceanPalette(t) {
  if (t < 0.5) return lerpRGB({r:0,g:10,b:40},{r:0,g:140,b:200},t/0.5);
  return lerpRGB({r:0,g:140,b:200},{r:200,g:255,b:255},(t-0.5)/0.5);
}
function monoPalette(t) {
  return lerpRGB({r:20,g:20,b:20},{r:240,g:240,b:240},t);
}
function lerpRGB(c1,c2,t) {
  return {
    r: Math.round(c1.r+(c2.r-c1.r)*t),
    g: Math.round(c1.g+(c2.g-c1.g)*t),
    b: Math.round(c1.b+(c2.b-c1.b)*t)
  };
}
