import React from 'react';
import Copy from './Copy';
import LobbyList from './LobbyList';

export default class Lobby extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.parent,
		this._onClick = this._onClick.bind(this)
	}
	_onClick() {
		this.props.startButton()
	}
	render() {
		return (
			<div>
				<h3 className="lb-main__h3">You are playing as: (name - click to edit)</h3>
				<h3 className="lb-main__h3">Send the url and challenge a friend!</h3>
				<div><small>Click to copy this url and send to a friend</small></div>
				<Copy />
				<button onClick={this._onClick}>Start</button>
			</div>

		)
	}
}
