/* global io fetch */

import React from 'react';
import Article from './Article'
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
			player: null,
			playerCount: 1
		}
	}

	componentDidMount() {

		socket.on('createPlayer', (player) => {
			window.localStorage.player = player;
			this.setState({
				player: player
			})
		})

		socket.on('joinRoom', (data) => {
			this.setState({
				playerCount: data.playerCount
			});
		});

		socket.on('createGame', (data) => {
			this.setState({
				game: data.game
			})
			this.props.router.push(`/${data.game.slug}`)
		})

		socket.on('link fetch', (result) => {
			this.setState({
				article: result
			})
			window.scrollTo(0, 0);
		});
	}

	_updateLinks() {
		var elements = document.getElementsByTagName('a');
		for (var i = 0, len = elements.length; i < len; i++) {
			elements[i].onclick = (event) => {
				if (event.target.getAttribute('href').indexOf("#") == -1) {
					event.preventDefault()
					var title = this._findTarget(event.target.getAttribute('href'));
					this._handleClick(title);
				}
			}
		}
	}

	_findTarget(url) {
		return url.substring(url.lastIndexOf('/') + 1)
	}

	componentDidUpdate() {
		if (this.props.player != this.state.player) {
			this.setState({
				player: this.props.player
			})
		}
		this._updateLinks()
	}

	_handleClick(topic) {
		// socket.emit('link click', topic)
	}

	render() {

		return (
			<div>
					<p>There are {this.state.playerCount} players in your game</p>
					<p>The game hasn't started yet</p>
				</div>
		)
	}
}
