// Routes
const api = require("../methods/api")
const routes = require('express').Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// This route is used by the App.jsx component to find the player info and pass it on to its children (a poor man's redux)

routes.use(bodyParser.urlencoded({
    extended: false
}), cookieParser());

routes.get('/', (request, response) => {
    var playerToken = request.headers['x-usertoken']
    api.findPlayerFromSessionId(playerToken)
        .then(player => {
            response.status(200).json({ player: player });
        })
});

module.exports = routes;