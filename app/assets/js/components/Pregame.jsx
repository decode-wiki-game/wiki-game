import React from 'react';
var fetch = require('isomorphic-fetch');


export default class Pregame extends React.Component {

	constructor(props) {
		super(props)
		this.state = this.props.parent;
	}

	componentDidMount() {

	}
	render() {
		return (
			<div>
				<div className="pregame__container">
					<div>
						<h3 className="centered">Ready?</h3>
						<h2 className="centered"><span className="pg__title--start">{this.state.game.startTitle}</span></h2>
						<h3 className="centered">to</h3>
						<h2 className="pg__arrow centered"><span className="pg__title--target">{this.state.game.targetTitle}</span></h2>
						<h3 className="centered">...as quickly as possible.</h3>
						<p dangerouslySetInnerHTML={{__html: this.state.extract}}/>
		      		</div>
	      		</div>
				<div className="pg__progress"/>
			</div>
		)
	}
}
