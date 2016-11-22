var steps = [
    {playerId: 1, url: 'Rugby'},
    {playerId: 2, url: 'Rugby'},
    {playerId: 1, url: 'Rugby'},
    {playerId: 2, url: 'Rugby'},
    {playerId: 1, url: 'Rugby'},
    {playerId: 2, url: 'Rugby'},
    {playerId: 3, url: 'Rugby'},
    {playerId: 3, url: 'Rugby'},
    {playerId: 3, url: 'Rugby'},
    ]
    
    var uniqueValues = [],
			players = [],
			l = steps.length,
			i;
		for (i = 0; i < l; i++) {
			if (uniqueValues[steps[i].playerId]) continue;
			uniqueValues[steps[i].playerId] = true;
			players.push({player: steps[i].playerId});
		}
		console.log(players)