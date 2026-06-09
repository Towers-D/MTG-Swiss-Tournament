<script lang='ts'>
    import { onMount } from "svelte";
    import { getCurrentRound } from "../db/database";

    let currRound = 0;

    onMount(async () => {
        currRound = await getCurrentRound();
    })
</script>

<h1> Round {currRound}</h1>