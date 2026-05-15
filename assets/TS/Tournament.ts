import { Json } from "./Json";
import { ByeMatch, Match, PlayerMatch } from "./Match";
import { Player } from "./Player"
import { range, shuffleArray } from "./utils"

enum miscPairing {
    BYE = -1,
    LATE = -2
}

type Pairing = {
    playerOneID: number,
    playerTwoID: number
}

type Round = {
    matches: Array<Match>;
}

class Tournament {
    players: Map<number, Player>;
    currentRound: number;

    constructor(players: Map<number, Player>, currentRound: number) {
        this.players = players;
        this.currentRound = currentRound;
    }

    private getPlayerFromID(id:number) {
        return this.players[id];
    }

    static fromJson(json: Json): Tournament {
        const round = json.round;
        const players = new Map<number, Player>();

        Object.entries(json.players).forEach(([id, player]) => {
            players[Number(id)] = Player.fromJson(player as Json);
        });

        return new Tournament(players, round);
    }

    getNumPlayers(): number {
        return this.players.size;
    }

    advanceRound(): Round {
        if (++this.currentRound === 1) {
            return this.generateRoundOne();
        }
        return this.generateRound();
    }

    private generateRoundOne(): Round {
        var pairingSequence = shuffleArray(range(this.getNumPlayers()));

        const roundPairings = Array<Match>();

        if ((this.getNumPlayers() % 2) !== 0) {
            const idOnBye = pairingSequence.pop()
            roundPairings.push(new ByeMatch(this.getPlayerFromID(idOnBye)));
        }

        for (var i = 0; i < roundPairings.length; i += 2) {
            roundPairings.push(new PlayerMatch(this.getPlayerFromID(pairingSequence[i]), this.getPlayerFromID[i+1]));
        }

        return ({ matches: roundPairings } as Round);
    }

    private generateRound(): Round {
        return ({ matches: new Array<Match>() } as Round);
    }
}