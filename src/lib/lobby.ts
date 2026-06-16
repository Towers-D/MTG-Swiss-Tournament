import "tabulator-tables/dist/css/tabulator.min.css";
import { addRound, getCurrentRound, getCurrentStageInRound, isCurrentRoundStage } from "../db/database";
import { roundStage } from "../db/schemas/roundSchema";

export async function setUpLobby() {
    document.title = "MTG Swiss Lobby";

    const ROUND = await getCurrentRound();
    if (!ROUND || await isCurrentRoundStage(roundStage.COMPLETE)){
        addRound();
    }
}