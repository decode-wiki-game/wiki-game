// Server
const app = require('express')();
const express = require('express');
const path = require('path');

// Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Routes
const middleware = require('./routes/middleware')
const user = require('./routes/user')

// API
const api = require('./methods/api');
const fetch = require('node-fetch')

const init = function() {

    http.listen(8080, function() {
        console.log(`http://${process.env.C9_HOSTNAME}`);
    });


    app.use('/user', user);
    app.use('/', middleware);

    // Socket.io

    io.on('connection', function(socket) {


        var handshakeData = JSON.parse(socket.request._query.connectionData)

        var room = handshakeData.room;
        var player = handshakeData.player ? JSON.parse(handshakeData.player) : undefined;

        console.log("server::room:", room ? room : "null")
        console.log("server::player.username:", player ? player.username : "null")

        if (!player) {
            api.createPlayer()
                .then(player => {
                    player = player;
                    socket._player = player
                    socket.emit('createPlayer', JSON.stringify({
                        playerToken: player.token,
                        username: player.username,
                        id: player.id
                    }))
                    if (!room) {
                        api.createGame(player.id)
                            .then(game => {
                                room = game.slug;
                                socket._game = game
                                socket.join(room)
                                console.log("server::room:created", room)
                                socket.emit('createGame', {
                                    game: game
                                })
                            })
                    }
                    else {
                        socket.join(room);
                        api.findGameFromSlug(room)
                            .then(game => {
                                if (game) {
                                    socket._game = game
                                    socket.emit('joinRoom', {
                                        game: game
                                    })
                                    io.to(room).emit('playerJoinedRoom', {
                                        playerCount: io.sockets.adapter.rooms[room].length
                                    });
                                }
                            })
                    }
                });
        }
        else {
            socket._player = player
            if (!room) {
                api.createGame(player.id)
                    .then(game => {
                        room = game.slug;
                        socket._game = game
                        socket.join(room)
                        console.log("server::room:created", room)
                        socket.emit('createGame', {
                            game: game
                        })
                    })
            }
            else {
                socket.join(room);
                api.findGameFromSlug(room)
                    .then(game => {
                        if (game) {
                            socket._game = game
                            socket.emit('joinRoom', {
                                game: game
                            })
                            io.to(room).emit('playerJoinedRoom', {
                                playerCount: io.sockets.adapter.rooms[room].length
                            });
                        }
                        else {
                            socket.emit('noGameExists')
                        }
                    })
            }
        }


        socket.on('startGame', function(data) {
            api.startGame(data.adminId, data.gameId)
                .then(gameStarted => {
                    if (gameStarted) {
                        fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${data.targetSlug}&prop=extracts&exsentences=9&format=json`)
                            .then(result => result.json())
                            .then(response => {
                                var firstArticleId = Object.keys(response.query.pages)[0]
                                var extract = response.query.pages[firstArticleId].extract
                                io.to(room).emit('startGameSuccess', {
                                    extract: extract,
                                    gameStarted: gameStarted.gameStarted
                                })
                                api.loadIntialArticle(data.gameId)
                                    .then(article => {
                                        setTimeout(() => {
                                            io.to(room).emit('beginSprint', {
                                                article: article
                                            })
                                        }, 14500)
                                    })
                            })
                    }
                    else {
                        socket.emit('startGameFailure')
                    }
                })
        })

        socket.on('disconnect', function() {
            socket.leave(room);
            api.findGameFromSlug(room)
                .then(game => {
                    if (game) {
                        io.to(room).emit('playerLeftRoom');
                    }
                })

        });

        socket.on('link click', function(target) {
            Promise.all(
                    [
                        api.recordStep({
                            gameId: socket._game.id,
                            playerId: socket._player.id,
                            url: target
                        }),
                        api.getArticle(target)
                    ]
                )
                .then(results => {
                    if (target === socket._game.targetSlug) {
                        api.getVictoryInformation(socket._game.id)
                            .then(data => {
                                console.log("socket._player.usename is victorious", socket._player.username)
                                console.log("socket._player",socket._player)
                                console.log("socket._game",socket._game)
                                console.log("data", data)
                                io.to(room).emit("victory", {
                                    winner: socket._player.username,
                                    steps: data
                                })
                            })
                    }
                    else {
                        io.to(room).emit('playerStep', {
                            id: socket._player.id,
                            username: socket._player.username
                        })
                        socket.emit('link fetch', {
                            step: results[0].url,
                            article: results[1]
                        })
                    }
                });
        })

        socket.on('rematch', () => {
            api.createGame(socket._player.id)
                .then(game => {
                    socket._game = game
                    io.to(room).emit('rematch', {
                        game: game
                    })
                })

        })

        socket.on('changeName', (data) => {

            api.changeName(socket._player.id, data.newName)
                .then(confirmation => {
                    if (confirmation) {
                        socket._player.username = data.newName
                        socket.emit('nameChangeSuccess', {
                            newName: data.newName
                        })
                    }
                    else {
                        socket.emit('nameChangeFailure')
                    }
                })
        })
    });

};


module.exports = init;
