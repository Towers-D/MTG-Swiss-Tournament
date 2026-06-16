import { getCurrentRound, getCurrentStageInRound, uploadJSON } from "../db/database";
import { roundStage } from "../db/schemas/roundSchema";
import { goToPage } from "./utils";

export function goToButton(page:string): void {
    goToPage(page);
    //resetButtons();
}

export function jsonButton(): void {
    uploadJSON();
    //resetButtons();
}

export function setUp() {
    document.title = "MTG Swiss Console";
    //resetButtons();
}

export async function isLobbyEnabled(): Promise<boolean> {
    const CURR_ROUND:number = await getCurrentRound();
    if (CURR_ROUND === 0) {
        return true;
    }
    const CURR_STAGE:roundStage = await getCurrentStageInRound();
    
    return (CURR_STAGE === roundStage.LOBBY || CURR_STAGE === roundStage.COMPLETE) ? true : false;
}