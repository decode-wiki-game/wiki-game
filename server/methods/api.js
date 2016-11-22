var secureRandom = require('secure-random');
var fetch = require('node-fetch');


var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'simon2828',
        password: '',
        database: 'wikisprint'
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
        var num = Math.floor((Math.random() * 13) + 1);
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
        return knex.select('wiki_destination.address')
            .from('wiki_destination')
            .where('wiki_destination.id', randomArticle)
            .then(destination => {
                return destination[0].address;
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
    createGame: function(playerId) {
        var gameSlug = this.createSlug();
        return Promise.all([this.getFirstPageURL(), this.selectArticle()])
            .then(arrayOfResolutions => {
                return knex('game').insert({
                        slug: gameSlug,
                        adminId: playerId,
                        isPublic: 0,
                        gameStarted: null,
                        startingURL: arrayOfResolutions[0],
                        endURL: arrayOfResolutions[1],
                        finalStep: null,
                        createdAt: knex.fn.now()
                    })
                    .then(gameId => {
                        return knex.select('game.id', 'game.adminId', 'game.slug', 'game.isPublic', 'game.gameStarted', 'game.startingURL', 'game.endURL', 'game.finalStep')
                            .from('game')
                            .where('game.id', gameId);
                    })
                    .then(gameArray => {
                        return gameArray[0];
                    });
            });

    },
    getArticle: function(title) {
        return fetch(`https://en.wikipedia.org/wiki/${title}?action=render`)
            .then(response => {
                return response.text()
            })
    },
    findGameFromSlug: function(slug) {
        return knex.select('game.id', 'game.adminId', 'game.slug', 'game.isPublic', 'game.gameStarted', 'game.startingURL', 'game.endURL', 'game.finalStep', 'game.createdAt')
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
    loadIntialArticle: function(slug) {
        return this.findGameFromSlug(slug)
            .then(game => {
                var title = game.startingURL.substr(game.startingURL.lastIndexOf('/') + 1)
                return this.getArticle(title)
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
        console.log("Step", step)
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
            .orderBy('step.time', 'desc')
    }
};

module.exports = api;
