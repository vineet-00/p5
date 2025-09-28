class Rain {
  constructor() {
    this.x = random(width);
    this.y = random(-500, -50);
    this.z = random(0, 20);
    this.yspeed = map(this.z, 0, 20, 1, 20);
    this.len = map(this.z, 0, 20, 10, 20);
    
    // Vary the color slightly for more natural look
    this.hue = random(240, 280); // Blue to purple range
    this.saturation = random(60, 80);
    this.brightness = random(70, 90);
  }

  drop() {
    this.y += this.yspeed;
    let grav = map(this.z, 0, 20, 0, 0.2);
    this.yspeed += grav;

    if (this.y > height) {
      this.y = random(-200, -100);
      this.yspeed = map(this.z, 0, 20, 4, 10);
    }
  }

  show() {
    let thick = map(this.z, 10, 20, 1, 3);
    strokeWeight(thick);
    
    // Use HSB color mode for more natural variation
    colorMode(HSB, 360, 100, 100, 1);
    let alpha = map(this.z, 0, 20, 0.4, 0.8);
    stroke(this.hue, this.saturation, this.brightness, alpha);
    
    line(this.x, this.y, this.x, this.y + this.len);
    colorMode(RGB); // Reset to RGB
  }
}
