<script lang="ts">
    import { onMount } from "svelte";
    import { getPlayerObjbyID, getPlayersInMatch } from "../db/database";
    import type { Match } from "../db/schemas/matchSchema";
    import MatchResult from "./matchResult.svelte";
    import type { Player } from "../db/schemas/playerSchema";
    import { randomColour } from "../lib/utils";

    export let match: Match;
    let playersInMatch: Array<Player>;

    onMount(async () => {
        playersInMatch = await getPlayersInMatch(match.id);
    });
</script>

{#if playersInMatch}
    <div style="color: {randomColour()};" id={match.id} class="matchContainer">
        {#each playersInMatch as player, i}
            <div
                class:bye={player.id === "-1"}
                class:late={player.id === "-2"}
                style="width: 5em;"
            >
                {player.name}
            </div>
            {#if i < playersInMatch.length - 1}
                <div style={"padding: 0 1em;"}>Vs.</div>
            {/if}
        {/each}
        <br />
        <MatchResult players={playersInMatch}></MatchResult>
    </div>
    <br />
{/if}
