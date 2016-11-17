// Server
const app = require('express')();
const express = require('express');
const path = require('path');

// Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Routes
const middleware = require('./routes/middleware');
const game = require('./routes/game');

// API
const api = require('./methods/api');

const init = function() {

    http.listen(8080, function() {
        console.log(`listening on http://${process.env.C9_HOSTNAME}`);
    });

    app.use('/game', game);
    app.use('/', middleware);
    
    // Socket.io
    
    io.on('connection', function(socket) {
    socket.on('load', function(loadMessage) {
        console.log(loadMessage);
        io.emit('return', 'You have loaded the site');
    });

    socket.on('link click', function(target) {
        console.log("The user clicked ", target);
        api.getArticle(target)
            .then(article => {
                io.emit('link fetch', article);
            });
    });
});
};


module.exports = init;