class Population{
  
  constructor(){
    this.rockets=[];
    this.popsize=25;
    this.matingpool=[];
    
    for(var i=0;i<this.popsize;i++){
      this.rockets.push(new Rocket());
    }
  }
  
  evalute(){
    var maxfit=0;
    for(var i=0; i<this.popsize;i++){
      this.rockets[i].calcFitness();
      if(this.rockets[i].fitness > maxfit){
        maxfit= this.rockets[i].fitness;
      }
    }
    for(var i=0; i<this.popsize;i++){
      this.rockets[i].fitness /= maxfit;
    }
    
    this.matingpool=[];
    for(var i=0; i<this.popsize;i++){
      var n=this.rockets[i].fitness *100;
      for(var j=0; j<n;j++){
        this.matingpool.push(this.rockets[i]);
      }
    }
    
  }
  
  selection(){
    
    var newRockets=[];
    for(var i=0;i<this.rockets.length;i++){
      var parentA=random(this.matingpool).dna;
      var parentB=random(this.matingpool).dna;
      var child= parentA.crossover(parentB);
      newRockets[i]=new Rocket(child);
    }
    this.rockets=newRockets;
  }
  
  run(){
    for(var i=0;i<this.popsize;i++){
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}