// Routes
const api = require("../methods/api")
const routes = require('express').Router();

// Socket.io
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});



module.exports = routes;