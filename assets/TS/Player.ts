import { Json } from "./Json.ts"
import { MatchResult } from "./MatchResult.ts";

export class Player {
    private readonly ID: number
    name: string;
    matches: Json;

    constructor(id: number, name: string) {
        this.ID = id;
        this.name = name;
        this.matches = {};
    }

    static fromJson(json: Json): Player {
        const ID = json.id;
        
        return new Player(json.name, json.matches);
    }

    getID(): number {
        return this.ID;
    }

    addMatch(oppID: number, matchResult: MatchResult) {
        const round = this.matches.length + 1;
        this.matches[round] = {
            opponent: oppID,
            result: matchResult
        }
    }

    getJSON(): Json {
        const json: Json = {
            name: this.name,
            matches: this.matches
        };
        return json;
    }

}