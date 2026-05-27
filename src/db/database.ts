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
    const db = await createRxDatabase({
        name: 'tournament',
        storage: getRxStorageDexie()
    });

    await db.addCollections({
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

    return db;
}

export async function deleteDatabase() {
    const db = await getDB();
    const collections: Array<RxCollection> = await Object.values(db.collections);

    for (const collection of collections) {
        const docs = await collection.find().exec()
        await Promise.all(
            docs.map(doc => doc.remove())
        )
    }
}

// #### RESULT FUNCTIONS

// #### MATCH FUNCTIONS
export async function addMatch(playerCount:number = 2): Promise<String> {
    const db: RxDatabase = await getDB();
    const UUID = crypto.randomUUID()
    await db.players.insert({
        id: UUID,
        numPlayers: playerCount,
        round: await getCurrentRound(),
    })
    return UUID;
}


// #### ROUND FUNCTIONS
export async function hasRoundStarted(): Promise<boolean> {
    const db: RxDatabase = await getDB();
    const currentRound: number = await getCurrentRound();

    const matchesInRound = await db.matches.find({
        selector: {
            round: currentRound
        }
    }).exec();

    return matchesInRound.length > 0 ? true : false;
}

export async function getCurrentRound(): Promise<number> {
    const db: RxDatabase = await getDB();
    const rounds = await db.rounds.find().exec();
    return await rounds.length;
}

export async function addRound() {
    const db: RxDatabase = await getDB();
    const newRound: number = 1 + await getCurrentRound();

    await db.rounds.insert({
        roundNum: newRound,
        date: new Date().toISOString()
    })
}

// #### PLAYER FUNCTIONS

/**
 * 
 * @param playerName 
 * @returns a `string` that is the players UUID for use of removal
 */
export async function addPlayer(playerName: string): Promise<string> {
    const db = await getDB();
    const UUID = crypto.randomUUID()
    await db.players.insert({
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
    const db = await getDB();
    const player = db.players.findOne(playerID);
    if (player) {
        await player.remove();
    }
}

export async function getPlayers() {
    const db = await getDB();
    const docs = await db.players.find().exec();

    const players = docs.map(player => player.toJSON())
    return players;
}

export async function getPlayerList() {
    let players = await getPlayers();

    if (players.length % 2 !== 0) {
        players.push({ id: -1, name: "Bye" });
    }
    return players;
}






export async function dataExists(): Promise<boolean> {
    const db = await getDB();
    const collections: Array<RxCollection> = await Object.values(db.collections);

    for (const collection of collections) {
        const count = await collection.count().exec()
        if (count > 0) {
            return true;
        }
    }
    console.log(false)
    return false;
}