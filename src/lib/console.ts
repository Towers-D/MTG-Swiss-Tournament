import { getCurrentRound, getCurrentStageInRound, uploadJSON } from "../db/database";
import { roundStage } from "../db/schemas/roundSchema";

export function jsonButton(): void {
    uploadJSON();
}

export function setUp() {
    document.title = "MTG Swiss Console";
}

export async function isLobbyEnabled(): Promise<boolean> {
    const CURR_ROUND:number = await getCurrentRound();
    if (CURR_ROUND === 0) {
        return true;
    }
    const CURR_STAGE:roundStage = await getCurrentStageInRound() as roundStage;
    return (CURR_STAGE === roundStage.LOBBY || CURR_STAGE === roundStage.COMPLETE) ? true : false;
}