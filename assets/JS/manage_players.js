var table = null;

$("#add_player").on("click", function(){
    let playerName = $('#player_input').val();
    $('#player_input').val("");
    let rowID = new Hashes.MD5().hex(Date.now().toString());
    table.addRow({id: rowID, name: playerName, remove: "X"});
});

function removePlayer(e, cell) {
    table.deleteRow(cell.getRow());
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
});