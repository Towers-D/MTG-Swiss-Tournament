<script lang='ts'>
    import Database from "../db/database.svelte";
    import { deleteButton, goToButton, jsonButton, setUp } from "../lib/console";
    import { onMount } from "svelte";

    let database:Database;

    onMount(() => {
        setUp();
    });
</script>

<Database bind:this={database}></Database>

<h1>Tournament Console</h1>

<div id='buttons'>
    <button id="create" class="consoleButton" on:click={() => goToButton("lobby")}> Open Lobby </button>
    <button id="continue" class="consoleButton needsData" on:click={() => goToButton("round")}> Continue Round </button>
    <button id="standings" class="consoleButton needsData" on:click={() => goToButton("standings")}> View Standings </button>
    <button id="upload" class="consoleButton" on:click={database.addEntry}> Upload JSON </button>
    <button id="delete" class="consoleButton" on:click={database.viewPlayers}> Delete Storage </button>
</div>
