<script lang='ts'>
    import { onMount } from "svelte";
    import { PlayerTable } from "./playerTable.service";


    let tableElement:HTMLDivElement;
    let playerCounter:HTMLDivElement;
    let table:PlayerTable;

    onMount(() => {
        table = new PlayerTable(tableElement, playerCounter);
    });

    export function addPlayer(playerInput:HTMLInputElement): void {
        return table.addPlayer(playerInput);
    }
</script>

<div bind:this={tableElement}></div>
<span>Number of Players: <div bind:this={playerCounter}>0</div></span>