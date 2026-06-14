import { addMatch, addPlayer, addResult, getCurrentRound, getMatchObjbyID } from "../db/database";
import { LATE_PLAYER } from "../db/schemas/playerSchema";
import { sanitise } from "./utils";

export async function addLateRegistration(playerInput:HTMLInputElement) {
    let playerName = sanitise(playerInput.value);
    if (playerName.length > 0) {
        if (playerName.length <= 25) {
            const PLAYER_ID = await addPlayer(playerName);
            const CURR_ROUND = await getCurrentRound();

            const LATE_PLAYER_ARRAY = [PLAYER_ID, LATE_PLAYER.id];

            for (let i = 1; i < CURR_ROUND; i++) {
                const MATCH_ID = await addMatch(LATE_PLAYER_ARRAY, i);
                await addResult(PLAYER_ID, MATCH_ID, 0, 2)
            }

            const MATCH_IN_CURR_ROUND = await addMatch(LATE_PLAYER_ARRAY, CURR_ROUND);

            // Add matches for previous rounds 

            playerInput.value = "";
            playerInput.focus();
            return await getMatchObjbyID(MATCH_IN_CURR_ROUND);
        }
        else {
            //TODO add warning that name is too long 
        }
    }
}