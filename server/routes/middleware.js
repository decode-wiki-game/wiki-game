const api = require("../methods/api")
const routes = require('express').Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path')

routes.use(bodyParser.urlencoded({
    extended: false
}), cookieParser());


routes.use('/', function(request, response, next) {
    if (!request.cookies.sessionId) {
        response.cookie('sessionId', api.createUser())
    }
    api.findPlayerFromSessionId(request.cookies.sessionId)
        .then(player => {
            console.log(`${player.username} visited the site.`);
            next();
        });
});

routes.use('/files', express.static(path.join(__dirname, '../../public')));

routes.get('/*', function(request, response) {
    response.sendFile(path.resolve('public/index.html'));
});

module.exports = routes;