<script lang="ts">
    import { onMount } from "svelte";
    import {
        finalisePairings,
        getDuplicatedPlayers,
        getPairedplayers,
        getPairings,
    } from "../lib/create";
    import Match from "../components/match.svelte";
    import { _ } from "ajv";
    import { addRound, getCurrentRound, hasRoundStarted } from "../db/database";

    //TODO Add player button
    //TODO drop player button

    let pairings: Array<Array<string>> = [];
    let nextRound = 0;

    $: duplicatedPlayers = getDuplicatedPlayers(pairings);
    $: pairedPlayers = getPairedplayers(pairings);

    //TODO Stop rounds adding whenever page is entered
    onMount(async () => {
        if (!(await hasRoundStarted())) {
            await console.log("addRound");
            await addRound();
        }

        pairings = await getPairings();
        const NEXT_ROUND = await getCurrentRound();
        document.title = `MTG Swiss Create Round ${NEXT_ROUND}`;
        nextRound = NEXT_ROUND;
    });
</script>

<h1>
    Create Round {nextRound}
</h1>

{#each pairings as pairing}
    <Match bind:players={pairing} {duplicatedPlayers} {pairedPlayers}></Match>
{/each}

<button
    disabled={getDuplicatedPlayers(pairings).size > 0}
    on:click={() => {
        finalisePairings(pairings);
    }}
>
    Finalise Pairings
</button>
