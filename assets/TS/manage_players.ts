import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

const TABLE:Tabulator = new Tabulator("#players", {
    responsiveLayout: true,
    height:"311px",
    columns:[
        {title:"Name", field:"name"},
        {title:"Remove", field:"remove", hozAlign:"center", cellClick:removePlayer}
    ],
});


/**
 * Adds a player to the players table, then
 */
function addPlayer(): void {
    let player_entry:HTMLInputElement = document.getElementById("player_input") as HTMLInputElement;
    let value:string = player_entry.value;
    if (value.length === 0) {
        TABLE.addRow({name: sanitise(value), remove: "X"});
        player_entry.value = "";
        player_entry.focus();
        updatePlayerCount();
    }
}

/**
 * Removes a player from the players table, then updates count
 */
function removePlayer(e, cell): void {
    TABLE.deleteRow(cell.getRow());
    updatePlayerCount();
}

/**
 * Called when adding or removing players from the table, changes the value of the player_count div.
 */
function updatePlayerCount(): void {
    (document.getElementById('player_count') as HTMLDivElement).textContent = TABLE.getRows().length;
}


// Bind adding players to clicking the add_player button and hitting enter when in the player_input textbox
(document.getElementById('add_player') as HTMLButtonElement).addEventListener("click", addPlayer);
(document.getElementById('player_input') as HTMLInputElement).addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addPlayer();
    }
});


// 
/**
 * Santises an input string from special characters.
 * 
 * @remarks
 * Modified from Matt Hyde here: {@link https://stackoverflow.com/a/48226843}
 * 
 * @param input - A string to be sanitised.
 * @returns `input` with the special characters [&, <, >, ", ', /, `, ;] replaced/removed.
 */
function sanitise(input:string): string {
    const MAP:Map<string, string> = new Map();
    MAP.set('&', '&amp;');
    MAP.set('<', '&lt;');
    MAP.set('>', '&gt;');
    MAP.set('"', '&quot;');
    MAP.set("'", '&#x27;');
    MAP.set('/', '&#x2F;');
    MAP.set('`', '&grave;');
    MAP.set(';', "");

    const REG:RegExp = /[&<>"'/;`]/ig;
    return input.replace(REG, (match) => MAP.get(match) as string);
}