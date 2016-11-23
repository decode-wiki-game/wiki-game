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
			<div className="lobby__intro">
				<h1>Welcome to Wikisprint!</h1> 
				<h2>The fun, fast game of encyclopedic knowledge!</h2> 
                <p>Race your friends through Wikipedia by clicking on the links.</p>
                <p>Wikisprint gives you two Wikipedia articles to navigate between.</p> 
                <p>The first player to reach the target article wins!</p>
			</div>
			<div className="lobby__main">
				<div className="lobby__namechange">
					<h3 className="lobby__player">Username </h3><input className="lobby__input" ref='name' placeholder={this.state.player.username} onBlur={() => {this._changeName(this.refs.name.value)}}/>
				</div>
				<div className="lobby__invite">
					{ this.state.playerCount === 1 ? <p>You're the only one in this lobby! Invite some friends or play solo.</p> :
					<p>There are {this.state.playerCount} players in the lobby.</p>
					}
					<Copy slug={this.state.game.slug}/>
					</div>
	
					{this.state.player.id === this.state.game.adminId ? <div className="centered"><button className="lobby__button" onClick={this._startGame}>Start</button></div> : null}
				</div>
			</div>
		)
	}
}
