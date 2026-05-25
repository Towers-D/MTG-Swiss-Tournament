<script lang="ts">
    import { onMount } from "svelte";
    import { getPlayerOptions, type PlayerOption } from "./playerChoice.service";

    export let selectedPlayer: string;
    let options: PlayerOption[];
    
    onMount(async() => {
        options = await getPlayerOptions();
        const exists = options.some(
            option => option.id === selectedPlayer
        );

        if (!exists && options.length > 0) {
            selectedPlayer = options[0].id;
        }
    })
</script>

<select bind:value={selectedPlayer}>
    {#each options as option }
        <option value = {option.id}>
            {option.name}
        </option>
    {/each}
</select>