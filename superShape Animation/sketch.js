let total=25;
let globe=[];
let r=200;
var a=1;
var b=1;
var m=0;
var mchange=0;
var offset=0;
function setup() {
  createCanvas(600, 600,WEBGL);
  
  
}

function superShape(theta,m, n1, n2, n3){
  var t1=abs((1/a)*cos(m*theta/4));
  t1= pow(t1,n2);
  var t2= abs((1/b)*sin(m*theta/4));
  t2=pow(t2,n3);
  var t3= t1+t2;
  const r=pow(t3, -1/n1);
  return r;
}

function draw() {
  background(0);
  m=map(sin(mchange),-1,1,0,7);
  mchange+=0.02;
  
  lights();
  noStroke();
  
  rotateY(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  
  for(var i=0; i<total+1;i++){
    globe[i]=[];
    const lat= map(i,0,total,-HALF_PI, HALF_PI);
    const r2 =superShape(lat,m, 0.2,1.7,1.7);
    for(var j=0;j< total+1;j++){
      const lon= map(j,0,total,-PI, PI);
      const r1 =superShape(lon,m, 0.2,1.7,1.7);
      const x= r*r1*cos(lon) * r2* cos(lat);
      const y= r* r1* sin(lon) * r2* cos(lat);
      const z= r*r2*sin(lat);
      globe[i][j]= createVector(x,y,z);
    }
  }
  
  offset +=5;
  for(var i=0; i<total;i++){
    const hu=map(i,0,total,0,255*6);
    fill((hu+offset)%255,255,255);
    beginShape(TRIANGLE_STRIP);
    for(var j=0; j<total+1; j++){
      const v1 = globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      const v2= globe[i+1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }
}