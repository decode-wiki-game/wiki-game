import React from 'react';

export default class Endgame extends React.Component {

	constructor(props) {
		super(props);

	}

	_prepareScores(scoreData) {
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
				id: player.id,
				username: player.username,
				steps: steps
			}
		})

		return players.map(this._formatScores)

	}
	_formatScores(player) {
		return (
			<div>
				{player.username}
				<p>
				{player.steps.map((step, index, array) => {
					if (index == array.length - 1) {
						return `${step.url}`;
					}
					else {
						return `${step.url} > `;
					}
				})}
				</p>
			</div>
		)
	}
	componentDidMount() {
		this._prepareScores(this.props.scoreData)
	}

	render() {
		return (
			<div className="eg">
				<div className="eg-container">
					<h2>Game over!</h2>
	      			{this._prepareScores(this.props.scoreData)}
	      		</div>
	      		<footer className="eg-footer">rematch</footer>
    		</div>
		);
	}
}
