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
				<h3 className="lobby__player">Hello, <span className="lobby__nameinput"><i>{this.state.player.username}</i></span>
					<button className="lobby__button--username"><label htmlFor="checkbox-hack" className="cb-hack">change</label></button>
				</h3>
				<input type="checkbox" id="checkbox-hack" className="cb-hack"/>
				<div className="checkbox-hack-content">
					<p className="lobby__username"><small>Choose a different name:</small></p>
					<input ref='name' onBlur={() => {this._changeName(this.refs.name.value)}}/>
				</div>
				<h3>Send the url and challenge a friend!</h3>
				<div><small>Click to copy this url and send to a friend</small></div>
				<Copy slug={this.state.game.slug}/>
				<p>Number of players in the lobby: {this.state.playerCount}</p>
				{this.state.player.id === this.state.game.adminId ? <button className="lobby__button" onClick={this._startGame}>Start</button> : null}
			</div>
		)
	}
}
