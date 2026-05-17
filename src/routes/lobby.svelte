<script lang='ts'>

    import { setUp } from "../lib/lobby";
    import { onMount } from "svelte";
    import PlayerTable from '../components/playerTable.svelte';

    let tableComponent: PlayerTable;
    let playerInput: HTMLInputElement;

    function keyTest(keyEvent:KeyboardEvent): void {
    if (keyEvent.key === "Enter") {
        passPlayer();
    }
}

    function passPlayer() {
        tableComponent.addPlayer(playerInput);
    }

    onMount(() => {
        setUp();
    });
</script>

<h1>
    Tournament Lobby
</h1>

<input on:keypress={keyTest} bind:this={playerInput} type="text"/>
<button on:click={passPlayer}>Add player</button>

<PlayerTable bind:this={tableComponent} />