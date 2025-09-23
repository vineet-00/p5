// CFG rules
const rules = {
  S: [
    ["NP", "VP"],
    ["Interj", "NP", "VP"],
  ],
  NP: [
    ["Det", "N"],
    ["Det", "N", "that", "VP"],
    ["Det", "Adj", "N"],
  ],
  VP: [
    ["Vtrans", "NP"],
    ["Vintr"],
  ],
  Interj: [["oh"], ["my"], ["wow"], ["darn"]],
  Det: [["this"], ["that"], ["the"]],
  N: [
    ["amoeba"],
    ["dichotomy"],
    ["seagull"],
    ["trombone"],
    ["overstaffed"],
    ["corsage"],
  ],
  Adj: [
    ["bald"],
    ["smug"],
    ["important"],
    ["tame"],
    ["overstaffed"],
    ["corsage"],
  ],
  Vtrans: [["computes"], ["examines"], ["foregrounds"]],
  Vintr: [["coughs"], ["daydreams"], ["whines"]],
};

function setup() {
  noCanvas();
  setupUI();
}

function setupUI() {
  const btn = select("#generateBtn");
  btn.mousePressed(() => {
    const sentence = generateSentence();
    displaySentence(sentence);
  });
}

function generateSentence() {
  return expandSymbol("S");
}

function expandSymbol(symbol) {
  if (rules[symbol]) {
    const expansion = random(rules[symbol]);
    return expansion.map(expandSymbol).join(" ");
  }
  return symbol; // terminal
}

function displaySentence(sentence) {
  const output = select("#output");
  output.html(sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".");
}
