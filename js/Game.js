class Game{
    constructor(){
    }

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })
    }
    

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }

    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");

            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form()
            form.display();
        }
        
        player1 = createSprite(200,500);                                
        player2 = createSprite(800,500);
                            
        players=[player1,player2];

    }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        player.getplayerAtEnd();
        
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
           
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index - 1].x = x;
            players[index - 1].y = y;

            if(allPlayers[plr].basketno==="1"){
            players[index-1].addImage("player",basket1_img);
            }
            else
            if(allPlayers[plr].basketno==="2"){
            players[index-1].addImage("player",basket2_img);
            players[index-1].scale=0.7;
            }
            else
            if(allPlayers[plr].basketno==="3"){
                players[index-1].addImage("player",basket3_img);
                players[index-1].scale=0.8;
            }
            else
            players[index-1].addImage("player",basket1_img);

            // Differentiate the main player by printing
            // the name of the player on the basket.
            if(index === player.index){                        
                fill("black");
                textSize(25);
                text(allPlayers[plr].name ,x-60,y+50);              
            }
            
            //Text to display score
            fill("yellow");
            textSize(25);
            stroke("black");
            strokeWeight(2);
            text("Score:- ",20,50);
            text(allPlayers["player1"].name+"= "+allPlayers["player1"].score,20,90);
            text(allPlayers["player2"].name+"= "+allPlayers["player2"].score,20,130);

        }

        // Give movements for the players using arrow keys
        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }

        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }

        // Create and spawn fruits randomly
        if (frameCount % 20 === 0) {
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            fruits.velocityY = 6;
            var rand = Math.round(random(1,11));
            switch(rand){
                case 1: fruits.addImage("fruit1",fruit1_img);
                break;
                case 2: fruits.addImage("fruit1", fruit2_img);
                break;
                case 3: fruits.addImage("fruit1", fruit3_img);
                break;
                case 4: fruits.addImage("fruit1", fruit4_img);
                break;
                case 5: fruits.addImage("fruit1", fruit5_img);
                break;
                case 6: fruits.addImage("fruit1", fruit6_img);
                fruits.scale=0.5;
                break;
                case 7: fruits.addImage("fruit1", fruit7_img);
                fruits.scale=0.3;
                break;
                case 8: fruits.addImage("fruit1", fruit8_img);
                fruits.scale=0.5;
                break;
                case 9: fruits.addImage("fruit1", fruit9_img);
                fruits.scale=0.5;
                break;
                case 10: fruits.addImage("fruit1", fruit10_img);
                fruits.scale=0.5;
                break;
                case 11: fruits.addImage("fruit1", fruit11_img);
                fruits.scale=0.7;
                break;
            }

            fruitGroup.add(fruits);
            
        }

        if (player.index !== null) {
            //fill code here, to destroy the objects.
            for (var i = 0; i < fruitGroup.length; i++) {
               if (fruitGroup.get(i).isTouching(players)) {
                   fruitGroup.get(i).destroy();
                   player.score =player.score+1;
                   player.update();
                }     
            }
        }  

        if(player.score>=10){
            gameState = 2;
            player.rank = player.rank+1;
            player.updateplayerAtEnd(player.rank);
        }      
    }

    end(){
       //player.getplayerAtEnd();
       console.log("Game Ended  Player Rank is ...", player.rank);
       image(back_img, 0, 0, 1000, 800);
       push();
       textSize(60);
       fill("yellow");
       stroke("black");
       strokeWeight(8);
       text("Game Ended. Click Reset to Restart",10,300); 
       pop();
    }
}