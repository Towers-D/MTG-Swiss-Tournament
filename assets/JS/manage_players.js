var table = null;
var playerCounter = null;

function addPlayer(){
    let player_entry = $('#player_input');
    if (player_entry.val()){
        table.addRow({name: player_entry.val(), remove: "X"});
        player_entry.val("");
        player_entry.focus();
        updatePlayerCount();
    }
}

$("#add_player").on("click", addPlayer);
$("#player_input").on("keypress", function(e) {
    if (e.which === 13) {
        addPlayer();
    }
});

$("#gen_round_one").on("click", generateJSON)

function removePlayer(e, cell) {
    table.deleteRow(cell.getRow());
    updatePlayerCount();
}

function updatePlayerCount(){
    playerCounter.text(table.getRows().length);
}

function generateJSON(){
    var rows = table.getRows();
    rows.forEach((row) => {var name = row.getCell("name").getValue(); console.log(name)})
}

$(document).ready(function(){
    table = new Tabulator("#players", {
        responsiveLayout: true,
        height:"311px",
        columns:[
            {title:"Name", field:"name"},
            {title:"Remove", field:"remove", hozAlign:"center", cellClick:removePlayer}
        ],
    });

    playerCounter = $("#player_count");


});