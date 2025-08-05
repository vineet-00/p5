var population;
var count = 0;
var generation = 1;
var lifespan = 200;
var target;
var obstacles = [];
var maxFitness = 0;
var avgFitness = 0;
var bestRocket = null;
var fitnessHistory = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  population = new Population();
  target = createVector(width/2, height * 0.4);
  
  obstacles = [];
  obstacles.push({
    x: width * 0.4,
    y: height * 0.65,
    w: width * 0.15,
    h: 6
  });
  
  obstacles.push({
    x: width * 0.25,
    y: height * 0.55,
    w: 6,
    h: height * 0.08
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  target = createVector(width/2, height * 0.4);
  
  obstacles = [];
  obstacles.push({
    x: width * 0.4,
    y: height * 0.65,
    w: width * 0.15,
    h: 6
  });
  
  obstacles.push({
    x: width * 0.25,
    y: height * 0.55,
    w: 6,
    h: height * 0.08
  });
}

function draw() {
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(10, 15, 30), color(20, 30, 50), inter);
    stroke(c);
    line(0, i, width, i);
  }
  
  drawStars();
  population.run();
  
  // Calculate fitness statistics
  calculateFitnessStats();
  
  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
    generation++;
    
    // Store fitness history for graph
    fitnessHistory.push({
      gen: generation,
      max: maxFitness,
      avg: avgFitness
    });
    
    // Keep only last 20 generations for graph
    if (fitnessHistory.length > 20) {
      fitnessHistory.splice(0, 1);
    }
  }
  
  drawObstacles();
  drawTarget();
  drawLaunchPad();
  drawUI();
  drawFitnessPanel();
  drawGeneticsInfo();
}

function calculateFitnessStats() {
  maxFitness = 0;
  let totalFitness = 0;
  bestRocket = null;
  
  for (let i = 0; i < population.rockets.length; i++) {
    let rocket = population.rockets[i];
    
    // Calculate current fitness
    let d = dist(rocket.pos.x, rocket.pos.y, target.x, target.y);
    let currentFitness = map(d, 0, width, width, 0);
    
    if (rocket.completed) currentFitness *= 10;
    if (rocket.crashed) currentFitness /= 10;
    
    if (currentFitness > maxFitness) {
      maxFitness = currentFitness;
      bestRocket = rocket;
    }
    
    totalFitness += currentFitness;
  }
  
  avgFitness = totalFitness / population.rockets.length;
}

function drawStars() {
  fill(255, 255, 255, 60);
  noStroke();
  for (let i = 0; i < 25; i++) {
    let x = (i * 127.3) % width;
    let y = (i * 213.7) % height;
    ellipse(x, y, 1, 1);
  }
}

function drawLaunchPad() {
  push();
  translate(width/2, height - 25);
  
  fill(100, 150, 200, 120);
  noStroke();
  ellipse(0, 0, 40, 12);
  
  fill(120, 170, 220);
  stroke(150, 200, 255);
  strokeWeight(1);
  rect(-15, -2, 30, 4, 2);
  
  pop();
}

function drawObstacles() {
  fill(160, 50, 30);
  stroke(200, 80, 60);
  strokeWeight(1);
  
  for (let obstacle of obstacles) {
    rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h, 3);
    
    stroke(100, 30, 20);
    strokeWeight(0.5);
    line(obstacle.x + 2, obstacle.y + 1, 
         obstacle.x + obstacle.w - 2, obstacle.y + 1);
  }
}

function drawTarget() {
  push();
  translate(target.x, target.y);
  
  let pulse = sin(frameCount * 0.06) * 3 + 16;
  
  for (let i = 3; i > 0; i--) {
    fill(0, 255, 150, 20 * i);
    noStroke();
    ellipse(0, 0, pulse + (i * 8), pulse + (i * 8));
  }
  
  fill(0, 255, 150);
  stroke(255, 255, 255);
  strokeWeight(2);
  ellipse(0, 0, 16, 16);
  
  strokeWeight(1);
  line(-8, 0, 8, 0);
  line(0, -8, 0, 8);
  
  pop();
}

