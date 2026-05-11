import { Tabulator } from "tabulator-tables";
import { $ } from 'jquery';
function addPlayer() {
    let player_entry = $("#player_input");
    if (player_entry.val()) {
        TABLE.addRow({ name: player_entry.val(), remove: "X" });
        player_entry.val("");
        player_entry.trigger("focus");
        updatePlayerCount();
    }
}
function updatePlayerCount() {
    playerCounter.text(TABLE.getRows().length);
}
// Modified from Matt Hyde here: https://stackoverflow.com/a/48226843
function sanitise(input) {
    const MAP = new Map();
    MAP.set('&', '&amp;');
    MAP.set('<', '&lt;');
    MAP.set('>', '&gt;');
    MAP.set('"', '&quot;');
    MAP.set("'", '&#x27;');
    MAP.set('/', '&#x2F;');
    MAP.set('`', '&grave;');
    const REG = /[&<>"'/`]/ig;
    return input.replace(REG, (match) => (MAP[match]));
}
jQuery(function () {
    TABLE = new Tabulator("#players", {
        responsiveLayout: true,
        height: "311px",
        columns: [
            { title: "Name", field: "name" },
            { title: "Remove", field: "remove", hozAlign: "center", cellClick: removePlayer }
        ],
    });
    playerCounter = $("#player_Count");
});
