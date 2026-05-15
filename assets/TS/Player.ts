import { Json } from "./Json.ts"
import { MatchResult } from "./MatchResult.ts";

export class Player {
    private id: number
    name: string;
    matches: Json;

    constructor(name: string, matches: Json) {
        this.name = name;
        this.matches = matches;
    }

    getID(): number {
        return this.id;
    }

    static fromJson(json: Json): Player {
        return new Player(json.name, json.matches);
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