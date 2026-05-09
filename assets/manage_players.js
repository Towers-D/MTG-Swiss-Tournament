function addPlayer() {
    let playerName = $('#player_input').val();
    $('#player_input').val("");
    
    
    let id = new Hashes.MD5().hex(Date.now().toString());
    let player_cell = `<td> ${playerName} </td>`;
    let remove_cell = `<td> <button class="remove_player" onclick="removePlayer('${id}')"> Remove </button> </td>`

    $('#players tr:last').after(`<tr id="${id}">${player_cell}${remove_cell}</tr>`)

}

function removePlayer(id) {
    $(`#${id}`).remove();
}