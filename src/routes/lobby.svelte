<script lang='ts'>

import { setUpLobby } from "../lib/lobby";
import { onMount } from "svelte";
import PlayerTable from '../components/playerTable.svelte';

import { goToPage } from "../lib/utils";
import { sanitise } from "../lib/utils";
    import { addPlayer, dataExists, getPlayers } from "../db/database";

let tableComponent: PlayerTable;
let playerInput: HTMLInputElement;

function keyTest(keyEvent:KeyboardEvent): void {
    if (keyEvent.key === "Enter") {
        passPlayer();
    }
}

async function passPlayer() {
    let playerName = sanitise(playerInput.value);
    if (playerName.length > 0) {
        if (playerName.length <= 25) {
            const UUID = await addPlayer(playerName);
            await console.log(getPlayers());
            tableComponent.addPlayer(playerName, UUID);
            playerInput.value = "";
            playerInput.focus();
        }
        else {
            //TODO add warning that name is too long 
        }
    }
}

onMount(async () => {
    if (await dataExists()) {
        goToPage()
    }
    setUpLobby();
});
</script>

<h1>
    Tournament Lobby
</h1>

<input on:keypress={keyTest} bind:this={playerInput} type="text"/>
<button on:click={passPlayer}>Add player</button>
<button on:click={getPlayers}>log players</button>

<PlayerTable bind:this={tableComponent} />