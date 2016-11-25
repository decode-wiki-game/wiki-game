var secureRandom = require('secure-random');
var fetch = require('node-fetch');


var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'us-cdbr-iron-east-04.cleardb.net' || 'localhost',
        user: process.env.CLEARDB_DATABASE_USERNAME || '',
        password: process.env.CLEARDB_DATABASE_PASSWORD || '',
        database: process.env.CLEARDB_DATABASE_NAME || 'wikisprint'
    }
});

var api = {

    createUsername: function() {
        var a = ["Dark", "Funny", "Boring", "Small", "Blue", "Ugly", "Big", "Lazy", "Cool", "Smart", "Grey", "Red", "Bright", "Naive", "Royal", "Impatient"];
        var b = ["Melon", "Apple", "Kiwi", "Lizard", "Bear", "Dog", "Banana", "Dragon", "Cat", "Bird", "Snake", "Moose", "Skunk", "Racoon", "Tiger"];

        var rA = Math.floor(Math.random() * a.length);
        var rB = Math.floor(Math.random() * b.length);
        var name = a[rA] + " " + b[rB];
        return name;
    },
    randomizeNumber: function() {
        var num = Math.floor((Math.random() * 70) + 1);
        return num;
    },
    createSlug: function() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);
    },
    createSessionToken: function() {
        return secureRandom.randomArray(100).map(code => code.toString(36)).join('');
    },
    selectArticle: function() {
        var randomArticle = this.randomizeNumber();
        return knex.select()
            .from('target')
            .where('target.id', randomArticle)
            .then(destination => {
                return destination[0];
            });
    },
    createPlayer: function() {
        var token = this.createSessionToken();
        var username = this.createUsername();
        return knex('player').insert({
                sessionId: token,
                username: username
            })
            .then(playerId => {
                return {
                    token: token,
                    username: username,
                    id: playerId[0]
                }
            })
    },
    findPlayerFromSessionId: function(sessionId) {
        return (knex.select('player.id', 'player.username')
                .from('player')
                .where('player.sessionId', sessionId))
            .then(results => {
                return results[0];
            })
            .catch(error => {
                return ('something went wrong:', error);
            });
    },
    randomPageInfo: function() {
        var id;
        return fetch('https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json')
            .then(res => res.json())
            .then(parsedData => {
                id = (parsedData.query.random[0].id).toString();
                return fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=${id}&inprop=url%7Cdisplaytitle&format=json`)
                    .then(res => res.json())
                    .then(parsedObj => {
                        var info = parsedObj.query.pages[id];
                        return info;
                    });
            });
    },
    createGame: function(playerId) {
        var gameSlug = this.createSlug();
        return Promise.all([this.randomPageInfo(), this.selectArticle()])
            .then(arrayOfResolutions => {
                var url = arrayOfResolutions[0].fullurl;
                var startSlug = url.substr(url.lastIndexOf('/') + 1);
                return knex('game').insert({
                        slug: gameSlug,
                        adminId: playerId,
                        isPublic: 0,
                        gameStarted: null,
                        startTitle: arrayOfResolutions[0].title,
                        startSlug: startSlug,
                        targetTitle: arrayOfResolutions[1].title,
                        targetSlug: arrayOfResolutions[1].slug,
                        finalStep: null,
                        createdAt: knex.fn.now()
                    })
                    .then(gameId => {
                        return knex.select('game.id', 'game.adminId', 'game.slug', 'game.isPublic', 'game.gameStarted', 'game.startTitle', 'game.startSlug', 'game.targetTitle', 'game.targetSlug', 'game.finalStep')
                            .from('game')
                            .where('game.id', gameId);
                    })
                    .then(gameArray => {
                        return gameArray[0];
                    });
            });

    },
    getArticle: function(title) {
        return Promise.all(
                [
                this.getPrettyTitle(title),
                fetch(`https://en.wikipedia.org/wiki/${title}?action=render`).then(response => response.text())
                ]
            )
            .then(article => {
                return {
                    title: article[0],
                    content: article[1]
                }
            })
    },
    getPrettyTitle: function(target) {
        return fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${target}&format=json`)
        .then(response => response.json())
        .then(response => {
            var articleId = Object.keys(response.query.pages)[0];
            return response.query.pages[articleId].title;
        })
        
    },
    findGameFromSlug: function(slug) {
        return knex.select('game.id', 'game.adminId', 'game.slug', 'game.isPublic', 'game.gameStarted', 'game.startSlug', 'game.startTitle', 'game.targetTitle', 'game.targetSlug', 'game.finalStep', 'game.createdAt')
            .from('game')
            .where('game.slug', slug)
            .then(game => {
                if (game.length) {
                    return game[0]
                }
                else {
                    return "no game found"
                }
            })
    },
    findGameFromId: function(gameId) {
        return knex.select('game.id', 'game.adminId', 'game.slug', 'game.isPublic', 'game.gameStarted', 'game.startSlug', 'game.startTitle', 'game.targetTitle', 'game.targetSlug', 'game.finalStep', 'game.createdAt')
            .from('game')
            .where('game.id', gameId)
            .then(game => {
                if (game.length) {
                    return game[0]
                }
                else {
                    return "no game found"
                }
            })
    },
    startGame: function(adminId, gameId) {
        return knex('game')
            .update({
                'gameStarted': knex.fn.now()
            })
            .where({
                'game.id': gameId,
                'game.adminId': adminId
            })
            .then(hasStarted => {
                hasStarted = hasStarted;
                return knex.select('game.gameStarted')
                    .from('game')
                    .where({
                        'game.id': gameId,
                        'game.adminId': adminId
                    })
                    .then(result => result[0])
            })
    },

    getFirstPageURL: function() {
        return fetch('https://en.wikipedia.org/wiki/Special:Random')
            .then(response => response.url);
    },
    loadIntialArticle: function(gameId) {
        return this.findGameFromId(gameId)
            .then(game => {
                return this.getArticle(game.startSlug)
            });
    },
    joinGame: function(playerToken, gameSlug) {
        var player, game;

        return Promise.all([this.findPlayerFromSessionId(playerToken), this.findGameFromSlug(gameSlug)])
            .then(playerGameArray => {

                player = playerGameArray[0];
                game = playerGameArray[1];

                return ({
                    player: player,
                    game: game
                })
            })
            .then(playerGameObj => {
                return knex('game_player')
                    .insert({
                        playerId: playerGameObj.player.id,
                        gameId: playerGameObj.game.id
                    })
                    .then(result => {
                        return knex('game_player')
                            .count('gameId as playerCount')
                            .where('gameId', playerGameObj.game.id);
                    })
                    .then(playerCountArray => playerCountArray[0])
                    .then(playerCount => {
                        return {
                            player: player,
                            game: game,
                            playerCount: playerCount.playerCount
                        };
                    });
            });
    },
    recordStep: function(step) {
        return knex('step')
            .insert({
                gameId: step.gameId,
                playerId: step.playerId,
                url: step.url,
                time: knex.fn.now()
            })
            .then(stepId => {
                return knex.select()
                    .from('step')
                    .where('step.id', stepId)
            })
            .then(array => array[0])

    },
    getVictoryInformation: function(gameId) {
        return knex.select('step.playerId', 'step.url', 'step.time', 'player.username')
            .from('step')
            .join('player', 'step.playerId', 'player.id')
            .where('step.gameId', gameId)
            .orderBy('step.time', 'asc')
    },
    changeName: function(id, name) {
        return knex('player')
            .where('player.id', id)
            .update({
                username: name
            })
    }
};

module.exports = api;
