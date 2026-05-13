import {Json} from "./Json.ts"

type MatchResult = {
    wins: number;
    losses: number;
    draws: number;
}

class Player {
    name:string;
    matches:Json;

    constructor(name:string, matches:Json) {
        this.name = name;
        this.matches = matches;
    }

    static playerFromJson(json:Json):Player {
        return new Player(json.name, json.matches);
    }

    addMatch(oppID:number, matchResult:MatchResult) {
        const round = this.matches.length + 1;
        this.matches[round] = {
            opponent: oppID,
            result: matchResult
        }
    }

    addBye() {
        this.addMatch(-1, {wins:2,losses:0,draws:0} as MatchResult);
    }

    addLateEntry(currRound) {
        for (var i; i < currRound; i++){
            this.addMatch(-2, {wins:0,losses:2,draws:0} as MatchResult);
        }
    }

    getJSON():Json {
        const json:Json = {
            name: this.name,
            matches: this.matches
        };
        return json;
    }

}