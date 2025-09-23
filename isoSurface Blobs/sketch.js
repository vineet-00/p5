let blobs = [];

function setup() {
  const canvas = createCanvas(400, 200);
  canvas.parent('canvas-container');
  colorMode(HSB);
  for (let i = 0; i < 10; i++) {
    blobs.push(new Blob(random(0, width), random(0, height)));
  }
  pixelDensity(1); // for accurate pixel manipulation
}

function draw() {
  background(51);
  loadPixels();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (let blob of blobs) {
        let dx = x - blob.x;
        let dy = y - blob.y;
        let d = sqrt(dx * dx + dy * dy);
        sum += (blob.r * 10) / d;
      }
      let col = color(sum % 360, 255, 255);
      let index = (x + y * width) * 4;
      pixels[index] = red(col);
      pixels[index + 1] = green(col);
      pixels[index + 2] = blue(col);
      pixels[index + 3] = 255;
    }
  }
  updatePixels();

  for (let blob of blobs) {
    blob.update();
  }
}
