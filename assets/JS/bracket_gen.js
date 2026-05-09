function genBracket() {
    players = [
        [1, $('#first').val(), false],
        [2, $('#second').val(), false],
        [3, $('#third').val(), false],
        [4, $('#fourth').val(), false],
        [5, $('#fifth').val(), false],
        [6, $('#sixth').val(), false],
        [7, $('#seventh').val(), false],
        [8, $('#eigth').val(), false]
    ]
    

    let groupA = [getPlayer(players, 1)];
    let groupB = [getPlayer(players, 2)];
    let groupC = [];
    let groupD = [];

    let isThirdInA = getRandomInt(0, 1) === 0;

    if (isThirdInA) {
        groupC.push(getPlayer(players, 3))
        groupD.push(getPlayer(players, 4))
    }
    else {
        groupC.push(getPlayer(players, 4))
        groupD.push(getPlayer(players, 3))
    }

    let playingSecond = getRandomInt(4, 8);
    groupB.push(getPlayer(players, playingSecond));
    

    let groupBDTotal = groupD[0][0];
    groupB.forEach(player => {
        groupBDTotal += player[0];
    });

    let lastPos = 18 - groupBDTotal;
    groupD.push(getPlayer(players, lastPos))


    remaining = [];
    players.forEach(player => {
        if (player[2] === false) {
            remaining.push(player);
        }
    });

    let playingFirst = getRandomInt(0, 1);
    groupA.push(remaining[playingFirst]);
    groupC.push(remaining[1 - playingFirst]);

    $("#A1").val(groupA[0][1])
    $("#A2").val(groupA[1][1])

    $("#B1").val(groupB[0][1])
    $("#B2").val(groupB[1][1])

    $("#C1").val(groupC[0][1])
    $("#C2").val(groupC[1][1])

    $("#D1").val(groupD[0][1])
    $("#D2").val(groupD[1][1])

    console.log(groupA);
    console.log(groupB);
    console.log(groupC);
    console.log(groupD);

}

function getPlayer(players, position) {
    index = position -1;
    players[index][2] = true;
    return players[index];
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)

}