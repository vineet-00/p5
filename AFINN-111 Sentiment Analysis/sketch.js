let afinn;

function preload() {
  afinn = loadJSON('afinn111.json');
}

function setup() {
  noCanvas();

  // Set initial outputs
  select('#scoreP').html('Score: —');
  select('#comparativeP').html('Comparative: —');
  select('#wordlistP').html('');

  // Event listener
  const txt = select('#txt');
  txt.input(handleTyping);
}

function handleTyping() {
  const textInput = select('#txt').value();
  const words = parseWords(textInput);
  const scoredWords = [];
  let totalScore = 0;

  words.forEach((word) => {
    const wordScore = getWordScore(word);
    if (wordScore !== null) {
      totalScore += wordScore;
      scoredWords.push(`${word}: ${wordScore}`);
    }
  });

  updateScoreDisplay(totalScore, words.length, scoredWords);
}

function parseWords(text) {
  return text
    .split(/\W+/)
    .filter(w => w.length > 0)
    .map((word) => word.toLowerCase());
}

function getWordScore(word) {
  return afinn.hasOwnProperty(word) ? Number(afinn[word]) : null;
}

function updateScoreDisplay(totalScore, wordCount, scoredWords) {
  const scorePar = select('#scoreP');
  scorePar.html(`Score: <b>${wordCount === 0 ? 0 : totalScore}</b>`);

  const compar = select('#comparativeP');
  const comparative = wordCount === 0 ? 0 : (totalScore / wordCount).toFixed(3);
  compar.html(`Comparative: <b>${comparative}</b>`);

  // Color Indicator (red-negative, gray-neutral, green-positive)
  let color = '#96a2b5'; // neutral
  if (comparative > 0.1) color = '#68ce6e';
  else if (comparative < -0.1) color = '#fb6666';

  const ind = select('#indicator');
  ind.style('background', color);
  ind.style('width', abs(comparative) * 100 + 80 + 'px'); // width based on magnitude

  const wordListPar = select('#wordlistP');
  wordListPar.html(
    scoredWords.length > 0
      ? 'Matched: ' + scoredWords.join(', ')
      : '<span style="color:#b6bbc8;">No sentiment words recognized.</span>'
  );
}
