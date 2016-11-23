import React from 'react';

export default class Endgame extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.props.parent;
		this._rematch = this._rematch.bind(this);
	}

	_prepareScores(scoreData) {
		console.log("scoreData", scoreData)
		var steps = scoreData.steps

		var flags = [],
			players = []

		for (var i = 0; i < steps.length; i++) {
			if (flags[steps[i].playerId]) continue;
			flags[steps[i].playerId] = true;
			players.push({
				id: steps[i].playerId,
				username: steps[i].username
			});
		}

		players = players.map((player) => {
			var steps = scoreData.steps.filter((step) => {
				if (step.playerId === player.id) {
					return true;
				}
			})
			return {
				key: player.id,
				id: player.id,
				username: player.username,
				steps: steps
			}
		})

		return players.map(this._formatScores)

	}
	_formatScores(player) {
		return (
			<div key={player.id}>
				<p className="eg__username">{player.username}</p> 
				<p>
				{player.steps.map((step, index, array) => {
					if (index == array.length - 1) {
						return <span className="eg__step" key={step.time}>{step.url}</span>;
					}
					else {
						return <span className="eg__step--not-final" key={step.time}>{step.url}</span>;
					}
				})}
				</p>
			</div>
		)
	}
	
	_rematch(){
		this.props.rematch()
	}

	render() {
		return (
			<div className="eg">
				<div className="eg-container">
					<h1 className="eg-gameover">Game over!</h1>
					<h2 className="eg-winner">{this.state.groupSteps.winner} won!</h2>
					<div className="eg__paths">
	      			{this._prepareScores(this.state.groupSteps)}
	      			</div>
	      			
	      			{this.state.player.id === this.state.game.adminId ? <button className="eg__rematch" onClick={this._rematch}>Rematch</button> : null}
	      		</div>
	      		<footer className="eg-footer">rematch</footer>
    		</div>
		);
	}
}
