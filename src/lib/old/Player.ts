import { Json } from "./Json.js"
import { MatchResult } from "./MatchResult.js";

type Result = {
    opponentID:number,
    matchResult:MatchResult
}

export class Player {
    private readonly ID: number
    readonly RESULTS: Array<Result>;
    name: string;

    constructor(id: number, name: string) {

        this.ID = id;
        this.name = name;
        this.RESULTS = new Array<Result>;
    }

    

    static fromJSON(id:number, json: Json): Player {

        var json_map = new Map<string,any>(Object.entries(json));
        var player = new Player(id, json_map.get("name"));


        console.log(json_map.get("results").)

        const RESULTS = json_map.get("results").values as Array<Result>;
        console.log(RESULTS);
        //try:
        //const RESULTS = json as Array<Result>
        RESULTS.forEach((result:Json) => {
            player.RESULTS.push({opponentID: result.opponentID, matchResult:result.matchResult});
        })
        
        return player;
    }

    createJSON(): Json {
        const json:Json = {};
        json.name = this.name;
        json.results = {};
        for (var i = 0; i < this.RESULTS.length; i++) {
            const round = {
                opponentID: this.RESULTS[i].opponentID,
                matchResult: this.RESULTS[i].matchResult
            }
            json.results[i] = round;
        }

        return json;
    }

    getID(): number {
        return this.ID;
    }

    addResult(oppID: number, matchResult: MatchResult) {
        this.RESULTS.push({opponentID:oppID, matchResult:matchResult})
    }
}