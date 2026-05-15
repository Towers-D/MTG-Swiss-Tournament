import { Player } from "./Player";
import { MatchResult } from "./MatchResult";

export abstract class Match {
    playerOne: Player;

    abstract scoreMatch(playerOneResult: MatchResult): void;

    constructor(playerOne: Player) {
        this.playerOne = playerOne;
    }
}

export class PlayerMatch extends Match {
    playerTwo: Player;

    constructor (playerOne: Player, playerTwo: Player) {
        super(playerOne);
        this.playerTwo = playerTwo;
    }

    scoreMatch(playerOneResult:MatchResult): void {
        this.playerOne.addMatch(this.playerTwo.getID(), playerOneResult);
        this.playerTwo.addMatch(this.playerOne.getID(), playerOneResult.invert())
    }
}

abstract class SinglePlayerMatch extends Match {
    id: number;
    matchResult: MatchResult;

    constructor(player:Player, id: number, matchResult:MatchResult ) {
        super(player)
        this.id = id;
        this.matchResult = matchResult;
    }

    scoreMatch(playerOneResult:MatchResult = this.matchResult): void {
        this.playerOne.addMatch(this.id, this.matchResult)
    }
}

export class ByeMatch extends SinglePlayerMatch {
    constructor(player:Player) {
        super(player, -1, MatchResult.byeMatch());
    }
}

export class LateMatch extends SinglePlayerMatch {
    constructor(player:Player) {
        super(player, -2, MatchResult.lateMatch());
    }
}