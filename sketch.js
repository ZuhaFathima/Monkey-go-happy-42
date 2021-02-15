var backImage,backgr;
var player, player_running;
var ground,ground_img;
var FoodGroup, obstacleGroup;
var END =0;
var PLAY =1;
var score = 0;
var gameState = PLAY;
var banana,bananaImage;
var obstacle,obstacleImage;
var gameOver,gameOverImg;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

  gameOver.visible = false;

  FoodGroup = createGroup();
  obstacleGroup = createGroup(); 
}

function draw() { 
  background(0);
 

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);



  if(FoodGroup. isTouching(player)){
    FoodGroup.destroyEach();
    score = score+2;
    player.scale += 0.030;
  }
  
  if(obstacleGroup . isTouching(player)) {
    gameState = END;
    
  }
  

  
  spawnFood()
  spawnObstacle ()

  drawSprites();
}
  
else if (gameState === END) {
  gameOver.visible = true;

  //set velcity of each game object to 0
  backgr.velocityX = 0;
  player.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
 
  
  //set lifetime of the game objects so that they are never destroyed
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
  
}

drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,300,100);
}


function spawnFood(){
  if (frameCount % 80 === 0) {
  banana = createSprite( 200,330,330,40);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.scale = 0.1; 
  banana.velocityX = -4;
  banana.lifetime = 300;
  FoodGroup.add(banana);
  player.depth = banana.depth+1;

    
    
  }
}

function spawnObstacle (){
  if(frameCount % 80 === 0){
    var obstacle = createSprite(300,325,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX =-4;
    obstacle.lifeTime = 10;
    obstacleGroup.add(obstacle);
    
  }
  }
