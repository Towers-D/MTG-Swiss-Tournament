<script lang='ts'>

    import { setUp } from "../lib/lobby";
    import { onMount } from "svelte";
    import PlayerTable from '../components/playerTable.svelte';
    import Database from "../db/database.svelte";
    import { goToPage } from "../lib/utils";

    let tableComponent: PlayerTable;
    let playerInput: HTMLInputElement;
    let database:Database;

    function keyTest(keyEvent:KeyboardEvent): void {
    if (keyEvent.key === "Enter") {
        passPlayer();
    }
}

    function passPlayer() {
        tableComponent.addPlayer(playerInput);
    }

    onMount(async () => {
        if (await database.dataExists()) {
            goToPage()
        }
    });
</script>

<Database bind:this={database}></Database>

<h1>
    Tournament Lobby
</h1>

<input on:keypress={keyTest} bind:this={playerInput} type="text"/>
<button on:click={passPlayer}>Add player</button>
<button on:click={database.viewPlayers}>log players</button>

<PlayerTable bind:this={tableComponent} />