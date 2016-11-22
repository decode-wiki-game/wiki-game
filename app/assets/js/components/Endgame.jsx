import React from 'react';

export default class Endgame extends React.Component {

	constructor(props) {
		super(props);

	}

	_prepareScores(scoreData) {
		console.log("preparing Scores")

		var flags = [],
			players = [],
			l = scoreData.steps.length,
			i;
		for (i = 0; i < l; i++) {
			if (flags[scoreData.steps[i].playerId]) continue;
			flags[scoreData.steps[i].playerId] = true;
			players.push(scoreData.steps[i].playerId);
		}
		console.log(players)
	}
	componentDidMount() {
		this._prepareScores(this.props.scoreData)
	}

	render() {
		return (
			<div>
      	<header className="eg-header">
      		<h2>(position) place!</h2>
      	</header>
      	<main className="eg-main">
      		<div className="eg_???????????">Time: (time)</div>
      		<div>Steps you took: (list of steps)</div>
      			<div className="eg-main__div--wrapper">
				    <ul className="eg-main__ul--table row col-small-12 col-medium-3">Player
				    	<li className="eg-main__li--table">(Name)</li>
				    </ul>
				    <ul className="eg-main__ul--table row col-small-12 col-medium-3">Time 
				    	<li className="eg-main__li--table">(time)</li>
				    </ul>
				    <ul className="eg-main__ul--table row col-small-12 col-medium-3">Number of steps
				    	<li className="eg-main__li--table">num of steps</li>
				    </ul>
				    <ul className="eg-main__ul--table row col-small-12 col-medium-3">Last article
				    	<li className="eg-main__li--table">(wikipedia)</li>
				    </ul>
				</div>    
      	</main>	
      	<footer className="eg-footer">rematch</footer>
    </div>
		);
	}
}
