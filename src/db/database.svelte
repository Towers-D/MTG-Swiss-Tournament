<script lang='ts'>
    import { onMount } from "svelte";
    import { database } from "./database";


    let count = 0;

    export function addEntry(): void {
        database.addPlayer("bob" + count++);
    }

    export function viewPlayers() {
        console.log(database.getPlayers())
    }


</script>