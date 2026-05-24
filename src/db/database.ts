import { addRxPlugin, createRxDatabase, isRxCollection, type RxCollection, type RxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

//Player Collection
import { playerSchema } from './schemas/playerSchema';

//Get rid of annoying warning
import { disableWarnings } from 'rxdb/plugins/dev-mode';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
disableWarnings();

if (import.meta.env.DEV) {
    await import('rxdb/plugins/dev-mode').then(
        module => addRxPlugin(module.RxDBDevModePlugin)
    );
}

export function uploadJSON(): void {
    console.log('JSON');
}
let dbPromise: Promise<RxDatabase>|null = null;

export async function getDB() {
    if (!dbPromise) {
        dbPromise = _create();
    }
    return dbPromise;
}

const _create = async () => {
    const db = await createRxDatabase({
        name: 'tournament',
        storage: wrappedValidateAjvStorage({
            storage: getRxStorageDexie()
        })
    });

    await db.addCollections({
        players: {
            schema: playerSchema
        }
    });

    return db;
}

export async function deleteDatabase() {
    const db = await getDB();
    const collections:Array<RxCollection> = await Object.values(db.collections);

    for (const collection of collections) {
        const docs = await collection.find().exec()
        await Promise.all(
            docs.map(doc => doc.remove())
        )
    }
}


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
export async function removePlayer(playerID:string): Promise<void> {
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

export async function dataExists(): Promise<boolean> {
    const db = await getDB();
    const collections:Array<RxCollection> = await Object.values(db.collections);

    for (const collection of collections) {
        const count = await collection.count().exec()
        if (count > 0) {
            return true;
        }
    }
    console.log(false)
    return false;
}