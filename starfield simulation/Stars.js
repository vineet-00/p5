// Stars.js - point-size stars with subtle halo and faint trail
// Replace your old Stars.js with this file.

class Star {
  constructor(w, h, palette) {
    this.w = w;
    this.h = h;
    this.palette = palette;
    this.reset(true);
    this.pz = this.z;
    this.twinklePhase = random(TWO_PI);
    // smaller base size spread for point-like stars
    this.size = random(0.3, 1.6);
  }

  reset(init = false) {
    this.x = random(-this.w, this.w);
    this.y = random(-this.h, this.h);
    this.z = random(0.1, this.w);
    this.pz = this.z;
    this.size = random(0.3, 1.6);
    this.color = random(this.palette);
  }

  update(speed) {
    this.pz = this.z;
    this.z -= speed;
    this.twinklePhase += 0.04 + speed * 0.001; // slower twinkle
    if (this.z < 1) {
      this.reset();
      this.z = this.w;
      this.pz = this.z;
    }
  }

  show(centerX, centerY, focal) {
    const sx = centerX + (this.x / this.z) * focal;
    const sy = centerY + (this.y / this.z) * focal;

    const px = centerX + (this.x / this.pz) * focal;
    const py = centerY + (this.y / this.pz) * focal;

    // core size mapped to depth (kept intentionally small)
    const r = map(this.z, 0, this.w, this.size * 2.2, 0.5);

    // twinkle (small) and alpha based on depth
    const twinkle = (sin(this.twinklePhase) + 1) * 0.35; // 0..0.7
    const baseAlpha = map(this.z, 0, this.w, 230, 40);
    const alpha = constrain(baseAlpha * (0.7 + twinkle * 0.6), 18, 255);

    // faint motion trail (very subtle)
    strokeWeight(map(r, 0.5, 4.4, 0.6, 2));
    stroke(red(this.color), green(this.color), blue(this.color), alpha * 0.10); // reduce trail opacity
    line(px, py, sx, sy);

    // subtle halo (single soft layer)
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), alpha * 0.09); // very faint halo
    ellipse(sx, sy, r * 3.0, r * 3.0);

    // small brighter inner halo
    fill(red(this.color), green(this.color), blue(this.color), alpha * 0.22);
    ellipse(sx, sy, r * 1.6, r * 1.6);

    // crisp point core using point() for a sharper center
    stroke(red(this.color), green(this.color), blue(this.color), alpha);
    strokeWeight(max(1, r * 0.9)); // small but visible
    point(sx, sy);

    // reset strokeWeight to default for other drawing
    strokeWeight(1);
    noStroke();
  }
}
