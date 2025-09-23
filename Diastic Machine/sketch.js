let diastic;
let srctxt;

function preload() {
  srctxt = loadStrings('rainbow.txt');
}

function setup() {
  noCanvas();
  diastic = new DiasticMachine(srctxt);
  setupUI();
}

function setupUI() {
  const seedInput = select('#seed');
  const submitButton = select('#submit');
  const outputDiv = select('#output');
  const fileInput = select('#fileUpload');

  submitButton.mousePressed(() => {
    const seed = seedInput.value().trim();
    if (seed) {
      const result = diastic.generatePhrase(seed);
      outputDiv.html(result);
    } else {
      outputDiv.html("Please enter a seed word.");
    }
  });

  fileInput.elt.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split(/\r?\n/);
        diastic = new DiasticMachine(lines);
        outputDiv.html("Text file loaded successfully! Now enter a seed word.");
      };
      reader.readAsText(file);
    } else {
      outputDiv.html("Please upload a valid plain text (.txt) file.");
    }
  });
}
