function matchWin(winner, other_check, target_match) {
    other_cb = $('#' + other_check);
    target_pos = $('#' + target_match);
    if (!other_cb.is("[disabled]")) {
        let name = $('#' + winner).val();
        target_pos.val(name);
        other_cb.attr("disabled", true);
    }
    else {
        other_cb.removeAttr("disabled");
        target_pos.val("");
    }
}

function declareWinner(winner, other_check) {
    other_cb = $('#' + other_check);
    target_pos = $('#winner');
    if (!other_cb.is("[disabled]")) {
        let name = $('#' + winner).val();
        target_pos.text(name);
        other_cb.attr("disabled", true);
    }
    else {
        other_cb.removeAttr("disabled");
        target_pos.text("");
    }
}