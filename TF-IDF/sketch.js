// TF–IDF sketch: same algorithm you provided, but results are placed inside #results
let txt = [];
let counts = {};
let keys = [];
let allwords = [];

let files = ['rainbow.txt','sports.txt', 'eclipse.txt','fish.txt','tree.txt'];

function preload(){
  // loadStrings returns p5 async loader; preload guarantees data is available in setup
  loadFiles(files);
}

function setup() {
  // ensure results area is empty before populating
  const resultsContainer = document.getElementById('results');
  if (resultsContainer) resultsContainer.innerHTML = '';

  // same algorithm flow as original
  processFirstDocument(0); // process TF on first file
  calculateDocumentFrequency();
  caluclateTFIDF();
  displayResults();

  noCanvas(); // keep no canvas (this is a text-only visualization)
}

// load files into txt[] (same as your original)
function loadFiles(fileList){
  for (let i = 0; i < fileList.length; i++){
    txt[i] = loadStrings('files/' + fileList[i]);
  }
}

// Process first document to compute TF
function processFirstDocument(index){
  allwords[index] = txt[index].join("\n");
  let tokens = tokenizeText(allwords[index]);

  for (let i = 0; i < tokens.length; i++){
    let word = tokens[i].toLowerCase().trim();
    if (word === '') continue;
    if (counts[word] === undefined){
      counts[word] = { tf: 1, df: 1 };
      keys.push(word);
    } else {
      counts[word].tf++;
    }
  }
}

// simple tokenizer (splits on non-word). Filter out empty tokens.
function tokenizeText(text){
  return text.split(/\W+/).filter(t => t.length > 0);
}

// For each remaining file, collect unique words and update document frequency
function calculateDocumentFrequency(){
  for (let j = 1; j < txt.length; j++){
    allwords[j] = txt[j].join("\n");
    let tempcounts = {};
    let tokens = tokenizeText(allwords[j]);

    for (let k = 0; k < tokens.length; k++){
      let word = tokens[k].toLowerCase().trim();
      if (word === '') continue;
      if (tempcounts[word] === undefined){
        tempcounts[word] = true;
      }
    }

    updateDocumentFrequency(tempcounts);
  }
}

function updateDocumentFrequency(tempcounts){
  for (let i = 0; i < keys.length; i++){
    let word = keys[i];
    if (tempcounts[word]){
      counts[word].df++;
    }
  }
}

// compute TF–IDF: tf * ln(N / df)
function caluclateTFIDF(){
  for (let i = 0; i < keys.length; i++){
    let word = keys[i];
    let wordData = counts[word];
    // use natural log (Math.log) via p5's log
    wordData.tfidf = wordData.tf * Math.log(files.length / wordData.df);
  }
}

// display sorted results inside the #results container (no page scroll)
function displayResults(){
  keys.sort((a, b) => counts[b].tfidf - counts[a].tfidf);

  const resultsContainer = document.getElementById('results');
  if (!resultsContainer) {
    // fallback: createDiv if DOM element missing
    for (let i = 0; i < keys.length; i++){
      let k = keys[i];
      createDiv(`${k} : ${counts[k].tfidf}`);
    }
    return;
  }

  for (let i = 0; i < keys.length; i++){
    let k = keys[i];
    const item = document.createElement('div');
    item.className = 'result-item';

    const wordSpan = document.createElement('div');
    wordSpan.className = 'result-word';
    wordSpan.textContent = k;

    const scoreSpan = document.createElement('div');
    scoreSpan.className = 'result-score';
    // format score to 4 decimal places
    scoreSpan.textContent = counts[k].tfidf.toFixed(4);

    item.appendChild(wordSpan);
    item.appendChild(scoreSpan);
    resultsContainer.appendChild(item);
  }
}
