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
			<h2>Starting from</h2>
				{this.state.game.startingURL}
				<h2>Target</h2>
				{this.state.game.endURL}
				<p dangerouslySetInnerHTML={{__html: this.state.extract}}/>
				<div>I am a div with an countdown bar animation</div>
      		</div>
		)
	}
}
