class DiasticMachine{
  constructor(sourceText){
    this.words=this.processText(sourceText);
  }
  
  //process text join line and split into words while removing puntuation
  processText(text){
    let joinedText = join(text, ' ');
    return splitTokens(joinedText, ' ,.!?');
  }
  
  generatePhrase(seed){
    let phrase ="";
    let currentWord=0;
    
    for(let i=0; i<seed.length; i++){
      let c =seed.charAt(i);
      let foundmatch =false;
      for(let j=currentWord; j<this.words.length; j++){
        if(this.words[j].charAt(i) === c){
          phrase += this.words[j] + " ";
          currentWord = j+1;
          foundmatch =true;
          break;
        }
      }
      if(!foundmatch){
        phrase += "[no match] ";
      }
    }
    return phrase.trim();
  }
}