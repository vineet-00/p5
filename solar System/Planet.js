class Planet {
  constructor(radius, distance, speed, img) {
    this.radius = radius;
    this.distance = distance;
    this.orbitSpeed = speed;
    this.texture = img;

    this.v = p5.Vector.random3D().setMag(this.distance);
    this.angle = random(TWO_PI);
    this.moons = [];
  }

  spawnMoons(count, level = 1) {
    for (let i = 0; i < count; i++) {
      let r = this.radius / (level * 2);
      let d = random(this.radius + r, (this.radius + r) * 2);
      let s = random(-0.02, 0.02);
      let tex = random(textures);
      let moon = new Planet(r, d, s, tex);
      if (level < 2) moon.spawnMoons(floor(random(0, 3)), level + 1);
      this.moons.push(moon);
    }
  }

  orbit() {
    this.angle += this.orbitSpeed;
    this.moons.forEach(m => m.orbit());
  }

  show() {
    push();
    rotate(this.angle);
    translate(this.v.x, this.v.y, this.v.z);
    noStroke();
    texture(this.texture);
    sphere(this.radius);
    this.moons.forEach(m => m.show());
    pop();
  }
}
