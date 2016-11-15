import React from 'react';


export default class Game extends React.Component{
	render() {
		return (
			<div>      
	        	<header className="game-header">
	          		<h2>Goal: (Topic 2)</h2>
	          		<h2>Steps: (number)</h2>
	        	</header>
	        	<main className="game-main">
	          		<div className='game-wikipedia-article'>Wikipedia article Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio at, laborum, aut culpa qui iusto, velit vero dolore eaque eligendi magnam nesciunt in. Molestias, ab, praesentium. Itaque rem, esse aperiam!</div>
	        	</main>
	        	<aside className="game-aside">
	        		<ul>
	        			<li>(Steps: (number))</li>
	        		</ul>
	           	</aside>
      		</div>
			)
	}
}