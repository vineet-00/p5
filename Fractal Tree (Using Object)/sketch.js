// -------- GUI-controlled parameters --------
const controls = {
  rightAngle_deg   : 30,
  leftAngle_deg    : 30,
  lengthMultiplier : 0.67,
  minLength        : 4,
  background       : "#232946",
  branchColor      : "#b8c1ec",
};

let tree = [];
let leaves = [];
let level = 0;
const MAX_LEVELS = 6;         
let gui;
let growBtn, resetBtn;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initGUI();        
  initButtons();    
  initTree();       // first trunk
}

function draw() {
  background(controls.background);

  // draw branches
  for (const b of tree) b.show();

  // draw leaves when final level reached
  if (level >= MAX_LEVELS) {
    noStroke(); fill(246,193,193,180);
    for (const pos of leaves) ellipse(pos.x, pos.y, 8, 8);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initTree();
  positionButtons();
}

// -------- GUI panel --------
function initGUI() {
  if (gui) gui.destroy();     
  gui = new dat.GUI({ 
    autoPlace: false,
    width: 280 
  });
  gui.domElement.style.position = 'absolute';
  gui.domElement.style.top = '10px';
  gui.domElement.style.right = '10px';
  gui.domElement.style.zIndex = '1000';
  document.body.appendChild(gui.domElement);

  gui.add(controls, 'rightAngle_deg', 10, 60).name('Right Angle (°)').onChange(initTree);
  gui.add(controls, 'leftAngle_deg', 10, 60).name('Left Angle (°)').onChange(initTree);
  gui.add(controls, 'lengthMultiplier', 0.4, 0.8).step(0.01)
                                                .name('Length Multiplier')
                                                .onChange(initTree);
  gui.add(controls, 'minLength', 2, 20).step(1).name('Min Branch Length').onChange(initTree);
  gui.addColor(controls, 'background').name('Background');
  gui.addColor(controls, 'branchColor').name('Branch Color');
  gui.open();
}

function initButtons() {
  // create once
  if (!growBtn) {
    growBtn  = createButton('🌳 Grow Tree');
    resetBtn = createButton('🔄 Reset Tree');
    growBtn  .class('canvas-btn').id('growBtn');
    resetBtn .class('canvas-btn').id('resetBtn');

    growBtn .mousePressed(growOneLevel);
    resetBtn.mousePressed(initTree);
  }
  positionButtons();
}

function positionButtons() {
  const buttonWidth = 120; 
  const spacing = 10;
  
  const startX = width/2 - (buttonWidth + spacing/2);
  
  growBtn .position(startX - buttonWidth/2, 15);
  resetBtn.position(startX + buttonWidth + spacing/2, 15);
}

// -------- tree helpers --------
function initTree() {
  tree   = [];
  leaves = [];
  level  = 0;
  enableGrow(true);

  const a = createVector(width/2, height);
  const b = createVector(width/2, height - min(height*0.4, 260));
  tree[0] = new Branch(a, b);

  redraw();
}

function growOneLevel() {
  if (level >= MAX_LEVELS) return;

  for (let i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
    }
    tree[i].finished = true;
  }

  level++;
  if (level === MAX_LEVELS) {
    leaves = tree.filter(b => !b.finished).map(b => b.end.copy());
    enableGrow(false);  
  }
  redraw();
}

function enableGrow(state) {
  if (state) {
    growBtn.removeAttribute('disabled');
    growBtn.style('opacity', '1');
  } else {
    growBtn.attribute('disabled', '');
    growBtn.style('opacity', '0.4');
  }
}