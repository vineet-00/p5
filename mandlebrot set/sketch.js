// Mandelbrot parameters
let minReal = -2.5;
let maxReal = 1;
let minImag = -1.25;
let maxImag = 1.25;
let zoom = 1;
let centerX = -0.75;
let centerY = 0;

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent('canvas-container');
  pixelDensity(1);
  
  // Set up button interactions
  document.getElementById('resetBtn').addEventListener('click', resetView);
  document.getElementById('zoomInBtn').addEventListener('click', () => zoomAt(centerX, centerY, 2));
  document.getElementById('zoomOutBtn').addEventListener('click', () => zoomAt(centerX, centerY, 0.5));
  
  drawMandelbrot();
}

function mousePressed() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    // Convert mouse position to complex coordinates
    let clickReal = map(mouseX, 0, width, minReal, maxReal);
    let clickImag = map(mouseY, 0, height, minImag, maxImag);
    
    // Zoom in at clicked point
    zoomAt(clickReal, clickImag, 2);
  }
}

function zoomAt(real, imag, factor) {
  let realRange = maxReal - minReal;
  let imagRange = maxImag - minImag;
  
  // New range after zoom
  let newRealRange = realRange / factor;
  let newImagRange = imagRange / factor;
  
  // Center the new view on the clicked point
  minReal = real - newRealRange / 2;
  maxReal = real + newRealRange / 2;
  minImag = imag - newImagRange / 2;
  maxImag = imag + newImagRange / 2;
  
  centerX = real;
  centerY = imag;
  zoom *= factor;
  
  updateInfo();
  drawMandelbrot();
}

function resetView() {
  minReal = -2.5;
  maxReal = 1;
  minImag = -1.25;
  maxImag = 1.25;
  zoom = 1;
  centerX = -0.75;
  centerY = 0;
  
  updateInfo();
  drawMandelbrot();
}

function updateInfo() {
  document.getElementById('zoomLevel').textContent = zoom.toFixed(1) + 'x';
  document.getElementById('centerX').textContent = centerX.toFixed(6);
  document.getElementById('centerY').textContent = centerY.toFixed(6);
}

function drawMandelbrot() {
  loadPixels();
  
  const maxIterations = Math.min(100 + Math.floor(Math.log(zoom) * 10), 500);
  const escapeRadiusSq = 16;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Map pixel to current view of complex plane
      let a = map(x, 0, width, minReal, maxReal);
      let b = map(y, 0, height, minImag, maxImag);

      let ca = a;
      let cb = b;

      let n = 0;
      while (n < maxIterations) {
        // Calculate z = z^2 + c
        let aa = a * a - b * b;
        let bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        // Check escape condition
        if ((a * a + b * b) > escapeRadiusSq) {
          break;
        }
        n++;
      }

      let pix = (x + y * width) * 4;
      
      if (n === maxIterations) {
        // Points in the Mandelbrot set - black
        pixels[pix + 0] = 0;
        pixels[pix + 1] = 0;
        pixels[pix + 2] = 0;
      } else {
        // Escaped points - colorful based on iteration count
        let hue = map(n, 0, maxIterations, 240, 0); // Blue to red
        let saturation = 0.8;
        let brightness = map(n, 0, maxIterations, 0.3, 1);
        
        let c = HSVtoRGB(hue, saturation, brightness);
        pixels[pix + 0] = c.r;
        pixels[pix + 1] = c.g;
        pixels[pix + 2] = c.b;
      }
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();
}

// Helper function to convert HSV to RGB
function HSVtoRGB(h, s, v) {
  let r, g, b;
  let i = Math.floor(h / 60);
  let f = h / 60 - i;
  let p = v * (1 - s);
  let q = v * (1 - s * f);
  let t = v * (1 - s * (1 - f));
  
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// Initialize info display
function draw() {
  // Static render - no continuous drawing needed
}

// Initialize the display
updateInfo();
