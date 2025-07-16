/**
 * Fractal Tree with Angle Control via GUI
 */

let angle = 45;
let controlkit;

const data = {
    angle: 45,
    lengthMultiplier: 0.597, // matches tutorial
    minLength: 2, 
    background: "#333333",
    branchThickness: true,
    fadeColor: true
};

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(RADIANS);
    createControlKit();
}

function draw() {
    background(data.background);
    stroke(255);
    strokeWeight(2);

    angle = radians(data.angle);
    translate(width / 2, height); // start at bottom

    // Calculate safe starting length
    let initialLength = (height * 0.9) * (1 - data.lengthMultiplier);
    branch(initialLength);
}



function branch(len) {
    if (data.branchThickness) {
        strokeWeight(map(len, 0, 100, 1, 5));
    } else {
        strokeWeight(2);
    }
    if (data.fadeColor) {
        let brightness = map(len, data.minLength, 100, 100, 255);
        stroke(brightness);
    } else {
        stroke(255);
    }
    line(0, 0, 0, -len);
    translate(0, -len);
    if (len > data.minLength) {
        push();
        rotate(angle);
        branch(len * data.lengthMultiplier);
        pop();

        push();
        rotate(-angle);
        branch(len * data.lengthMultiplier);
        pop();
    }
}

// ControlKit setup
function createControlKit() {
    controlkit = new ControlKit();
    controlkit
        .addPanel({
            fixed: false,
            label: 'Fractal Controls'
        })
        .addColor(data, 'background', {
            colorMode: 'hex',
            label: 'Background Color'
        })
        .addNumberInput(data, 'angle', {
            label: 'Angle (degrees)',
            step: 1,
            dp: 0,
            min: 0,
            max: 90
        })
        .addNumberInput(data, 'lengthMultiplier', {
            label: 'Length Multiplier',
            step: 0.01,
            dp: 2,
            min: 0.4,
            max: 0.8
        })
        .addNumberInput(data, 'minLength', {
            label: 'Minimum Branch Length',
            step: 1,
            dp: 0,
            min: 2,
            max: 20
        });
}
