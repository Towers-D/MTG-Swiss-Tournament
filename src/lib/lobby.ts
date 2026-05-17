import {createJSON, isData } from "./Json.js";
import { PlayerTable } from "./PlayerTable.js";

document.addEventListener("DOMContentLoaded", () =>{
    if (isData() === true) {
        window.location.replace("/");
    }

    let playerTable = new PlayerTable("players", "player_input", "add_player", "player_count");
    document.getElementById("gen_round_one")?.addEventListener("click", () => {
        createJSON(playerTable.table.getRows());
        window.location.assign("/round");
    });
});