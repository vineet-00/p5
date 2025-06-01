// This program converts tsv file into JSON file

let table;
let afinn = {};

function preload(){
  table = loadTable('AFINN-111.txt' , 'tsv')
}

function setup() {
  noCanvas();
  populateAfinnDictionary();
  saveAfinnDictionary();
}

function populateAfinnDictionary(){
  for(let i=0;i<table.getRowCount();i++){
    const row = table.getRow(i);
    const word = row.get(0);
    const score = row.get(1);
    
    afinn[word] = score;
  }
}

function saveAfinnDictionary(){
  save(afinn, 'afinn111.json');
}