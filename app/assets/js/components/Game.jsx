/* global io */

import React from 'react';
import Article from './Article'
var socket = io.connect();

export default class Game extends React.Component {

	constructor() {
		super();
		this.state = {
			article: ''
		}
	}

	componentDidMount() {
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
	           	<a href="#" onClick={() => this._handleClick('IserveU')}>IserveU</a>
	           	<Article title={this.state.article}/>
      		</div>
		)
	}
}


// render() {
// 		return (
// 			<div>      
// 	        	<header className="gm-header">
// 	          		<h2>Goal: (Topic 2)</h2>
// 	          		<h2 className="gm-header__h2--right">Steps: (number)</h2>
// 	        	</header>
// 	        	<main className="gm-main">
// 	          		<div className='game-wikipedia-article'>Wikipedia article Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio at, laborum, aut culpa qui iusto, velit vero dolore eaque eligendi magnam nesciunt in. Molestias, ab, praesentium. Itaque rem, esse aperiam!</div>
// 	        	</main>
// 	        	<aside className="gm-aside">
// 	        		<ul>
// 	        			<li>(Steps: (number))</li>
// 	        		</ul>
// 	           	</aside>
// 	           	<a href="#" onClick={this._handleClick}>IserveU</a>
//       		</div>
// 		)
// 	}
