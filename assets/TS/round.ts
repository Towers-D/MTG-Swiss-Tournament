import { retrieveJSON, isData, Json } from "./Json";
import { range, shuffleArray } from "./utils.ts";

class Round {
    lastRound:number;
    thisRound:number;
    players:Array<Json>;
    pairs:Array<Map<Json, Json>>;

    constructor(lastRound:number, players:Array<Json>) {
        this.lastRound = lastRound;
        this.thisRound = lastRound++;
        this.players = players;

        this.pairRound();
    }

    pairRound(){
        if (this.thisRound === 1) {
            return this.pairRoundOne();
        }
    }

    private pairRoundOne() {
        var ids:Array<number> = range(this.players.length);
        ids = shuffleArray(ids);
        //copy list of players
        //shuffle
        //pop as pairs are created
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    if (isData() === false) {
        window.location.replace("/");
    }
    
    var json:Json = retrieveJSON() as Json;

    console.log(json);
    console.log(json.players[0])
    console.log("hello")
});