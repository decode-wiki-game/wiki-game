//This is going to be our data base queries/Express.js file for the backend

//This section imports the libraries and start the connection
var express = require('express');
var app = express();
var secureRandom = require('secure-random');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());



var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'yaroncnk',
        password: '',
        database: 'wikisprint'
    }
});

// Middleware to check whether there's a user token or not.
// var tokenOwner = function(req, res, next) {
//     if (gameAPI.hasToken) {
//         next();
//     }
//     else {
//         gameAPI.createToken();
//         next();

//     }
// };

app.use('/', function(request, response, next) {
    if (!request.cookies.sessionId) {
        response.cookie('sessionId', gameAPI.createToken())
    }
    console.log("Someone visited the site. Their cookies: ", request.cookies)
    gameAPI.findPlayerFromSessionId(request.cookies.sessionId)
        .then(player => {
            request.player = player;
            next();
        })

})

app.listen(process.env.PORT || 8080, function() {
    console.log('Server started: ', `http://${process.env.C9_HOSTNAME}`);
});

app.get('/', function(request, response) {
    response.send("Congratulations " + request.player.username)
})

//creating a random token

function createSessionToken() {
    return secureRandom.randomArray(100).map(code => code.toString(36)).join('');
}

function createSlug() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);
}

function createUsername() {
    var a = ["Dark", "Funny", "Boring", "Small", "Blue", "Ugly", "Big", "Lazy", "Cool", "Smart", "Grey", "Red", "Bright", "Naive", "Royal", "Impatient"];
    var b = ["Melon", "Apple", "Kiwi", "Lizard", "Bear", "Dog", "Banana", "Dragon", "Cat", "Bird", "Snake", "Moose", "Skunk", "Racoon", "Tiger"];

    var rA = Math.floor(Math.random() * a.length);
    var rB = Math.floor(Math.random() * b.length);
    var name = a[rA] + " " + b[rB];
    return name;
}

var gameAPI = {
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


    ///creating a token for the first time

    createToken: function() {
        var token = createSessionToken();
        var username = createUsername();
        knex('player').insert({
            sessionId: token,
            username: username
        })
        return token
    },
    /// endpoint 1: / universal route to ensure user has a token
    findPlayerFromSessionId: function(sessionId) {
        return knex.select('player.id', 'player.username')
            .from('player')
            .where('player.sessionId', sessionId)
            .then(results => {
                return results[0];
            })
            .catch(error => {
                return ('something went wrong:', error);
            });
    },
    ///endpoint 2: /game/create creating a new game
    createGame: function() {
        var gameSlug = createSlug();
        knex('game').insert({
            slug: gameSlug,
            adminId: '?'
        });
    },

    ///endpoint 3: /game/:slug/make-public   making a game public

    makePublic: function(id) {

        knex('game').where({
            id: id
        }).insert({
            isPublic: 1
        });

    },
    ///endpoint 4: /lobbies checking public lobbies
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
};


/*
//This will create a game and return gameId, slug, and adminId.
app.get('/game/create', function(req, res) {

    gameAPI.createGame(function(err, content) {
        if (err) {
            res.status(400).send('Something went wrong:' + err.stack);
        }
        else {
            return {
                //build an object here
            };

        }
    });
});

//This will make a game public. 
app.get('/game/:slug/make-public', function(req, res) {

    gameAPI.createGame(function(err, content) {
        if (err) {
            res.status(400).send('Something went wrong:' + err.stack);
        }
        else {
            return {
                //build an object here
            };

        }
    });
});

//This will return an array of public lobbies. Each lobby object will contain a slug and plyerId. 
app.get('/lobbies', function(req, res) {

    gameAPI.createGame(function(err, content) {
        if (err) {
            res.status(400).send('Something went wrong:' + err.stack);
        }
        else {
            return {
                //build an object here
            };

        }
    });
});

*/
