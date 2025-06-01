let afinn;

function preload(){
  afinn = loadJSON('afinn111.json');
}

function setup() {
  noCanvas();
  
  const txt = select('#txt');
  txt.input(handleTyping);
}

function handleTyping(){
  const textInput = select('#txt').value();
  const words = parseWords(textInput);
  const scoredWords = [];
  let totalScore =0;
  
  words.forEach((word) => {
    const wordScore = getWordScore(word);
    if(wordScore !== null){
      totalScore += wordScore;
      scoredWords.push(`${word}: ${wordScore}`);
    }
  });
  
  updateScoreDisplay(totalScore, words.length, scoredWords);
}

function parseWords(text){
  return text.split(/\W+/).map((word) => word.toLowerCase());
}

function getWordScore(word){
  return afinn.hasOwnProperty(word) ? Number(afinn[word]) : null;
}

function updateScoreDisplay(totalScore, wordCount, scoredWord){
  const scorePar = select('#scoreP');
  scorePar.html(`Score: ${totalScore}`);
  
  const compar =select('#comparativeP');
  compar.html(`Score: ${totalScore / wordCount}`);
  
  const wordListPar = select('#wordlistP');
  wordListPar.html(scoredWord.join(', '));
}