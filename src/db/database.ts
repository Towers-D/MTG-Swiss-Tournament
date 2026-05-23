import { addRxPlugin, createRxDatabase, type RxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

//Player Collection
import { playerSchema } from './schemas/playerSchema';

//Get rid of annoying warning
import { disableWarnings } from 'rxdb/plugins/dev-mode';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
disableWarnings();

export function isData(): boolean{
    return false;
}

export function deleteDatabase(): void {
    console.log('deleted');
}

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
        
        const db = await createRxDatabase({
            name: 'tournament',
            storage
        });
    
        await db.addCollections({
            players: {
                schema: playerSchema
            }
        })
    
        return db;
    }

    async addPlayer(playerName: string): Promise<void> {
        const db = await this.getDB();
        db.players.insert({
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
}

export const database = new Database();