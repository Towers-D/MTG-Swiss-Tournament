import { addMatch, addPlayer, getCurrentRound } from "../db/database";
import { LATE_PLAYER } from "../db/schemas/playerSchema";
import { sanitise } from "./utils";

export async function addLateRegistration(playerInput:HTMLInputElement) {
    let playerName = sanitise(playerInput.value);
    if (playerName.length > 0) {
        if (playerName.length <= 25) {
            const PLAYER_ID = await addPlayer(playerName);
            const CURR_ROUND = await getCurrentRound();

            const MATCH_IDS = new Array<String>();

            for (let i = 0; i < CURR_ROUND; i++) {
                MATCH_IDS.push(await addMatch([PLAYER_ID, LATE_PLAYER.id], i));
                
            }
            // Add Match

            // Add matches for previous rounds 

            playerInput.value = "";
            playerInput.focus();
        }
        else {
            //TODO add warning that name is too long 
        }
    }
}