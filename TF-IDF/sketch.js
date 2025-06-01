let txt =[];
let counts ={};
let keys= [];
let allwords = [];

let files = ['rainbow.txt','sports.txt', 'eclipse.txt','fish.txt','tree.txt'];

function preload(){
  loadFiles(files);
}

function setup() {
  
  processFirstDocument(0); // we are passing index of 1st file
  
  calculateDocumentFrequency();
  
  caluclateTFIDF();
  
  displayResults();
  
  noCanvas();
  
}

function loadFiles(fileList){
  for(let i=0;i<fileList.length;i++){
    txt[i] = loadStrings('files/' + fileList[i]);
  }
}

//Fuction to process 1st document (calculate TF)

function processFirstDocument(index){
  allwords[index] = txt[index].join("\n");
  let tokens = tokenizeText(allwords[index]);
  
  for(let i=0; i<tokens.length; i++){
    let word = tokens[i].toLowerCase();
    if(counts[word] === undefined){
      counts[word] = {tf : 1, df : 1};
      keys.push(word);
    }else{
      counts[word].tf++;
    }
  }
}

function tokenizeText(text){
  return text.split(/\W+/);
}

function calculateDocumentFrequency(){
  for(let j=1;j<txt.length;j++){
    allwords[j] = txt[j].join("\n");
    let tempcounts = {};
    let tokens = tokenizeText(allwords[j]);
    
    for(let k=0; k< tokens.length;k++){
      let word = tokens[k];
      if(tempcounts[word] === undefined){
        tempcounts[word] = true;
      }
    }
    
    updateDocumentFrequency(tempcounts);
  }
}

function updateDocumentFrequency(tempcounts){
  for(let i = 0; i< keys.length; i++){
    let word = keys[i];
    if(tempcounts[word]){
      counts[word].df++;
    }
  }
}

function caluclateTFIDF(){
  for(let i=0; i< keys.length;i++){
    let word= keys[i];
    let wordData =counts[word];
    wordData.tfidf = wordData.tf * log(files.length / wordData.df);
  }
}

function displayResults(){
  keys.sort((a,b) => counts[b].tfidf - counts[a].tfidf);
  
  for(let i=0; i< keys.length ; i++){
    let k = keys[i];
    createDiv(`${k} : ${counts[k].tfidf}`);
  }
}