var init = require('./server/server.js');


init()




// var app = require('express')();
// var express = require('express');
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var cheerio = require('cheerio'); // html parsing/manipulation
// var fetch = require('node-fetch')

// function getArticle(title) {
//     return fetch(`https://en.wikipedia.org/wiki/${title}?action=render`)
//         .then(response => {
//             return response.text()
//         })
// }

// app.use('/files', express.static(__dirname + '/public'));

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/public/index.html');
// });

// io.on('connection', function(socket) {
//     socket.on('load', function(loadMessage) {
//         console.log(loadMessage)
//         io.emit('return', 'You have loaded the site');
//     });

//     socket.on('link click', function(target) {
//         console.log("The user clicked ", target)
//         getArticle(target)
//             .then(article => {
//                 io.emit('link fetch', article)
//             });
//     })
// });

// http.listen(8080, function() {
//     console.log(`listening on http://${process.env.C9_HOSTNAME}`);
// });
