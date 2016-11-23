/* global io fetch */

import React from 'react';
import Article from './Article'
import Lobby from './Lobby'
import Sidebar from './Sidebar'
import Pregame from './Pregame'
import Endgame from './Endgame'
import Gamemeta from './Gamemeta'
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
			article: {
				title: '',
				content: ''
			},
			extract: '',
			game: null,
			player: window.localStorage.player ? JSON.parse(window.localStorage.player) : undefined,
			playerCount: 1,
			sprintStarted: null,
			groupSteps: {}
		};
		this._startGame = this._startGame.bind(this)
		this._changeName = this._changeName.bind(this)
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
				game: updatedGame,
				extract: data.extract
			});
		});
		
		socket.on('playerLeftRoom', () => {
			var playerCount = this.state.playerCount - 1;
			this.setState({
				playerCount: playerCount
			});
		});

		socket.on('beginSprint', (data) => {
			this.setState({
				sprintStarted: true,
				article: data.article
			})
		});

		socket.on('link fetch', (result) => {
			this.setState({
				article: result.article,
				steps: this.state.steps + 1
			});
			window.scrollTo(0, 0);
		});
		
		socket.on('victory', (data) => {
			var updatedGame = this.state.game;
			updatedGame.finalStep = data[0]
			this.setState({
				game: updatedGame,
				groupSteps: data
			})
		})
		
		socket.on('rematch', (data) => {
			this.setState({
				article: '',
				extract: '',
				game: data.game,
				sprintStarted: null,
				groupSteps: {}
			});

			this.props.router.push(`/${data.game.slug}`);
		})
		
		socket.on('playerStep', (data) => {
			var groupSteps = this.state.groupSteps;
			if (!groupSteps[data.id]) {
				groupSteps[data.id] = {};
				groupSteps[data.id].username = data.username;
				groupSteps[data.id].steps = 1;
			}
			else {
				groupSteps[data.id].steps += 1;
			}
			this.setState({
				groupSteps: groupSteps
			})
		})
		
		socket.on('nameChangeSuccess', (data) => {
			var player = this.state.player
			player.username = data.newName
			window.localStorage.player = JSON.stringify(player);
			this.setState({
				player: player
			})
		})
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
		socket.emit('link click', topic)
	}

	_startGame() {
		socket.emit('startGame', {
			adminId: this.state.player.id,
			gameId: this.state.game.id,
			targetSlug: this.state.game.targetSlug
		});
	}
	
	_changeName(newName) {
		socket.emit('changeName', {
			newName: newName
		})
	}
	
	_rematch() {
		socket.emit('rematch')
	}

	render() {
		if (this.state.player && this.state.game) {
			if (!this.state.game.gameStarted) {
				return <Lobby className="game" parent={this.state} startButton={this._startGame} changeName={this._changeName} />
			}
			else if (!this.state.sprintStarted) {
				return (
						<Pregame parent={this.state}/>
				);
			}
			else {
				return (
					<div className="game"> 
						<Sidebar parent={this.state} />
						<Gamemeta parent={this.state} />
						<Article parent={this.state} article={this.state.article} />
						{Array.isArray(this.state.groupSteps.steps) ? <Endgame rematch={this._rematch} parent={this.state}/> : null}
					</div>
				)
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
