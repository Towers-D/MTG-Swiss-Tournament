export class MatchResult {
    readonly WINS: number;
    readonly LOSSES: number;

    constructor(wins: number, losses: number) {
        this.WINS = wins;
        this.LOSSES = losses;
    }

    static byeMatch(){
        return new MatchResult(2, 0);
    }

    static lateMatch(){
        return new MatchResult(0, 2);
    }

    invert() {
        return new MatchResult(this.LOSSES, this.WINS);
    }

    isDraw() {
        return (this.WINS === this.LOSSES);
    }
}