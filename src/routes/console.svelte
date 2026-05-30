<script lang='ts'>
    import { dataExists, deleteDatabase, getPlayers, hasRoundStarted } from "../db/database";
    import { goToButton, jsonButton, setUp } from "../lib/console";
    import { onMount, tick } from "svelte";

    let hasData = false;

    async function refresh() {
        hasData = await dataExists()
    }

    onMount(async () => {
        setUp();

        //I dont think this is actually necessary but is here to make sure bind is ready
        await tick();

        await refresh();
    });

    
</script>

<h1>Tournament Console</h1>

<div id='buttons'>
    <button id="create" disabled={hasData} class="consoleButton" on:click={() => goToButton("lobby")}> Open Lobby </button>
    <!-- TODO continue should decide whether to go to creation or round based on the existence of the match -->
    <button id="continue" disabled={!hasData} class="consoleButton" on:click={async () => goToButton(await hasRoundStarted() ? "round" : "create")}> Continue Round </button>
    <button id="standings" disabled={!hasData} class="consoleButton" on:click={() => goToButton("standings")}> View Standings </button>
    <button id="upload" disabled={hasData} class="consoleButton" on:click={jsonButton}> Upload JSON </button>
    <button id="view" disabled={hasData} class="consoleButton" on:click={async () =>{ await console.log(getPlayers()); await refresh();}}> Log Players </button>
    <button id="delete" disabled={!hasData} class="consoleButton" on:click={async () =>{ await deleteDatabase(); await refresh();}}> Delete Storage </button>
</div>
