<script lang='ts'>

    import { onMount} from "svelte";
    import { getDuplicatedPlayers, getPairedplayers, getPairings } from "../lib/create";
    import Match from "../components/match.svelte";
    import { goToPage } from "../lib/utils";
    import { _ } from "ajv";
    import { getCurrentRound } from "../db/database";

    //TODO create new round
    //TODO get round num
    //TODO change title and header
    //TODO Add player button
    //TODO calc Round 1 pairings

    let pairings: Array<Array<string>> = [];
    let nextRound = 0;

    $: duplicatedPlayers = getDuplicatedPlayers(pairings);
    $: pairedPlayers = getPairedplayers(pairings);

    onMount(async () => {
        pairings = await getPairings();
        const NEXT_ROUND = await getCurrentRound() + 1;
        document.title = `MTG Swiss Create Round ${NEXT_ROUND}`;
        nextRound = NEXT_ROUND;
    });
</script>

<h1>
    Create Round {nextRound}
</h1>

{#each pairings as pairing}
    <Match bind:players={pairing} duplicatedPlayers={duplicatedPlayers} pairedPlayers={pairedPlayers}></Match>
{/each}

<button disabled={getDuplicatedPlayers(pairings).size > 0} on:click={() => {goToPage('round')}}> Finalise Pairings </button>

