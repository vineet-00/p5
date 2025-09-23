let madlibGenerator = {
  data: null,
  template: '"$$Exclamation$$! they said $$Adverb$$ as they jumped into their $$Noun$$ and flew off with their $$Adjective$$ $$PluralNoun$$."',
  
  init: function () {
    noCanvas();
    this.loadData();
    this.createButton();
  },

  loadData: function () {
    Papa.parse(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSiJDczupcvlAJxd70RJ9hZina9cqweCiTj1EkYrH_17FhFBjdMFTEY2TOMmhwGBHGR05y7QRXLNbo6/pub?output=csv',
      {
        download: true,
        header: true,
        complete: (results) => {
          // Filter empty rows just in case
          this.data = results.data.filter((row) => Object.values(row).some(v => v.trim() !== ''));
          this.generateMadLib(); // Initial generate on load
        },
        error: (err) => {
          this.showError("Failed to load word list.");
          console.error(err);
        }
      }
    );
  },

  createButton: function () {
    let buttonContainer = select('#button-container');
    let button = createButton('Generate New MadLib');
    button.parent(buttonContainer);
    button.mousePressed(() => this.generateMadLib());
  },

  replacer: function (match, key) {
    if (!this.data || this.data.length === 0) {
      console.error("Data not loaded or empty");
      return match;
    }
    let entry = random(this.data);
    return entry[key] || match;
  },

  generateMadLib: function () {
    if (!this.data || this.data.length === 0) {
      this.showError("Word list not available. Please reload the page.");
      return;
    }

    let madlib = this.template.replace(/\$\$(.*?)\$\$/g, (match, key) => this.replacer(match, key));
    this.showMadLib(madlib);
  },
  
  showMadLib: function (text) {
    let outputDiv = select('#madlib-output');
    outputDiv.html('');
    let p = createP(text);
    p.parent(outputDiv);
  },

  showError: function(message) {
    let outputDiv = select('#madlib-output');
    outputDiv.html('');
    let p = createP(message);
    p.style('color', '#ff5555');
    p.parent(outputDiv);
  }
};

function setup() {
  madlibGenerator.init();
}
