const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;


var engine, world;
var ghost1, bear1,slingShot;
var backgroundImg;
var gameState="onSling"
var score = 0
var birdFlySound,birdSelectSound,pigSnortSound;
function preload() {

  backgroundImg = loadImage("sprites/bg7.jpg");
  birdFlySound=loadSound("sounds/bird_flying.mp3")
  birdSelectSound=loadSound("sounds/pig_snort.mp3")
  pigSnortSound=loadSound("sounds/bird_select.mp3")

}
function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    // to create objects
    ground = new Ground(600,height,1200,20)

    ghost1 = new Ghost(680,320,70,70);
    ghost2 = new Ghost(900,320,70,70);
    bear1 = new bear(790, 350);
    // angles are measured using PI 
    log1 = new Log(790,260,300, PI/2);

    ghost3 = new Ghost(680,240,70,70);
    ghost4 = new Ghost(900,240,70,70);
    bear3 = new bear(790, 220);

    log3 =  new Log(790,180,300, PI/2);

    bear2 = new bear(790,160,70,70);
    log4 = new Log(740,120,150, PI/7);
    log5 = new Log(850,120,150, -PI/7);

    pumpkin = new Pumpkin(100,100);
    log6 = new Log(230,180,80, PI/2);
    slingShot = new SlingShot(pumpkin.body,{x:200, y:215});

}

function draw(){
    background(backgroundImg);
    Engine.update(engine);

    textSize(35)
    fill("white")
    text("Score :" + score,width -300, 50)

  //to display objects

    ghost1.display();
    ghost2.display();
    ground.display();
    bear1.display();
    bear1.score();
    log1.display();

    ghost3.display();
    ghost4.display();
    bear3.display();
    bear3.score();
    log3.display();

    bear2.display();
    bear2.score();
    log4.display();
    log5.display();
    
    pumpkin.display();
    slingShot.display();    

}

function mouseDragged(){
  if(gameState!=="launched"){
  Matter.Body.setPosition(pumpkin.body, {x: mouseX , y: mouseY});
  birdSelectSound.play()
  }
}


function mouseReleased(){
    slingShot.fly();
    gameState="launched";
    birdFlySound.play()
}

function keyPressed(){
  if(keyCode === 32 && pumpkin.body.speed< 1){
     slingShot.attach(pumpkin.body);
     gameState="onsling";

     pumpkin.trajectory=[];

  }
}