import { shuffleArray } from "rxdb";
import { getPlayerList } from "../db/database";
import { range } from "./utils";
import Match from "../components/match.svelte";

export function setUpRound() {
    document.title = "MTG Swiss Round";
}

export function getPairings() {
    return getRoundOnePairings();
}

async function getRoundOnePairings(): Promise<Array<Array<string>>> {
    const players = await getPlayerList();
    const playerIds = players.map(player => player.id);
    
    let idxs = range(playerIds.length);
    idxs = shuffleArray(idxs);

    const pairings = new Array<Array<string>>()

    for (let i = 0; i < idxs.length; i += 2) {
        const pairing = new Array<string>();
        pairing.push(playerIds[idxs[i]]);
        pairing.push(playerIds[idxs[i+1]]);
        pairings.push(pairing)
    }

    return pairings;
}