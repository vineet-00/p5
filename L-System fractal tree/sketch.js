let axiom ="F";
let sentence= axiom;
let rules =[];
let len=100;
let angle;
rules[0] ={
  a:"F",
  b:"FF+[+F-F-F]-[-F+F+F]"
}

// rules[1] ={
//   a:"B",
//   b:"A"
// }

function generate(){
  len*=0.5;
  let nextSentence ="";
  for(let i=0;i<sentence.length;i++){
    let current = sentence.charAt(i);
    let found =false;
    for(let j=0;j<rules.length;j++){
      if(current == rules[j].a){
        found=true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if(!found){
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  createP(sentence).style('color','white');
  turtle();
}

function turtle(){
  background(51);
  resetMatrix();
  stroke(255,100);
  translate(width/2,height);
  for(let i=0;i<sentence.length;i++){
    let current = sentence.charAt(i);
    if(current == "F"){
      line(0,0,0,-len);
      translate(0,-len);
    }else if(current == "+"){
      rotate(angle);
    }else if(current == "-"){
      rotate(-angle);
    }else if(current == "["){
      push();
    }else if(current == "]"){
      pop();
    }
  }
}

function setup() {
  createCanvas(400,400);
  angle= radians(25);
  createP(axiom).style('color','white');
  turtle();
  let button = createButton("generate");
  button.mousePressed(generate);
}

