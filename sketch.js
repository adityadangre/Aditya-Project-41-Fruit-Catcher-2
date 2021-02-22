var database;
var back_img;
var gameState =0;
var playerCount = 0;
var playerAtEnd=0;
var allPlayers;
var score =0;
var player, form,game;
var player1,player2;
var players;
var fruits;
var fruitGroup;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img,fruit6_img,fruit7_img,fruit8_img;
var fruit9_img, fruit10_img, fruit11_img;
var player_img;
var player1score =0;
var player2score =0;
var basket1_img,basket2_img,basket3_img,basketno=1,option_img,option;
var rank=0;
function preload(){
  back_img = loadImage("images/jungle.jpg");

  //player_img = loadImage("images/basket2.png");

  basket1_img=loadImage("images/basket1.png");
  basket2_img=loadImage("images/basket2.png");
  basket3_img=loadImage("images/basket3.png");

  option_img=loadImage("images/option.png");

  fruit1_img  = loadImage("images/apple2.png");
  fruit2_img  = loadImage("images/banana2.png");
  fruit3_img  = loadImage("images/melon2.png");
  fruit4_img  = loadImage("images/orange2.png");
  fruit5_img  = loadImage("images/pineapple2.png");
  fruit6_img  = loadImage("images/avacot.png");
  fruit7_img  = loadImage("images/capple.png");
  fruit8_img  = loadImage("images/garpes.png");
  fruit9_img  = loadImage("images/mango.png");
  fruit10_img = loadImage("images/pom.png");
  fruit11_img = loadImage("images/stoberry.png");
  
  fruitGroup = new Group();
}

function setup() {
  createCanvas(1000, 600);
    
  database = firebase.database();
  
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(back_img);
  
  image(option_img,250,320,500,200);
  
  // Add conditions for gameStates and playerCount
 
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    clear(); 
    game.play();
  }

  if (gameState === 2) {
    clear();  
    game.end();
  }

}