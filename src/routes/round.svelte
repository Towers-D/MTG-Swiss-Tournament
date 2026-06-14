<script lang="ts">
    import { onMount } from "svelte";
    import { getCurrentRound, getMatchesInCurrentRound } from "../db/database";
    import type { Match } from "../db/schemas/matchSchema";
    import MatchContainer from "../components/matchContainer.svelte";
    import { addLateRegistration } from "../lib/round";

    let currRound = 0;
    let playerInput: HTMLInputElement;
    let matches: Array<Match> = [];

    async function keyTest(keyEvent: KeyboardEvent) {
        if (keyEvent.key === "Enter") {
            await addAndUpdate(playerInput);
        }
    }

    async function addAndUpdate(playerID: HTMLInputElement) {
        const NEW_MATCH = await addLateRegistration(playerID);
        if (NEW_MATCH) {
            //matches.push(NEW_MATCH);
            matches = [...matches, NEW_MATCH]
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
    <button on:click={() => addAndUpdate(playerInput)}>Add Late Registration</button>
</div>

{#each matches as match}
    <MatchContainer {match}></MatchContainer>
{/each}
