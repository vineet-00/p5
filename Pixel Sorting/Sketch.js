let img;        
let sorted;     // working copy to be mutated progressively
let index = 0;  // byte-index into the pixel array (0..length-1, step 4)
let frameP;     // small fps display

function preload() {
  img = loadImage('Data/sunflower400.jpg');
}

function setup() {
  // size canvas double the image width so left = original, right = sorted
  const canvasW = img.width * 2;
  const canvasH = img.height;
  const cnv = createCanvas(canvasW, canvasH);
  cnv.parent('canvas-wrap');

  sorted = img.get();

  frameP = createP('');
  frameP.style('color', '#ddd');
  frameP.position(18, 18);

  noSmooth();
  background(10);
}

function draw() {
  frameP.html('frameRate: ' + nf(frameRate(), 2, 2));
  if (!sorted || !sorted.pixels) return;

  sorted.loadPixels();

  // do N swaps per frame (increase N to speed up)
  let stepsPerFrame = 100; 

  for (let n = 0; n < stepsPerFrame; n++) {
    if (index >= sorted.pixels.length - 4) break;

    let record = -Infinity;
    let selectedPixel = index;

    for (let j = index; j < sorted.pixels.length; j += 4) {
      const r = sorted.pixels[j];
      const g = sorted.pixels[j + 1];
      const b = sorted.pixels[j + 2];
      const pixCol = color(r, g, b);
      const h = hue(pixCol);
      if (h > record) {
        record = h;
        selectedPixel = j;
      }
    }

    // swap
    for (let k = 0; k < 4; k++) {
      const tmp = sorted.pixels[index + k];
      sorted.pixels[index + k] = sorted.pixels[selectedPixel + k];
      sorted.pixels[selectedPixel + k] = tmp;
    }

    index += 4;
  }

  sorted.updatePixels();

  background(6, 10, 16);
  image(img, 0, 0);
  image(sorted, img.width, 0);

  noStroke();
  fill(255, 80);
  const progressX = map(index, 0, sorted.pixels.length, 0, width);
  ellipse(progressX, 8, 6, 6);
}

