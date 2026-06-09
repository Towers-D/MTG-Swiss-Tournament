<script lang="ts">
    import PlayerChoice from "./playerChoice.svelte";
    export let players: Array<string>;
    export let duplicatedPlayers:Set<String>
    export let pairedPlayers:Set<String>
</script>

<div class="pairing">
    {#each players as player, i}
        <PlayerChoice bind:selectedPlayer={player} duplicate={duplicatedPlayers.has(player)} pairedPlayers={pairedPlayers}></PlayerChoice>
        {#if i < players.length -1}
            <div style={"padding: 0 1em;"}> Vs. </div>
        {/if}
    {/each}
</div>