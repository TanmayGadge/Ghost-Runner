var climberImg, climber, doorImg, door;
var ghostAnimation, ghost, towerImg, tower;
var doorGroup, climberGroup;
var gameState, invisible, inviGroup, sound;


function preload(){
  ghostAnimation = loadAnimation("ghost-standing.png");
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  sound = loadSound("spooky.wav");
  
}


function setup(){
  createCanvas(600,600);

  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  console.log(tower.y);
  
  doorGroup = new Group();
  climberGroup = new Group();
  inviGroup = new Group();
  
  ghost = createSprite(300, 345, 20,20);
  ghost.addAnimation("motion", ghostAnimation);
  ghost.scale = 0.25;
  
  //console.log(tower.height/2);
  
  sound.loop();
  
  gameState = "play";
}

function draw(){
  background("white");
  
  if(gameState === "play"){
    
  if(tower.y > 400){
    tower.y = 300;
   }
    
  if(keyDown("space")){
    ghost.velocityY = -5;
   }
  
  if(keyDown(LEFT_ARROW)){
    ghost.x -= 3;
   }
  
  if(keyDown(RIGHT_ARROW)){
    ghost.x += 3;
   }
    
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
   }
    
  if(inviGroup.isTouching(ghost)|| ghost.y >600){
    ghost.destroy();
    gameState = "end";
    
  }
    ghost.velocityY += 0.8;
    
    spawnDoors();
    drawSprites();
  }
  else if(gameState === "end"){
    textSize(30)
    text("Game Over", 300, 300)
  }
  

  

  

  

  

}

function spawnDoors(){
  if(frameCount % 400 === 0){
    door = createSprite(200, -20);
    door.x = Math.round(random(200, 400));
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 650;
    doorGroup.add(door);
    
    climber = createSprite(200, 40);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 650;
    climberGroup.add(climber);
    
    ghost.depth = door.depth;
    ghost.depth += 2;
    
    invisible = createSprite(door.x, 50, climber.width,2);
    invisible.velocityY = 1;
    invisible.liftime = 650;
    invisible.debug = true;
    inviGroup.add(invisible);
  }
}

