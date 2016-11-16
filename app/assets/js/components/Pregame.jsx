import React from 'react';


export default class Pregame extends React.Component{
	render() {
		return (
			<div>      
	        	<header className="pg-header">
	          		<h2>Topic 1</h2>
	          		<h2 className="pg-header__h2--right">Topic 2</h2>
	        	</header>
	        	<main className="pg-main">
	          		<div className='pg-intro'>Intro paragrah from Wiki T2</div>
	          		<div className='pg-counter'>COUNTDOWN PLACEHOLDER</div>
	        	</main>
      		</div>
			)
	}
}