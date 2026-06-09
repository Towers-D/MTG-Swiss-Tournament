<script lang="ts">
    import { onMount } from "svelte";
    import { getCurrentRound, getMatchesInCurrentRound } from "../db/database";
    import type { Match } from "../db/schemas/matchSchema";
    import MatchContainer from "../components/matchContainer.svelte";
    import { addLateRegistration } from "../lib/round";

    let currRound = 0;
    let playerInput: HTMLInputElement;
    let matches: Array<Match> = [];

    function keyTest(keyEvent: KeyboardEvent): void {
        if (keyEvent.key === "Enter") {
            addLateRegistration(playerInput);
        }
    }

    onMount(async () => {
        currRound = await getCurrentRound();
        matches = await getMatchesInCurrentRound();
    });
</script>

<h1>Round {currRound}</h1>
<div>
    <input bind:this={playerInput} />
    <button on:click={() => {addLateRegistration(playerInput)}}>Add Late Registration</button>
</div>

{#each matches as match}
    <MatchContainer {match}></MatchContainer>
{/each}
