import { Player } from "./Player";
import { MatchResult } from "./MatchResult";

export enum miscPairing {
    BYE = -1,
    LATE = -2
}

export abstract class Match {
    playerOne: Player;
    matchResult: MatchResult|null;

    constructor(playerOne: Player) {
        this.playerOne = playerOne;
        this.matchResult = null;
    }

    protected setMatch(opID:number, matchResult:MatchResult){
        this.playerOne.addResult(opID, matchResult);
    }
}

export class PlayerMatch extends Match {
    playerTwo: Player;

    constructor (playerOne: Player, playerTwo: Player) {
        super(playerOne);
        this.playerTwo = playerTwo;
    }

    scoreMatch(result: MatchResult): void {
        this.setMatch(this.playerTwo.getID(), result);
        this.playerTwo.addResult(this.playerOne.getID(), result.invert())
    }
}

abstract class SinglePlayerMatch extends Match {
    id: number;

    constructor(player:Player, id: number, matchResult:MatchResult ) {
        super(player)
        this.id = id;
        this.matchResult = matchResult;
    }

    scoreMatch(): void {
        this.setMatch(this.id, this.matchResult as MatchResult)
    }
}

export class ByeMatch extends SinglePlayerMatch {
    constructor(player:Player) {
        super(player, miscPairing.BYE, MatchResult.byeMatchResult());
    }
}

export class LateMatch extends SinglePlayerMatch {
    constructor(player:Player) {
        super(player, miscPairing.LATE, MatchResult.lateMatchResult());
    }
}