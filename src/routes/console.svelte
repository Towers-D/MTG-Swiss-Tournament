<script lang='ts'>
    import Database from "../db/database.svelte";
    import { goToButton, jsonButton, setUp } from "../lib/console";
    import { onMount, tick } from "svelte";

    let database:Database;
    let hasData = false;

    async function refresh() {
        hasData = await database.dataExists()
    }

    onMount(async () => {
        setUp();

        //I dont think this is actually necessary but is here to make sure bind is ready
        await tick();

        await refresh();
    });

    
</script>

<Database bind:this={database}></Database>

<h1>Tournament Console</h1>

<div id='buttons'>
    <button id="create" disabled={hasData} class="consoleButton" on:click={() => goToButton("lobby")}> Open Lobby </button>
    <button id="continue" disabled={!hasData} class="consoleButton" on:click={() => goToButton("round")}> Continue Round </button>
    <button id="standings" disabled={!hasData} class="consoleButton" on:click={() => goToButton("standings")}> View Standings </button>
    <button id="upload" disabled={hasData} class="consoleButton" on:click={async () =>{ await database.addEntry(); await refresh();}}> Upload JSON </button>
    <button id="view" disabled={hasData} class="consoleButton" on:click={async () =>{ await database.viewPlayers(); await refresh();}}> Log Players </button>
    <button id="delete" disabled={!hasData} class="consoleButton" on:click={async () =>{ await database.deleteDatabase(); hasData = false;}}> Delete Storage </button>
</div>
