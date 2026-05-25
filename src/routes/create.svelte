<script lang='ts'>

    import { onMount} from "svelte";
    import { getPairings, setUpRound } from "../lib/create";
    import Match from "../components/match.svelte";
    import { goToPage } from "../lib/utils";

    //TODO create new round
    //TODO get round num
    //TODO change title and header
    //TODO Add player button
    //TODO calc Round 1 pairings

    let pairings: Array<Array<string>> = [];

    async function finalisePairings() {
        for (const match of pairings) {
            console.log(match);
        }
    }

    onMount(async () => {
        setUpRound();
        pairings = await getPairings();
    });
</script>

<h1>
    Create Round 
</h1>

{#each pairings as pairing}
    <Match bind:players={pairing}></Match>
{/each}

<button on:click={finalisePairings}> Finalise Pairings </button>

