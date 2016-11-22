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
        console.log(`listening on http://${process.env.C9_HOSTNAME}`);
    });


    app.use('/user', user);
    app.use('/', middleware);

    // Socket.io

    io.on('connection', function(socket) {
        socket.on('load', function(loadMessage) {
            console.log(loadMessage);
            io.emit('return', 'You have loaded the site');
        });

        var handshakeData = JSON.parse(socket.request._query.connectionData)

        var room = handshakeData.room;
        var player = handshakeData.player ? JSON.parse(handshakeData.player) : undefined;

        console.log("server::room", room)
        console.log("server::player", player)

        if (!player) {
            api.createPlayer()
                .then(player => {
                    player = player;
                    socket.emit('createPlayer', JSON.stringify({
                        playerToken: player.token,
                        username: player.username,
                        id: player.id
                    }))
                    if (!room) {
                        api.createGame(player.id)
                            .then(game => {
                                room = game.slug;
                                socket.join(room)
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
        else if (!room) {
            api.createGame(player.id)
                .then(game => {
                    room = game.slug;
                    socket.join(room)
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
            console.log("current room size: ", io.sockets.adapter.rooms[room].length)
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


        socket.on('startGame', function(data) {
            api.startGame(data.adminId, data.gameId)
                .then(gameStarted => {
                    if (gameStarted) {
                        fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${data.targetSlug}&prop=extracts&exintro=1&format=json`)
                            .then(result => result.json())
                            .then(response => {
                                var firstArticleId = Object.keys(response.query.pages)[0]
                                var extract = response.query.pages[firstArticleId].extract
                                io.to(room).emit('startGameSuccess', {
                                    extract: extract,
                                    gameStarted: gameStarted.gameStarted
                                })
                            })
                    }
                    else {
                        socket.emit('startGameFailure')
                    }
                })
        })


        socket.on('link click', function(target) {
            api.getArticle(target)
                .then(article => {
                    io.emit('link fetch', article)
                });
        })
    });

};


module.exports = init;
