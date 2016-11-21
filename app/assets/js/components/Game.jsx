/* global io fetch */

import React from 'react';
import Article from './Article'
import Lobby from './Lobby'
import Sidebar from './Sidebar'
var socket = io.connect('/', {
	query: `connectionData=${
				JSON.stringify({
					room: window.location.pathname.substr(1),
					player: window.localStorage.player
				})
			}`
});


export default class Game extends React.Component {

	constructor() {
		super();
		this.state = {
			article: '',
			game: null,
			player: window.localStorage.player ? JSON.parse(window.localStorage.player) : undefined,
			playerCount: 1
		};
		this._startGame = this._startGame.bind(this)
	}

	componentDidMount() {

		socket.on('createPlayer', (player) => {
			window.localStorage.player = player;
			this.setState({
				player: JSON.parse(player)
			});
		});

		socket.on('playerJoinedRoom', (data) => {
			this.setState({
				playerCount: data.playerCount
			});
		});

		socket.on('joinRoom', (data) => {
			this.setState({
				game: data.game
			});
		});

		socket.on('createGame', (data) => {
			this.setState({
				game: data.game
			});
			this.props.router.push(`/${data.game.slug}`);
		});

		socket.on('noGameExists', () => {
			this.props.router.push('/');
			this.forceUpdate(); //TODO create a new game instance after re-route
		});

		socket.on('startGameSuccess', (data) => {
			var updatedGame = this.state.game;
			updatedGame.gameStarted = data.gameStarted
			this.setState({
				game: updatedGame
			});
		});

		socket.on('link fetch', (result) => {
			this.setState({
				article: result
			});
			window.scrollTo(0, 0);
		});
	}

	_updateLinks() {
		var elements = document.getElementsByTagName('a');
		for (var i = 0, len = elements.length; i < len; i++) {
			elements[i].onclick = (event) => {
				if (event.target.getAttribute('href').indexOf("#") == -1) {
					event.preventDefault();
					var title = this._findTarget(event.target.getAttribute('href'));
					this._handleClick(title);
				}
			};
		}
	}

	_findTarget(url) {
		return url.substring(url.lastIndexOf('/') + 1);
	}

	componentDidUpdate() {
		this._updateLinks();
	}

	_handleClick(topic) {
		// socket.emit('link click', topic)
	}

	_startGame() {
		socket.emit('startGame', {
			adminId: this.state.player.id,
			gameId: this.state.game.id
		});
	}

	render() {
		if (this.state.player && this.state.game) {
			if (!this.state.game.gameStarted) {
				return <Lobby parent={this.state} startButton={this._startGame} />
			}
			else {
				return (
					<div>
						<p>Welcome, {this.state.player.username}</p>
						<p>There are {this.state.playerCount} players in your game</p>
						<p>The game has started</p>
					</div>
				);
			}

		}
		else
			return (
				<div>
					<h2>loading</h2>
				</div>
			);
	}
}
