let diastic;
let srctxt;

function preload(){
  srctxt = loadStrings('rainbow.txt');
}

function setup() {
  noCanvas();
  diastic = new DiasticMachine(srctxt);
  setupUI();
}

function setupUI(){
  let seedInput = select('#seed');
  let submitButton = select('#submit');
  let outputDiv = createDiv('');
  
  submitButton.mousePressed(()=>{
    let seed = seedInput.value().trim();
    if(seed){
      let result = diastic.generatePhrase(seed);
      createP(result);
       // outputDiv.html(result);
    }else{
      createP("please enter a seed word.");
    }
  });
  
  //Optional -- allow file input for dynamic text loading
  // let  fileIo = createFileInput(handleFile);
  // fileIo.position(0,0);
}

// function handleFile(file){
//   if(file.type === 'text'){
//     let sourceText = file.data.split('\n');
//     diastic = new Diastic(sourceText);
//     createP("Text loaded from file!");
//   }else{
//     createP("Please upload a valid text file");
//   }
// }
