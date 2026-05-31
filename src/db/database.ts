import { initRxDB } from './rxdb-init';
initRxDB()

import { addRxPlugin, createRxDatabase, isRxCollection, type RxCollection, type RxDatabase, type RxDocument } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';


//Player Collection
import { playerSchema } from './schemas/playerSchema';

//Get rid of annoying warning
import { disableWarnings } from 'rxdb/plugins/dev-mode';
import { roundSchema } from './schemas/roundSchema';
import { matchSchema } from './schemas/matchSchema';
import { playerMigrations } from './migrations/playerMigrations';
import { roundMigrations } from './migrations/roundMigrations';
import { matchMigrations } from './migrations/matchMigrations';
import { resultSchema } from './schemas/resultSchema';
import { resultMigrations } from './migrations/resultMigrations';
disableWarnings();


import { wrappedValidateAjvStorage  } from 'rxdb/plugins/validate-ajv';


export enum MTGColllections {
    Player = "players",
    Round = "rounds",
    Match = "matches",
    Result = "results"
} 


export function uploadJSON(): void {
    console.log('JSON');
}
let dbPromise: Promise<RxDatabase> | null = null;

export async function getDB() {
    await indexedDB.deleteDatabase("tournament");
    if (!dbPromise) {
        dbPromise = _create();
    }
    return dbPromise;
}

const _create = async () => {
    const DB = await createRxDatabase({
        name: 'tournament',
        storage: wrappedValidateAjvStorage({
            storage: getRxStorageDexie()
        })
    });

    await DB.addCollections({
        players: {
            schema: playerSchema,
            migrationStrategies: playerMigrations
        },
        rounds: {
            schema: roundSchema,
            migrationStrategies: roundMigrations
        },
        matches: {
            schema: matchSchema,
            migrationStrategies: matchMigrations
        },
        results: {
            schema: resultSchema,
            migrationStrategies: resultMigrations
        }
    });

    return DB;
}



// ### Utility Functions
async function _getNames() {
    const DB = await getDB();
    return await Object.keys(DB.collections);
}

async function _getDocsFromCollection(collection:MTGColllections) {
    const DB = await getDB();
    const COLLECTION = await DB.collections[collection]
    const DOCS = await COLLECTION.find().exec();
    return DOCS;
}

async function getCollection(collection:MTGColllections) {
    const DOCS = await _getDocsFromCollection(collection);
    return await DOCS.map(matches => matches.toJSON());
}

export async function _logCollection(collection:MTGColllections) {
    const JSON = await getCollection(collection);
    console.log(JSON);
}

export async function _deleteCollection(collection:MTGColllections) {
    const DOCS = await _getDocsFromCollection(collection)
    await Promise.all(DOCS.map(doc => doc.remove()));
}

export async function collectionHasDocs(collection:MTGColllections): Promise<boolean> {
    const DOCS = await _getDocsFromCollection(collection);
    return DOCS.length > 0 ? true : false;
}

export async function deleteDatabase(): Promise<boolean> {
    const NAMES: Array<string> = await _getNames();
    NAMES.map(async (name) => {await _deleteCollection(name as MTGColllections)});
    return true;
}

export async function dataExists(): Promise<boolean> {
    const NAMES: Array<string> = await _getNames();
    for (const NAME of NAMES) {
        if (await collectionHasDocs(NAME as MTGColllections)) {
            return true;
        }
    }
    return false;
}

// #### RESULT FUNCTIONS

// #### MATCH FUNCTIONS
export async function addMatch(playerIDs:Array<String>): Promise<String> {
    const DB: RxDatabase = await getDB();
    const UUID = crypto.randomUUID()
    await DB.matches.insert({
        id: UUID,
        playersInMatch: playerIDs,
        round: await getCurrentRound(),
    })
    return UUID;
}

async function _countResultsInMatch(match:RxDocument): Promise<number> {
    const DB: RxDatabase = await getDB();

    return await DB.results.count({
        selector: {
            fk_matchID: match.primary
        }
    }).exec();
}



// #### ROUND FUNCTIONS
export async function addRound() {
    const DB: RxDatabase = await getDB();
    const newRound: number = await getCurrentRound() + 1;

    await DB.rounds.insert({
        roundNum: newRound,
        date: new Date().toLocaleDateString()
    })
}

export async function needNewRound() {
    const ROUND_NUMBER = await getCurrentRound();
    if (ROUND_NUMBER === 0) {
        return true;
    }
    return await _roundFinished();
}

async function _roundFinished(): Promise<boolean> {
    if (await isCurrentRoundEmpty()) {
        return false;
    }

    const MATCHES = await _getMatchesInRound(await getCurrentRound());
    for (const MATCH of MATCHES) {
        const RESULTS:number = await _countResultsInMatch(MATCH);
        const NUM_PLAYERS:number = await MATCH.get('playersInMatch').length

        if (NUM_PLAYERS > RESULTS) {
            return false;
        }
    }
    return true;
}

async function _getMatchesInRound(roundNum:number) {
    const DB: RxDatabase = await getDB();

    return await DB.matches.find({
        selector: {
            round: roundNum
        }
    }).exec();
}

export async function isCurrentRoundEmpty(): Promise<boolean> {
    return await isRoundEmpty(await getCurrentRound());
}

export async function isRoundEmpty(roundNum:number): Promise<boolean> {
    const matchesInRound = await _getMatchesInRound(roundNum);
    return await matchesInRound.length === 0 ? true : false;
}

export async function getCurrentRound(): Promise<number> {
    const DB: RxDatabase = await getDB();
    const rounds = await DB.rounds.find().exec();
    return await rounds.length;
}

// #### PLAYER FUNCTIONS

/**
 * 
 * @param playerName 
 * @returns a `string` that is the players UUID for use of removal
 */
export async function addPlayer(playerName: string): Promise<string> {
    const DB = await getDB();
    const UUID = crypto.randomUUID()
    await DB.players.insert({
        id: UUID,
        name: playerName
    })
    return UUID;
}

/**
 * 
 * @param playerID 
 */
export async function removePlayer(playerID: string): Promise<void> {
    const DB = await getDB();
    const player = DB.players.findOne(playerID);
    if (player) {
        await player.remove();
    }
}

export async function getPlayerList() {
    let players = await getCollection(MTGColllections.Player);

    if (players.length % 2 !== 0) {
        players.push({ id: -1, name: "Bye" });
    }
    return players;
}


