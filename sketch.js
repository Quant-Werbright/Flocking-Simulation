let flock = [];
let sight = 50;
let time = 0;
let group1,group2,group3,group4,group5;
group1 =[];
group2 =[];
group3 =[];
group4 =[];
//group1 =[];
let sightSlider,forceSlider,speedSlider,seperationSlider,alignmentSlider,cohesionSlider;
function setup(){

  sightSlider = createSlider(10,200,100,1);
  // = createSlider(1,10,1,0.1);
  forceSlider = createSlider(0.1,1,1,0.1);
  seperationSlider = createSlider(0,5,1,0.2);
  cohesionSlider = createSlider(0,5,1,0.2);
  alignmentSlider = createSlider(0,5,1,0.2);
  cohesionSlider.position(200,100);
  forceSlider.position(800,100)
  //.position(700,100)
  alignmentSlider.position(0,100);
  seperationSlider.position(400,100);
  sightSlider.position(600,100);
  var canvas = createCanvas(1300,550);
  canvas.position(0,200);
  for (let i = 0;i < 200;i++){
    var b = new Boid(random(0,width),random(0,height));
    flock.push(b);
  }
}
let obstaclesGroup = [];
function draw(){
  group1 =[];
  group2 =[];
  group3 =[];
  group4 =[];
  //obstaclesGroup = [];
  //obstaclesGroup.push(createVector(mouseX,mouseY));


  sight = sightSlider.value();


  for (let boid of flock){
    boid.flock();
  }
  time ++;
  if (true){
    background(40,40,40);
  }
  fill(255,0,0);
  ellipse(mouseX,mouseY,50,50);

  for (let boid of flock){

    boid.update();
    if (true){
      boid.show();
    }

  }
  for (let ob of obstaclesGroup){
  strokeWeight(2);
  fill(255,0,0);
  ellipse(ob.x,ob.y,10,10);
}
  if (mouseIsPressed){
    obstaclesGroup.push(createVector(mouseX,mouseY));
  }


}
