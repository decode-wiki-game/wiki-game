// Routes
const api = require("../methods/api")
const routes = require('express').Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

routes.use(bodyParser.urlencoded({
    extended: false
}), cookieParser());

routes.get('/', (request, response) => {
  response.status(200).json({ message: 'Connected!' });
});

routes.get('/create', (request, response) => {
    var playerToken = request.headers['x-usertoken']
    api.findPlayerFromSessionId(playerToken)
        .then(player => {
            api.createGame(player.id)
                .then(game=> {
                    response.status(200).json({ game: game });
                })
        })
});



module.exports = routes;