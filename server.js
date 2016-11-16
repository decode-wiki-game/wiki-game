var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var wiki = require('wikipedia-js');
var cheerio = require('cheerio'); // html parsing/manipulation


app.use('/files', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
    socket.on('load', function(data) {
        console.log(data);
        io.emit('return', 'You have loaded the site');
    });

    socket.on('link click', function(target) {
        console.log("The user clicked ", target)

        var search = {
            query: target,
            format: 'html',
        }

        wiki.searchArticle(search, function(err, article) {
            if (err) {
                console.log(err)
            }
            else {
                // console.log("article is: ", article)
                // var $ = cheerio.load(article);
                // $('ref').remove()
                io.emit('link fetch', article)
            }
        })
    })
});

http.listen(8080, function() {
    console.log(`listening on http://${process.env.C9_HOSTNAME}`);
});
