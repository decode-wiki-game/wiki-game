/* global io fetch */

import React from 'react';
import 'whatwg-fetch';
import Article from './Article'
import Sidebar from './Sidebar'
const socket = io.connect();

export default class Game extends React.Component {

	constructor() {
		super();
		this.state = {
			article: '',
			game: null,
			player: null
		}
	}

	componentDidMount() {
		if(this.props.location.pathname != '/') { // if a player has joined a pre-existing lobby
			fetch('game/join', {headers: {'x-usertoken' : document.cookie.substr(document.cookie.indexOf('=') + 1), 'x-gameslug': this.props.location.pathname.substring(1)}})
				.then(response => {
					console.log(response)
				})
		}
		else { // if a player has just loaded the root URL
			fetch('/game/create', {headers: {'x-usertoken' : document.cookie.substr(document.cookie.indexOf('=') + 1)}})
			.then(response => response.json())
			.then(data => {
				this.setState({
					game: data.game
				})
				socket.emit('link click', data.game.startingURL.substring(data.game.startingURL.lastIndexOf('/') + 1))
			})
		}
		
		socket.on('link fetch', (result) => {
			this.setState({
				article: result
			})
			window.scrollTo(0, 0)

		});
	}

	_updateLinks() {
		var elements = document.getElementsByTagName('a');
		for (var i = 0, len = elements.length; i < len; i++) {
			elements[i].onclick = (event) => {
				if (event.target.getAttribute('href').indexOf("#") == -1) {
				event.preventDefault()
				var title =  this._findTarget(event.target.getAttribute('href'));
				this._handleClick(title);
				}
			}
		}
	}
	
	_findTarget(url) {
		return url.substring(url.lastIndexOf('/') + 1)
	}

	componentDidUpdate() {
		if(this.props.player != this.state.player) {
			this.setState({
				player: this.props.player
			})
		}
		this._updateLinks()
	}

	_handleClick(topic) {
		socket.emit('link click', topic)
	}

	render() {
		if (!this.state.player || !this.state.game) {
			return (
				<h2>loading</h2>	
			)
		}
		if (this.state.game.slug && this.state.player) {
			console.log(this.state.game)
			return (
				<div>
					<h2>The game and player have loaded, welcome to your game, {this.state.player.username}</h2>
					<h3>Ready to get playing? Share wikisprint.com/{this.state.game.slug} with your friends</h3>
					<p>There are x many players in your game</p>
					<p>The game hasn't started yet</p>
				</div>
			)
		}
	}
}