import React from 'react';
import Copy from './Copy';
import LobbyList from './LobbyList';

export default class Lobby extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.parent,
		this._startGame = this._startGame.bind(this)
		this._changeName = this._changeName.bind(this)
	}
	_startGame() {
		this.props.startButton()
	}
	componentDidUpdate(prevProps) {
		if(prevProps.parent.playerCount != this.props.parent.playerCount) {
			this.setState(this.props.parent)
		}
	}
	
	_changeName(name) {
		if(name != '') {
		this.props.changeName(name)
		}
	}
	
	render() {
		return (
			<div className="game">
				<h3 className="lb-main__h3">You are playing as: {this.state.player.username}</h3>
				<h2>Change your name</h2>
				<input ref='name' onBlur={() => {this._changeName(this.refs.name.value)}}/>
				<h3 className="lb-main__h3">Send the url and challenge a friend!</h3>
				<div><small>Click to copy this url and send to a friend</small></div>
				<Copy slug={this.state.game.slug}/>
				<p>Number of players in the lobby: {this.state.playerCount}</p>
				{this.state.player.id === this.state.game.adminId ? <button onClick={this._startGame}>Start</button> : null}
			</div>
		)
	}
}
