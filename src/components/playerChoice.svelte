<script lang="ts">
    import { onMount } from "svelte";
    import { getPlayerOptions, type PlayerOption } from "./playerChoice.service";

    export let selectedPlayer: string;
    let options: PlayerOption[] = [];
    export let duplicate:boolean = false;
    export let pairedPlayers:Set<String>;

    $: sortedOptions = [...options].sort((playerA, playerB) => {
        return playerA.name.localeCompare(playerB.name);
    });
    
    onMount(async() => {
        options = await getPlayerOptions();
        const exists = options.some(
            option => option.id === selectedPlayer
        );

        if (!exists && options.length > 0) {
            selectedPlayer = options[0].id;
        }
    })
</script>

<select style="width:10em;" class:duplicate bind:value={selectedPlayer}>
    {#each sortedOptions as option }
        <option value = {option.id} class:missing={!pairedPlayers.has(option.id)}>
            {option.name}
            {duplicate ? "⚠️" : ""}
        </option>
    {/each}
</select>

<style>
    .duplicate {
        border: 2px solid red;
    }

    .missing {
        color: aquamarine;
    }
</style>