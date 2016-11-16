/* global io */

import React from 'react';
import Article from './Article'
const socket = io.connect();

export default class Game extends React.Component {

	constructor() {
		super();
		this.state = {
			article: '',
			game: {}
		}
	}

	componentDidMount() {
		
			fetch('/game/create', {headers: new Headers({'x-usertoken' : document.cookie.substr(document.cookie.indexOf('=') + 1)})})
			.then(response => {
				return (response.json())
			})
			.then(data => {
				console.log("game is: ", data.game)
				this.setState({
					game: data.game
				})
				socket.emit('link click', data.game.startingURL.substring(data.game.startingURL.lastIndexOf('/') + 1))
			})
		
		socket.on('link fetch', (result) => {
			this.setState({
				article: result
			})
		});
	}

	_updateLinks() {
		var elements = document.getElementsByTagName('a');
		for (var i = 0, len = elements.length; i < len; i++) {
			elements[i].onclick = (event) => {
				event.preventDefault()
				var title =  this._findTarget(event.target.getAttribute('href'));
				this._handleClick(title);
			}
		}
	}
	
	_findTarget(url) {
		return url.substring(url.lastIndexOf('/') + 1)
	}

	componentDidUpdate() {
		this._updateLinks()
	}

	_handleClick(topic) {
		socket.emit('link click', topic)
	}

	render() {
		return (
			<div>
	           	<Article title={this.state.article}/>
      		</div>
		)
	}
}