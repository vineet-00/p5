function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  strokeCap(ROUND);
}

function draw() {
  background(20);
  translate(width / 2, height / 2);
  rotate(-90);

  let hr = hour();
  let mn = minute();
  let sec = second();

  strokeWeight(6);
  noFill();

  // Seconds arc
  stroke(255, 100, 150);
  let secAngle = map(sec, 0, 60, 0, 360);
  arc(0, 0, 300, 300, 0, secAngle);

  // Minutes arc
  stroke(150, 100, 255);
  let minAngle = map(mn, 0, 60, 0, 360);
  arc(0, 0, 280, 280, 0, minAngle);

  // Hours arc
  stroke(150, 255, 100);
  let hrAngle = map(hr % 12, 0, 12, 0, 360);
  arc(0, 0, 260, 260, 0, hrAngle);

  // Seconds hand
  push();
  rotate(secAngle);
  stroke(255, 100, 150);
  strokeWeight(2);
  line(0, 0, 100, 0);
  pop();

  // Minutes hand
  push();
  rotate(minAngle);
  stroke(150, 100, 255);
  strokeWeight(3);
  line(0, 0, 75, 0);
  pop();

  // Hours hand
  push();
  rotate(hrAngle);
  stroke(150, 255, 100);
  strokeWeight(4);
  line(0, 0, 50, 0);
  pop();

  // Center point
  stroke(255);
  strokeWeight(7);
  point(0, 0);
}
