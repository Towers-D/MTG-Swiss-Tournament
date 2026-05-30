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

export function getPairedplayers(pairings:Array<Array<string>>): Set<String> {
    const PLAYERS:Set<String> = new Set<String>();
    for (const PAIRING of pairings) {
        for (const PLAYER of PAIRING) {
            PLAYERS.add(PLAYER);
        }
    }
    return PLAYERS;
}

export function getDuplicatedPlayers(pairings:Array<Array<string>>): Set<String> {
    const COUNTS:Map<String, number> = new Map<String, number>()

    for (const PAIRING of pairings) {
        for (const PLAYER of PAIRING) {
            COUNTS.set(PLAYER, (COUNTS.get(PLAYER) ?? 0) + 1);
        }
    }

    const DUPLICATED_PLAYERS:Set<String> = new Set(
        [...COUNTS.entries()].filter(
            ([_,count]) => count > 1
        ).map(
            (([player]) => player)
        )
    )

    

    return DUPLICATED_PLAYERS;
}