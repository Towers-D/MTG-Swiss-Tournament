<script lang='ts'>
    import { dataExists, deleteDatabase, isCurrentRoundEmpty, _logCollection, MTGColllections, _deleteCollection, isCurrentRoundStage, advanceStage, getCurrentStageInRound} from "../db/database";
    import { goToButton, isLobbyEnabled, jsonButton, setUp } from "../lib/console";
    import { onMount, tick } from "svelte";
    import { initPlayers } from "../lib/dev/consoleDev";
    import { roundStage } from "../db/schemas/roundSchema";

    let isLobbyDisabled = false;
    let isContinueDisabled = false;
    let isStandingsDisabled = false;
    let isUploadDisabled = false;
    let isDeleteDisabled = false;



    async function refresh() {
        isLobbyDisabled = await !isLobbyEnabled();
        isContinueDisabled = !(await isCurrentRoundStage(roundStage.MATCHES) || await isCurrentRoundStage(roundStage.PAIRINGS));
        isStandingsDisabled = true;
        isUploadDisabled = await dataExists();
        isDeleteDisabled = !isUploadDisabled;
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
    <button id="create" disabled={isLobbyDisabled} class="consoleButton" on:click={() => goToButton("lobby")}> Open Lobby </button>
    <button id="continue" disabled={isContinueDisabled} class="consoleButton" on:click={async () => goToButton(await isCurrentRoundEmpty() ? "create" : "round")}> Continue Round </button>
    <button id="standings" disabled={isStandingsDisabled} class="consoleButton" on:click={() => goToButton("standings")}> View Standings </button>
    <button id="upload" disabled={isUploadDisabled} class="consoleButton" on:click={jsonButton}> Upload JSON </button>
    <button id="delete" disabled={isDeleteDisabled} class="consoleButton" on:click={async () =>{ await deleteDatabase(); await refresh()}}> Delete Storage </button>
</div>

{#if import.meta.env.DEV}
    <div id='DevButtons'>
        <div>
            Log: 
            <button on:click={async () => {await _logCollection(MTGColllections.Player)}}>   Players </button>
            <button on:click={async () => {await _logCollection(MTGColllections.Round)}}>    Rounds  </button>
            <button on:click={async () => {await _logCollection(MTGColllections.Match)}}>    Matches </button>
            <button disabled on:click={async () => {await _logCollection(MTGColllections.Result)}}>   Results </button>
        </div>
        <div>
            Delete: 
            <button on:click={async () => {await _deleteCollection(MTGColllections.Player)}}> Players </button>
            <button on:click={async () => {await _deleteCollection(MTGColllections.Round)}}> Rounds </button>
            <button on:click={async () => {await _deleteCollection(MTGColllections.Match)}}> Matches </button>
            <button disabled on:click={async () => {await _deleteCollection(MTGColllections.Result)}}> Results </button>
        </div>
        <div>
            Initialise: 
            <button on:click={async () => {await initPlayers(); refresh()}}> Players </button>
            <button on:click={async () => {}}> Rounds </button>
            <button on:click={async () => {}}> Matches </button>
            <button disabled on:click={async () => {}}> Results </button>
        </div>
        <div>
            Round Stage:
            <button on:click={async () =>  {console.log(await getCurrentStageInRound())}}>Log</button>
            <button on:click={async () => {await advanceStage(); refresh();}}>Advance</button>
        </div>
    </div>
{/if}