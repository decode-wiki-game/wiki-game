import React from 'react';
var fetch = require('isomorphic-fetch');


export default class Pregame extends React.Component{
	
	constructor(props) {
		super(props)
		this.state = this.props.parent;
	}
	render() {
		return (
			<div>      
				{this.state.game.startingURL}
				{this.state.game.endURL}
				<p dangerouslySetInnerHTML={{__html: this.state.extract}}/>
      		</div>
			)
	}
}