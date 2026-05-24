<script lang='ts'>
    import { database } from "./database";


    let count = 0;

    export async function addEntry(): Promise<void> {
        await database.addPlayer("bob" + count++);
    }

    export function viewPlayers() {
        console.log(database.getPlayers())
    }

    export async function dataExists(): Promise<boolean>{
        return await database.dataExists();
    }

    export function deleteDatabase(): void {
        database.deleteDatabase();
    }


</script>