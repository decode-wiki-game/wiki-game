import React from 'react';
import Copy from './Copy';
import LobbyList from './LobbyList';

export default class Lobby extends React.Component{
		constructor() {
			super();
			this.state = {
				showLobby: false
			}
		}
		onClick() {
			this.setState({
				showLobby: !this.state.showLobby
			})
		}
		render() {
			return (
				<div>      
		        	<header className="lb-header">
						<a href="#">How to play</a>
						<h1>Welcome to WikiSprint!</h1>
					</header>
					<main className="lb-main">
						<div className="lb-main__div--container">
							<h3 className="lb-main__h3">You are playing as: (name - click to edit)</h3>
							<h3 className="lb-main__h3">Send the url and challenge a friend!</h3>
							<div><small>Click to copy this url and send to a friend</small></div>
							<Copy />
							<label className="lb-main__label"><input type="checkbox" />Add game to lobby</label>
							<h3>Or join a game in the lobby</h3>
							<button onClick={this.onClick.bind(this)}>lobby</button>
							<div>
							{this.state.showLobby ? <LobbyList /> : null}	
							</div>
				      	</div>
					</main>
					<div className="lb-container">
						<button>start</button>
					</div>  
	      		</div>
			)
	}
}