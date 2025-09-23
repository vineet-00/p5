let tree = [];
let walkers = [];
const maxWalkers = 10;
const iterations = 1000;
let radius = 8;
const shrink = 0.995;

function setup() {
  const canvas = createCanvas(600, 400);
  canvas.parent('canvas-container'); 
  
  // Initialize cluster with seed walker at canvas center
  tree[0] = new Walker(width / 2, height / 2);
  radius *= shrink;

  // Spawn initial free walkers from edges
  for (let i = 0; i < maxWalkers; i++) {
    walkers[i] = new Walker();
    radius *= shrink;
  }
}

function draw() {
  background(0);
  
  // Draw cluster
  tree.forEach(walker => walker.show());
  // Draw free walkers
  walkers.forEach(walker => walker.show());
  
  // Perform multiple walk steps per frame for smoother growth
  for (let n = 0; n < iterations; n++) {
    for (let i = walkers.length - 1; i >= 0; i--) {
      walkers[i].walk();
      if (walkers[i].checkStuck(tree)) {
        tree.push(walkers[i]);
        walkers.splice(i, 1);
      }
    }
    
    // Spawn new walkers while radius is large
    while (walkers.length < maxWalkers) {
      radius *= shrink;
      if (radius > 1) {
        walkers.push(new Walker());
      }
    }
  }
}
