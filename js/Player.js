class Player {
    constructor() {
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.score = 0;
        this.basketno=1;
        this.rank=null;
   }

    getplayerAtEnd(){
        var playerAtEndRef= database.ref('playerAtEnd');
        playerAtEndRef.on("value",(data)=>{
             playerAtEnd=data.val();
         })
     }
 
      updateplayerAtEnd(rank){
         database.ref('/').update({
             playerAtEnd:rank
         })
     }

    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        })
    }

    
    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            score:this.score,
            basketno:this.basketno,
        });
    }

    static getPlayerInfo() {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    
}
