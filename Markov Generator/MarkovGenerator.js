class MarkovGenerator{
  constructor(order, text){
    this.text =text;
    this.order =order;
    this.ngram ={};
    
    this.createNGram();
  }
  
  createNGram(){
    for(let i=0; i< this.text.length-this.order; i++){
      let gram = this.text.substring(i,i+this.order);
      let nextChar = this.text.charAt(i+this.order);
      
      if(!this.ngram[gram]){
        this.ngram[gram] =[];
      }
      this.ngram[gram].push(nextChar);
    }
  }
  
  generate(length){
    let currentGram = this.text.substring(0,this.order);
    let result = currentGram;
    
    for(let i=0;i<length;i++){
      let possibilities = this.ngram[currentGram];
      if(!possibilities){
        break;
      }
      let nextChar = random(possibilities);
      result += nextChar;
      
      let len = result.length;
      currentGram =result.substring(len - this.order, len);
    }
    return result;
  }
  
}