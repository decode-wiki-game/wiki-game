var secureRandom = require('secure-random');
var fetch = require('node-fetch');
var request = require('request');


var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'yaroncnk',
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
                console.log("destination is", destination[0])
                return destination[0].address;
            });
    },
    //show who the players are
    findPlayers: function() {
        knex.select().from('player')
            .then(results => {
                console.log(results);
            })
            .catch(error => {
                console.log(error);
            });
    },
    //show what games are played
    findGames: function() {
        knex.select().from('game')
            .then(results => {
                console.log(results);
            })
            .catch(error => {
                console.log(error);
            });
    },
    createUser: function() {
        var token = this.createSessionToken();
        var username = this.createUsername();
        knex('player').insert({
                sessionId: token,
                username: username
            })
            .then(result => {
                return "User created";
            });
        return token;

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
    // /game/create creating a new game
    createGame: function(playerId) {
        var gameSlug = this.createSlug();
         return Promise.all([this.firstPageURL2(), this.selectArticle()])
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
    // /game/:slug/make-public   making a game public
    makePublic: function(id) {

        knex('game').where({
            id: id
        }).insert({
            isPublic: 1
        });
    },
    // /lobbies checking public lobbies
    lobbies: function() {
        knex('game').where({
                isPublic: 1
            }).select('id', 'adminId')
            .then(results => {
                return results;
            })
            .catch(error => {
                return error;
            });
    },
    getArticle: function (title) {
    return fetch(`https://en.wikipedia.org/wiki/${title}?action=render`)
        .then(response => {
            return response.text();
        });
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
                        return null
                    }
                })
    },
    //This gets the first page's url using request (not being used).
    firstPageURL: function() {
        request('https://en.wikipedia.org/wiki/Special:Random', function(error, response, body) {
            if (!error) {
                 // Show link for the random first page. 
                console.log(response.request.uri.href);
                return response.request.uri.href; 
                
            }
            
        
        });
    },
    //This gets the first page's url using fetch. 
    firstPageURL2: function() {
      return  fetch('https://en.wikipedia.org/wiki/Special:Random')
            .then(response => response.url);
                
    }
};

module.exports = api;