//Creating the gameStates.
var PLAY = 0;
var STORY = 2;
var END = 1;
var START;
var gameState = START;

//Creating Global variables.
var player, playerImage;
var bg, bgImage;
var invisibleGround;
var zombie, zombieImage, zombieDead, zombieDeadImage;
var zombieGroup;
var score;
var venusTrap, venusTrapImage;
var trapGroup;
var ghost, ghostImage;
var playerGroup;
var sound,sound1,sound2;
var playerdeadImg;
var restart,restartImg;
var story,storyImg;

function preload(){
  
  playerImage = loadImage("player.png");
  bgImage = loadImage("Background.png");
  zombieImage = loadImage("zombie.png");
  zombieDeadImage = loadImage("zombieDead.png");
  venusTrapImage = loadImage("venus_trap1.png");
  ghostImage = loadImage("ghost.png");
  sound = loadSound("Spooky Music - Haunted School-128.m4a");
  sound1 = loadSound("KNIFE STAB - SOUND EFFECT (NON-COPYRIGHT)-128.m4a");
  sound2 =   loadSound("DoubleSwordScrape1 PE103101.mp3");
  restartImg = loadImage("download__13_-removebg-preview-1.png")
  playerdeadImg = loadImage("ghost.png");
  storyImg = loadImage("cooltext376124032620685.png");
  
}

function setup() {
  createCanvas(600,400);
  
  bg = createSprite(300,60,50,50);
  bg.addImage("bg", bgImage);
 
  player = createSprite(100,370,10,10);
  player.addImage("player", playerImage);
  player.scale = 0.3
  
  invisibleGround = createSprite(300,415,800,10);
  invisibleGround.visible = false;
  
  restart = createSprite(300,240,10,10)
  restart.visible=false;
  restart.scale=0.3;
  restart.addImage("restart",restartImg);
  story= createSprite(300,200,10,10);
  story.visible=false;
  story.addImage("story",storyImg);

  zombieGroup = new Group();
  
  trapGroup = new Group();
  
  playerGroup = new Group();
  
  score = 0;
  
}

function draw() {
  background(220);
  
  player.velocityY = player.velocityY + 0.8;
  
  player.collide(invisibleGround);
  
  if(gameState === START && keyDown("enter")) {
    
    gameState = PLAY;
    
  }
  
  if(gameState === PLAY) {
    
    
      story.visible=false;

 
  
  if(invisibleGround.x < 400) {
    
    invisibleGround.x = invisibleGround.width/2;
    
  }
  
  bg.velocityX = -(3 + 3 * score/100);
    
  invisibleGround.velocityX = -3;
    
  //console.log(player.y);
  
    
  if(zombieGroup.isTouching(player)&& keyWentDown("k")) 
  {
    
    sound1.play();
    
    zombieGroup.destroyEach();
    score = score + 2;
    
    zombieDead = createSprite(zombie.x,370,10,10);
    zombieDead.addImage("zombieDead", zombieDeadImage);
    zombieDead.scale = 0.13
    zombieDead.velocityX = -(6 + 3 * score/100);
    zombieDead.lifetime = 200;
    zombieGroup.add(zombieDead);
    
  }
  
  if(trapGroup.isTouching(player)) {
    
    sound2.play();
    
    player.visible=false;
    ghost = createSprite(venusTrap.x + 5,player.y - 30,10,10);
    ghost.addImage("ghost", ghostImage);
    ghost.scale = 0.05;
    ghost.velocityX = -(6 + 3 * score/100);
    ghost.visible = true;
    playerGroup.add(ghost);
    
    gameState = END;
    
  }
  
  if(keyDown("space") && player.y > 314) {
    
    player.velocityY = -17;
    
  }
  
  if(bg.x < 150) {
    bg.x = bg.width/2;
  }
  
  spawnZombies();
  
  spawnBearTrap();
    
  }
  
  if(gameState === END) {
    
    zombieGroup.setVelocityXEach(0);
    trapGroup.setVelocityXEach(0);
    bg.velocityX = 0;
    ghost.velocityX = 0;
    invisibleGround.velocityX = 0;
    
    zombieGroup.setLifetimeEach(-1);
    trapGroup.setLifetimeEach(-1);
    
  }
  
  drawSprites();
  
  fill("white");
  stroke("white");
  textSize(20);
  text("Score : " + score,450,50);
  
  if(gameState === START) {
    story.visible=true;
    
  }
  
  if(gameState === END) {
    
    restart.visible = true;
    
    if(mousePressedOver(restart)){
      restart.visible=false;
      reset();
    }
    
    fill("white");
    stroke("white");
    textSize(20);
    text("GAME OVER !", 230,200);
  }
}

function spawnZombies () {
  
  if(frameCount % 150 === 0) {
    
    zombie = createSprite(600,340,10,10);
    zombie.addImage("zombie", zombieImage);
    zombie.scale = 0.13
    zombie.velocityX = -(6 + 3 * score/100);
    zombie.lifetime = 200;
    zombieGroup.add(zombie);
    
  }
}

function spawnBearTrap () {
  
  if(frameCount % 200 === 0) {
    
    venusTrap = createSprite(600,370,10,10);
    venusTrap.addImage("venusTrap", venusTrapImage);
    venusTrap.scale = 0.11;
    venusTrap.velocityX = -(6 + 3 * score/100);
    venusTrap.lifetime = 200;
    venusTrap.debug = true;
    venusTrap.setCollider("circle",0,0,40);
    
    trapGroup.add(venusTrap);
  }
}

function reset(){
  

  score=0;
  ghost.visible = false;
  player.visible = true;
  gameState=PLAY;
  zombieGroup.destroyEach();
  trapGroup.destroyEach();

}