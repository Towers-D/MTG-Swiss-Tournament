import { addRxPlugin } from 'rxdb';
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

export function initRxDB() {
    addRxPlugin(RxDBMigrationSchemaPlugin);
    if (import.meta.env.DEV) {
        addRxPlugin(RxDBDevModePlugin);
    }
}