function drawUI() {
  fill(15, 25, 40, 180);
  stroke(0, 255, 150, 80);
  strokeWeight(1);
  rect(10, 10, 260, 120, 8);
  
  fill(0, 255, 150);
  textAlign(LEFT);
  textSize(16); 
  text("🚀 MISSION CONTROL", 25, 32);
  
  fill(255, 220, 100);
  textSize(13); 
  text("Generation: " + generation, 25, 52);
  text("Mission Time: " + nf((count/lifespan)*100, 1, 0) + "%", 25, 70);
  text("Fleet Size: " + population.popsize + " rockets", 25, 88);
  
  let stats = population.getStats();
  
  if (stats.completed > 0) {
    fill(0, 255, 150);
    text("✓ Successful Landings: " + stats.completed, 25, 106);
  } else {
    fill(255, 200, 100);
    text("🚀 Active Missions: " + stats.active, 25, 106);
  }
}

function drawFitnessPanel() {
  
  fill(25, 15, 40, 180);
  stroke(255, 150, 100, 80);
  strokeWeight(1);
  rect(10, 140, 260, 160, 8);
  
  fill(255, 150, 100);
  textAlign(LEFT);
  textSize(16);  
  text("📊 FITNESS ANALYTICS", 25, 162);
  
  fill(255, 220, 100);
  textSize(13);  
  text("Performance Metrics:", 25, 182);
  
  fill(255);
  textSize(12);  
  text("Maximum Fitness: " + nf(maxFitness, 1, 2), 25, 202);
  text("Average Fitness: " + nf(avgFitness, 1, 2), 25, 220);
  text("Best Distance: " + (bestRocket ? nf(dist(bestRocket.pos.x, bestRocket.pos.y, target.x, target.y), 1, 1) + "px" : "N/A"), 25, 238);
  
  if (fitnessHistory.length >= 2) {
    let recent = fitnessHistory[fitnessHistory.length - 1];
    let previous = fitnessHistory[fitnessHistory.length - 2];
    let improvement = recent.max - previous.max;
    
    if (improvement > 0) {
      fill(0, 255, 150);
      text("↗ Evolution Status: Improving (+" + nf(improvement, 1, 2) + ")", 25, 256);
    } else if (improvement < 0) {
      fill(255, 150, 100);
      text("↘ Evolution Status: Declining (" + nf(improvement, 1, 2) + ")", 25, 256);
    } else {
      fill(255, 255, 100);
      text("→ Evolution Status: Stable", 25, 256);
    }
  }
  
  let selectionPressure = maxFitness > 0 ? (maxFitness - avgFitness) / maxFitness : 0;
  fill(100, 200, 255);
  text("Selection Pressure: " + nf(selectionPressure * 100, 1, 1) + "%", 25, 274);
  
  fill(255, 100, 255);
  text("Population Diversity: " + (avgFitness > 0 ? "Moderate" : "High"), 25, 292);
}

function drawGeneticsInfo() {
  fill(40, 25, 15, 180);
  stroke(100, 255, 150, 80);
  strokeWeight(1);
  rect(width - 280, 10, 270, 160, 8);
  
  fill(100, 255, 150);
  textAlign(LEFT);
  textSize(16);  
  text("🧬 GENETIC ALGORITHM", width - 270, 32);
  
  fill(255, 220, 100);
  textSize(13);  
  text("Algorithm Configuration:", width - 270, 52);
  
  fill(255);
  textSize(12); 
  text("Population Size: " + population.popsize + " individuals", width - 270, 72);
  text("Chromosome Length: " + lifespan + " genes", width - 270, 90);
  text("Mutation Rate: 1.0% per gene", width - 270, 108);
  text("Selection Method: Fitness Proportionate", width - 270, 126);
  text("Crossover Type: Single Point Crossover", width - 270, 144);
  text("Elitism: Best Individual Always Survives", width - 270, 162);
}
