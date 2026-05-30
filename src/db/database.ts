import { addRxPlugin, createRxDatabase, isRxCollection, type RxCollection, type RxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

//Migration plugin for when schemas change
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema';
addRxPlugin(RxDBMigrationSchemaPlugin);

//Player Collection
import { playerSchema } from './schemas/playerSchema';

//Get rid of annoying warning
import { disableWarnings } from 'rxdb/plugins/dev-mode';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { roundSchema } from './schemas/roundSchema';
import { matchSchema } from './schemas/matchSchema';
import { playerMigrations } from './migrations/playerMigrations';
import { roundMigrations } from './migrations/roundMigrations';
import { matchMigrations } from './migrations/matchMigrations';
disableWarnings();

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
    if (!dbPromise) {
        dbPromise = _create();
    }
    return dbPromise;
}

const _create = async () => {
    const DB = await createRxDatabase({
        name: 'tournament',
        storage: getRxStorageDexie()
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
    });

    return DB;
}



// ### Utility Functions
async function _getDocsFromCollection(collection:MTGColllections) {
    const DB = await getDB();
    const COLLECTION = await DB.collections[collection]
    const DOCS = await COLLECTION.find().exec();
    return DOCS;
}

async function getCollection(collection:MTGColllections) {
    const DOCS = await _getDocsFromCollection(collection);

    const JSON = await DOCS.map(matches => matches.toJSON());
    return JSON;
}

export async function _logCollection(collection:MTGColllections) {
    const JSON = await getCollection(collection);
    console.log(JSON);
}

export async function _deleteCollection(collection:MTGColllections) {
    const DB = await getDB();
    const COLLECTION = await DB.collections[collection];
    const DOCS = await COLLECTION.find().exec();
    await DOCS.map(doc => doc.remove());
}

export async function collectionHasDocs(collection:MTGColllections): Promise<boolean> {
    const DOCS = await _getDocsFromCollection(collection);
    return DOCS.length > 0 ? true : false;
}

export async function deleteDatabase(): Promise<boolean> {
    const DB = await getDB();
    const NAMES: Array<string> = await Object.keys(DB.collections);

    for (const NAME of NAMES) {
        await _deleteCollection(NAME as MTGColllections)
    }
    return true;
}

export async function dataExists(): Promise<boolean> {
    const DB = await getDB();
    const NAMES: Array<string> = await Object.keys(DB.collections);

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
        round: await getCurrentRound() + 1,
    })
    return UUID;
}


// #### ROUND FUNCTIONS
export async function addRound() {
    const DB: RxDatabase = await getDB();
    const newRound: number = 1 + await getCurrentRound();

    await DB.rounds.insert({
        roundNum: newRound,
        date: new Date().toISOString()
    })
}

export async function hasRoundStarted(): Promise<boolean> {
    const DB: RxDatabase = await getDB();
    const currentRound: number = await getCurrentRound();

    const matchesInRound = await DB.matches.find({
        selector: {
            round: currentRound
        }
    }).exec();

    return matchesInRound.length > 0 ? true : false;
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


