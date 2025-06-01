let txt;

function preload(){
  txt = loadStrings('rainbow.txt');
}

function setup(){
  noCanvas();
  let wordCount = countWords(txt);
  let sortedKeys = sortWordsByFrequency(wordCount);
  displayWordCounts(sortedKeys, wordCount);
}

function countWords(txt){
  let counts = {};
  let allwords = txt.join("\n");
  let tokens = allwords.split(/\W+/);
  for(let token of tokens){
    let word = token.toLowerCase();
    if(!/\d+/.test(word)) {
      counts[word] = (counts[word] || 0) +1;
    }
  }
  return counts;
}

function sortWordsByFrequency(counts){
  return Object.keys(counts).sort((a,b) => counts[b]-counts[a]);
}

function displayWordCounts(keys, counts){
  for(let k of keys){
    createDiv(`${k} ${counts[k]}`);
  }
}