<script lang='ts'>

    import { onMount} from "svelte";
    import { getDuplicatedPlayers, getPairedplayers, getPairings, setUpRound } from "../lib/create";
    import Match from "../components/match.svelte";
    import { goToPage } from "../lib/utils";
    import { _ } from "ajv";

    //TODO create new round
    //TODO get round num
    //TODO change title and header
    //TODO Add player button
    //TODO calc Round 1 pairings

    let pairings: Array<Array<string>> = [];

    let createRound: HTMLButtonElement;


    async function finalisePairings() {
        for (const match of pairings) {
            console.log(match);
        }
    }
    // TODO pass down paired players to highligh players withoug pairing
    $: duplicatedPlayers = getDuplicatedPlayers(pairings);
    $: pairedPlayers = getPairedplayers(pairings);

    onMount(async () => {
        pairings = await getPairings();
        setUpRound();
    });
</script>

<h1>
    Create Round 
</h1>

{#each pairings as pairing}
    <Match bind:players={pairing} duplicatedPlayers={duplicatedPlayers} pairedPlayers={pairedPlayers}></Match>
{/each}

<button disabled={getDuplicatedPlayers(pairings).size < 0} on:click={finalisePairings} bind:this={createRound}> Finalise Pairings </button>

