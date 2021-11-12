class Game{
    constructor(){

    }
    getState(){
      var gameStateRef = database.ref('gameState');
      gameStateRef.on("value",function(data){
        gameState = data.val();
      })
    }
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }

    
   
    async start(){
        if(gameState === 0){
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            player.getCount();
          }
          form = new Form()
          form.display();
        }

        player1 = createSprite(500,600,50,100);
        player1.addAnimation("player1",blueRunnerImg);
        player1.scale = 0.5;
        player2 = createSprite(875,600,50,100);
        player2.addImage("player2",redRunnerImg);
        player2.scale = 0.5;
        players = [player1,player2];
    }

    
      play(){
        form.hide();
        background("green");


        Player.getPlayerInfo();
        image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
        
        console.log(player.index);
       
        var index = 0;
        var y;
        for(var plr in allPlayers){
          index = index + 1 ;
  
          y = displayHeight - allPlayers[plr].distance;
          players[index-1].y = y - 150;
          
          if (index === player.index){
            camera.position.x = displayWidth/2;
            camera.position.y = players[index-1].y;
          }
        }

        if(keyIsDown(UP_ARROW)&& player.distance < 4400){
          player.distance +=10
          console.log(player1.y);
          player.update();
        }

        drawSprites();
      }
      end(){
        console.log("The Game is Over");
      }
}