import { TabulatorFull as Tabulator } from "tabulator-tables";
import { $, jQuery } from 'jquery';
import "tabulator-tables/dist/css/tabulator.min.css";

const PLAYER_COUNTER:JQuery<HTMLDivElement> = $("#player_Count");
const TABLE:Tabulator = new Tabulator("#players", {
    responsiveLayout: true,
    height:"311px",
    columns:[
        {title:"Name", field:"name"},
        {title:"Remove", field:"remove", hozAlign:"center", cellClick:removePlayer}
    ],
});

function addPlayer() {
    let player_entry:JQuery<HTMLInputElement> = $("#player_input");
    if (player_entry.val()) {
        TABLE.addRow({name: sanitise(player_entry.val() as string), remove: "X"});
        player_entry.val("");
        player_entry.trigger("focus");
        updatePlayerCount();
    }
}

function updatePlayerCount() {
    PLAYER_COUNTER.text(TABLE.getRows().length);
}

$("#add_player").on("click", addPlayer);

$("#player_input").on("keypress", function(e) {
    if (e.which === 13) {
        addPlayer();
    }
});

function removePlayer(e, cell) {
    TABLE.deleteRow(cell.getRow());
    updatePlayerCount();
}

// Modified from Matt Hyde here: https://stackoverflow.com/a/48226843
function sanitise(input:string) {
    const MAP:Map<string, string> = new Map();
    MAP.set('&', '&amp;');
    MAP.set('<', '&lt;');
    MAP.set('>', '&gt;');
    MAP.set('"', '&quot;');
    MAP.set("'", '&#x27;');
    MAP.set('/', '&#x2F;');
    MAP.set('`', '&grave;');

    const REG:RegExp = /[&<>"'/`]/ig;
    return input.replace(REG, (match) => MAP.get(match) as string);
}