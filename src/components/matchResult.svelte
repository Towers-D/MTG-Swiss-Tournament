<script lang="ts">
    import { onMount } from "svelte";

    let options: Array<string> = [
        '2-1',
        '2-0',
        '1-0',
        '0-0',
        '0-1',
        '0-2',
        '1-2'
    ];
</script>

<select bind:value={options[3]}>
    {#each options as option }
        <option value = {option}>
            {option}
        </option>
    {/each}
</select>