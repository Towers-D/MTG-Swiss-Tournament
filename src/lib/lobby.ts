import { isData } from "../db/database";
import { goToPage } from "./utils";


// document.addEventListener("DOMContentLoaded", () =>{
//     if (isData() === true) {
//         window.location.replace("/");
//     }

//     let playerTable = new PlayerTable("players", "player_input", "add_player", "player_count");
//     document.getElementById("gen_round_one")?.addEventListener("click", () => {
//         createJSON(playerTable.table.getRows());
//         window.location.assign("/round");
//     });
// });

export function setUp() {
    document.title = "MTG Swiss Lobby";
    console.log('hello');
    if (isData()) {
        goToPage()
    }
}