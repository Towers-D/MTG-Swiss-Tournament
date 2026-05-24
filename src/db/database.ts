import { addRxPlugin, createRxDatabase, isRxCollection, type RxCollection, type RxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

//Player Collection
import { playerSchema } from './schemas/playerSchema';

//Get rid of annoying warning
import { disableWarnings } from 'rxdb/plugins/dev-mode';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
disableWarnings();

export function uploadJSON(): void {
    console.log('JSON');
}

const storage = wrappedValidateAjvStorage({
    storage: getRxStorageDexie()
})

class Database {
    private dbPromise: Promise<RxDatabase> | null = null;

    async getDB(): Promise<RxDatabase> {
        if(!this.dbPromise) {
            this.dbPromise = this.init();
        }
        return this.dbPromise;
    }

    private async init(): Promise<RxDatabase>{
        if (import.meta.env.DEV) {
            await import('rxdb/plugins/dev-mode').then(
                module => addRxPlugin(module.RxDBDevModePlugin)
            );
        }
        
        let db = await createRxDatabase({
            name: 'tournament',
            storage
        });
    
        db = await this.addEmpytCollections(db) as RxDatabase;

        return db;
    }

    async addPlayer(playerName: string): Promise<void> {
        const db = await this.getDB();
        await db.players.insert({
            id: crypto.randomUUID(),
            name: playerName
        })
    }

    async getPlayers() {
        const db = await this.getDB();
        const docs = await db.players.find().exec();

        const players = docs.map(player => player.toJSON())
        return players;
    }

    async dataExists(): Promise<boolean> {
        const collection:RxCollection = (await this.getDB()).players;
        if (isRxCollection(collection)){
            const count = await collection.count().exec()
            if (count > 0) {
                console.log(true)
                return true;
            }
        }
        console.log(false)
        return false;
    }

    async deleteDatabase() {
        const db = await this.getDB();
        await db.players.remove();
        await this.addEmpytCollections()
    }

    async addEmpytCollections(db:RxDatabase|null = null): Promise<RxDatabase|void> {
        const dbExists:boolean = (db !== null);
        if (!dbExists) {
            db = await this.getDB()
        }

        await (db as RxDatabase).addCollections({
            players: {
                schema: playerSchema
            }
        })
        if (dbExists) {
            return db as RxDatabase;
        }
    }
}

export const database = new Database();