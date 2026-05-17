import { DateTime } from "luxon";
import { Json } from "./Json";
import { ByeMatch, LateMatch, Match, miscPairing, PlayerMatch } from "./Match";
import { MatchResult } from "./MatchResult";
import { Player } from "./Player"
import { range, shuffleArray } from "./utils"

class Tournament {
    players: Map<number, Player>;
    currentRound: number;
    rounds: Array<Array<Match>>;

    constructor(players: Map<number, Player>, currentRound: number) {
        this.players = players;
        this.currentRound = currentRound;
        this.rounds = new Array<Array<Match>>();
    }

    static fromJson(json: Json): Tournament {
        const round = json.round;
        const players = new Map<number, Player>();

        Object.entries(json.players).forEach(([id, player]) => {
            players.set(Number(id), Player.fromJson(Number(id), player as Json));
        });

        return new Tournament(players, round);
    }

    createJSON(): Json {
        const json:Json ={};
        json.round = this.currentRound;
        json.lifespan = DateTime.now().plus({ days: 1 });
        json.players = {};

        this.players.forEach((player) => {
            json.players[player.getID()] = player.createJSON();
        });

        return json;
    }

     private getPlayerFromID(id: number): Player {
        return this.players.get(id) as Player;
    }

    getNumPlayers(): number {
        return this.players.size;
    }

    advanceRound(): void {
        if (++this.currentRound === 1) {
            this.generateRoundOne();
        }
        this.generateRound();
    }

    addLateEntry(playerName: string): void {
        const ID = this.players.size;
        this.players.set(ID, new Player(ID, playerName));
        this.rounds[-1].push(new LateMatch(this.getPlayerFromID(ID)));

        for (var i = 0; i < this.currentRound - 1; i++) {
            this.getPlayerFromID(ID).addResult(miscPairing.BYE, MatchResult.byeMatchResult());
        }
    }

    private generateRoundOne(): void {
        var pairingSequence = shuffleArray(range(this.getNumPlayers()));

        const roundPairings = Array<Match>();

        if ((this.getNumPlayers() % 2) !== 0) {
            roundPairings.push(new ByeMatch(this.getPlayerFromID(pairingSequence.pop())));
        }

        for (var i = 0; i < roundPairings.length; i += 2) {
            roundPairings.push(new PlayerMatch(this.getPlayerFromID(pairingSequence[i]), this.getPlayerFromID(pairingSequence[i + 1])));
        }

        this.rounds.push(roundPairings);
    }

    private generateRound(): void {
        console.log("hi");
    }
}