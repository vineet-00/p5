let markov;
let button;
let inputTextArea;

const defaultText = `The unicorn is a legendary creature that has been described since antiquity as a beast with a large, pointed, spiraling horn projecting from its forehead. The unicorn was depicted in ancient seals of the Indus Valley Civilization and was mentioned by the ancient Greeks in accounts of natural history by various writers, including Ctesias, Strabo, Pliny the Younger, and Aelian. The Bible also describes an animal, the re'em, which some translations have erroneously rendered with the word unicorn. In European folklore, the unicorn is often depicted as a white horse-like or goat-like animal with a long horn and cloven hooves (sometimes a goat's beard). In the Middle Ages and Renaissance, it was commonly described as an extremely wild woodland creature, a symbol of purity and grace, which could only be captured by a virgin. Its horn was said to have the power to render poisoned water drinkable and to heal sickness.`;

function setup() {
  noCanvas();

  inputTextArea = select('#input-text');
  inputTextArea.value(defaultText);

  button = select('#generate-btn');
  button.mousePressed(generateText);

  // Initialize Markov with default text
  markov = new MarkovGenerator(2, defaultText);
}

function generateText() {
  let input = inputTextArea.value();
  if (!input || input.trim().length < 10) {
    alert('Please enter at least 10 characters of input text.');
    return;
  }

  markov = new MarkovGenerator(2, input);
  let generatedText = markov.generate(250);

  let outputContainer = select('#output-container');
  outputContainer.html(''); // clear

  let p = createP(generatedText);
  p.parent(outputContainer);
}
