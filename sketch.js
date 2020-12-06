var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var ground, invisibleGround;
var bananaGroup, obstaclesGroup;
var score;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png",
    "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 400)

  monkey = createSprite(40, 315, 22, 22);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.13;

  ground = createSprite(400, 355, 900, 3);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  invisibleGround = createSprite(400, 357, 900, 2);
  invisibleGround.visible = false;

  bananaGroup = createGroup();
  obstaclesGroup = createGroup();

  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
  monkey.debug = false;
}


function draw() {
  background("lightBlue");

  textSize(20);
  fill("black");
  text("Survival Time = " + score, 130, 50)

  if (gameState === PLAY) {
    score = 0;
    score = Math.ceil(frameCount / frameRate());

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    food();
    spawnObstacles();

    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();

    }

    if (obstaclesGroup.isTouching(monkey)) {
      gameState = END;
    }
  } else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityX = 0;

    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    textSize(23);
    fill("red");
    text("Game Over", 150, 200);

  }

  monkey.collide(invisibleGround);

  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    var banana =
      createSprite(390, Math.round(random(120, 200)));
    banana.addImage("eating", bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.12;
    banana.lifetime = 100;
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(300, 332, 22, 22);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.12;
    obstacle.lifetime = 65;
    obstaclesGroup.add(obstacle);
  }
}