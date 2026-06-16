<script lang="ts">
    import { onMount } from "svelte";
    import {
        finalisePairings,
        getDuplicatedPlayers,
        getPairedplayers,
        getPairings,
    } from "../lib/pairings";
    import Pairing from "../components/pairing.svelte";
    import { addRound, getCurrentRound, needNewRound } from "../db/database";

    //TODO Add player button
    //TODO drop player button

    let pairings: Array<Array<string>> = [];
    let nextRound = 0;

    $: duplicatedPlayers = getDuplicatedPlayers(pairings);
    $: pairedPlayers = getPairedplayers(pairings);

    onMount(async () => {

        pairings = await getPairings();
        nextRound = await getCurrentRound();
        document.title = `MTG Swiss Create Round ${nextRound}`;
    });
</script>

<h1>
    Create Round {nextRound}
</h1>

{#each pairings as pairing}
    <Pairing bind:players={pairing} {duplicatedPlayers} {pairedPlayers}></Pairing>
{/each}

<button
    disabled={getDuplicatedPlayers(pairings).size > 0}
    on:click={() => {
        finalisePairings(pairings);
    }}
>
    Finalise Pairings
</button>
