var steps = [{
    playerId: 1,
    url: 'Rugby'
}, {
    playerId: 2,
    url: 'Rugby'
}, {
    playerId: 1,
    url: 'Rugby'
}, {
    playerId: 2,
    url: 'Rugby'
}, {
    playerId: 1,
    url: 'Rugby'
}, {
    playerId: 2,
    url: 'Rugby'
}, {
    playerId: 3,
    url: 'Rugby'
}, {
    playerId: 3,
    url: 'Rugby'
}, {
    playerId: 3,
    url: 'Rugby'
}, ]

var uniqueValues = [],
    players = [],
    l = steps.length,
    i;
for (i = 0; i < l; i++) {
    if (uniqueValues[steps[i].playerId]) continue;
    uniqueValues[steps[i].playerId] = true;
    players.push({
        player: {
            id: steps[i].playerId,
            username: steps[i].username
        }
    });
}

players = players.map((player) => {
    return steps.filter((step) => {
        if (step.playerId === player.id) {
            console.log("math")
            return true;
        }
    })
})

console.log(players)
