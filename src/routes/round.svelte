<script lang='ts'>
    import { onMount } from "svelte";
    import { getCurrentRound, getMatchesInCurrentRound } from "../db/database";
    import type { Match } from "../db/schemas/matchSchema";
    import MatchContainer from "../components/matchContainer.svelte";

    let currRound = 0;
    let matches:Array<Match> = [];

    onMount(async () => {
        currRound = await getCurrentRound();
        matches = await getMatchesInCurrentRound();

        for (const MATCH of matches) {
            await console.log(MATCH);
        }
    })
</script>

<h1> Round {currRound}</h1>

{#each matches as match}
    <MatchContainer  match={match}></MatchContainer>
{/each}