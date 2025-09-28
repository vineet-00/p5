// sketch.js — fixed: ensure max_dist and min_dist are defined
// Attaches the canvas to the right panel and recreates the Tree on resize
// Your Branch, Leaf, and Tree classes remain unchanged (branch.js, leaf.js, tree.js)

let tree;
let canvasContainer;
let canvasElem;

// Reintroduce the algorithm globals expected by tree.js
let max_dist = 100;
let min_dist = 10;

function setup() {
  // find container, fallback to body if missing
  canvasContainer = document.getElementById('canvas-container') || document.body;

  // determine size from container
  const cw = canvasContainer.clientWidth || 600;
  const ch = canvasContainer.clientHeight || 600;

  // create canvas sized to container and attach
  canvasElem = createCanvas(cw, ch);
  canvasElem.parent('canvas-container');

  pixelDensity(1); // keep consistent pixel behavior

  // initialize tree AFTER canvas exists so width/height are accurate
  tree = new Tree();
}

function draw() {
  // soft background
  background(18, 28, 22);

  // subtle vignette / gradient feel by drawing a translucent rectangle
  noStroke();
  fill(255, 255, 255, 6);
  rect(0, 0, width, height);

  // draw tree every frame and make it grow
  tree.show();
  tree.grow();

  // HUD: show counts
  drawHUD();
}

function drawHUD() {
  push();
  noStroke();
  fill(12, 22, 18, 220);
  rect(12, 12, 220, 70, 8);

  fill(230);
  textSize(13);
  textAlign(LEFT, TOP);
  text('Space Colonization — Tree', 20, 18);
  textSize(12);
  text('Leaves remaining: ' + tree.leaves.length, 20, 38);
  text('Branches: ' + tree.branches.length, 20, 56);
  pop();
}

function windowResized() {
  // resize canvas to container size and recreate tree so leaves and root fit new size
  if (!canvasContainer) canvasContainer = document.getElementById('canvas-container') || document.body;
  const cw = canvasContainer.clientWidth || 600;
  const ch = canvasContainer.clientHeight || 600;

  resizeCanvas(cw, ch);

  // re-init tree so geometry matches the new size (keeps algorithm unchanged)
  tree = new Tree();
}
