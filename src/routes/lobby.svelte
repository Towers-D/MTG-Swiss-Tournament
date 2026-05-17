<script lang='ts'>
    import { setUp } from "../lib/lobby";
    import { onMount } from "svelte";

    onMount(() => {
        setUp();
    });
</script>

<h1>
    Tournament Lobby
</h1>