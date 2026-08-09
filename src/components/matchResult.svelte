<script lang="ts">
    import { onMount, tick } from "svelte";
    import { BYE_PLAYER, LATE_PLAYER, type Player } from "../db/schemas/playerSchema";

    export let players: Array<Player>;
    let selected:number = 4;
    let fixedMatch:boolean = false;

    let options: Array<string> = [
        '2-1',
        '2-0',
        '1-0',
        '1-1',
        '0-0',
        '0-1',
        '0-2',
        '1-2'
    ];

    onMount(() => {
        tick();
        switch (players[1].id) {
            case BYE_PLAYER.id:
                selected = 1;
                fixedMatch = true;
                break;
            case LATE_PLAYER.id:
                selected = 6;
                fixedMatch = true;
                break;
            default:
                break;
        }
    })
</script>

<select class:bye={selected===1} class:late={selected===5} bind:value={options[selected]} disabled={fixedMatch}>
    {#each options as option }
        <option  value = {option}>
            {option}
        </option>
    {/each}
</select>