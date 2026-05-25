<script lang="ts">
    import PlayerChoice from "./playerChoice.svelte";
    export let players: Array<string>;
</script>

<div class="match">
    {#each players as player, i}
        <PlayerChoice bind:selectedPlayer={player}></PlayerChoice>
        {#if i < players.length -1}
            <div> Vs. </div>
        {/if}
    {/each}
</div>