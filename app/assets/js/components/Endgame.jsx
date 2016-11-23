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
			<div className="eg-playerpath" key={player.id}>
				<i>{player.username}</i> 
				<p>
				{player.steps.map((step, index, array) => {
					if (index == array.length - 1) {
						return <span key={step.time}>{step.url}</span>;
					}
					else {
						return <span key={step.time}>{step.url} > </span>;
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
					<h2 className="eg-gameover">Game over!</h2>
					<h3 className="eg-winner">{this.state.groupSteps.winner} won!</h3>
					<p className="eg-links">Links taken to the target article</p>
	      			{this._prepareScores(this.state.groupSteps)}
	      			
	      			{this.state.player.id === this.state.game.adminId ? <button onClick={this._rematch}>Rematch</button> : null}
	      		</div>
	      		<footer className="eg-footer">rematch</footer>
    		</div>
		);
	}
}
