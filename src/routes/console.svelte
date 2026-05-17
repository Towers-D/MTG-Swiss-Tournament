<script lang='ts'>
    import { setUp } from "../lib/console";
    import { deleteDatabase } from "../db/database";
    import { goToPage } from "../lib/utils";
    import { onMount } from "svelte";

    onMount(() => {
        setUp();
    });
</script>

<h1>Tournament Console</h1>

<div id='buttons'>
    <button id="create" class="consoleButton" on:click={() => goToPage("lobby")}> Open Lobby </button>
    <button id="continue" class="consoleButton needsData" on:click={() => goToPage("lobby")}> Continue Round </button>
    <button id="standings" class="consoleButton needsData" on:click={() => goToPage("lobby")}> View Standings </button>
    <button id="upload" class="consoleButton" on:click={() => console.log("json")}> Upload JSON </button>
    <button id="delete" class="consoleButton needsData" on:click={deleteDatabase}> Delete Storage </button>
</div>
