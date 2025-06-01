let madlabGenerator={
  data : null,
  template:'$$Exclamation$$! they said $$Adverb$$ as they jumped into their $$Noun$$ and flew off with their $$Adjective$$ $$PluralNoun$$.',
  
  init : function(){
    noCanvas();
    this.loadData();
    this.createButton();
  },
  
  loadData : function(){
    Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vSiJDczupcvlAJxd70RJ9hZina9cqweCiTj1EkYrH_17FhFBjdMFTEY2TOMmhwGBHGR05y7QRXLNbo6/pub?output=csv',
     {
      download:true,
      header:true,
      complete: (results)=> {
        this.data = results.data;
    }
    });
  },
  
  createButton : function(){
    let button = createButton('Generate MatLib');
    button.mousePressed(()=>this.generateMadLib());
  },
  
  replacer : function(match,pos){
    if(!this.data){
      console.error("Data not loaded")
      return match;
    }
    let entry = random(this.data);
    return entry[pos] || match;
  },
  
  generateMadLib: function(){
    if(!this.data){
      console.error("Data not available")
      return;
    }
    
    let madlib = this.template.replace(/\$\$(.*?)\$\$/g,
                                      (match, pos)=>this.replacer(match,pos));
    createP(madlib);
  }
};

function setup() {
  madlabGenerator.init();
}
