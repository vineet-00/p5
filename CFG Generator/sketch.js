//  Context free grammer rules


const rules = {
  "S": [
    ["NP", "VP"],
    ["Interj", "NP", "VP"]
  ],
  "NP": [
    ["Det", "N"],
    ["Det", "N", "that", "VP"],
    ["Det", "Adj", "N"]
  ],
  "VP": [
    ["Vtrans", "NP"],
    ["Vintr"]
  ],
  "Interj": [
    ["oh"],
    ["my"],
    ["wow"],
    ["darn"]
  ],
  "Det": [
    ["this"],
    ["that"],
    ["the"]
  ],
  "N": [
    ["amoeba"],
    ["dichotomy"],
    ["seagull"],
    ["trombone"],
    ["overstaffed"],
    ["corsage"]
  ],
  "Adj": [
    ["bald"],
    ["smug"],
    ["important"],
    ["tame"],
    ["overstaffed"],
    ["corsage"]
  ],
  "Vtrans": [
    ["computes"],
    ["examines"],
    ["foregrounds"],
  ],
  "Vintr": [
    ["coughs"],
    ["daydreams"],
    ["whines"],
  ]
};

// const rules = {
//   "S": [
//     ["The", "N", "V"]
//   ],
//   "N": [
//     ["cat"],
//     ["dog"]
//   ],
//   "V": [
//     ["meows"],
//     ["barks"]
//   ]
// };

function setupUI(){
  button = createButton("Generate Sentence");
  button.mousePressed(cfg);
}

function cfg(){
  let result = generateSentence();
  createP(result);
}

function generateSentence(){
  return expandSymbol("S");
}

function expandSymbol(symbol){
  if(rules[symbol]){
    let expansion = random(rules[symbol]);
    return expansion.map(expandSymbol).join(" "); // Recursively expand
  }
  return symbol; // Terminal symbol
}

function setup() {
  noCanvas();
  setupUI();
}