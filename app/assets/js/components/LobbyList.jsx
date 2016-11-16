import React from 'react';


export default class LobbyList extends React.Component{
	render() {
		return (
			<div>      
	        	<header className="ll-header">
					<ul>
						<li>Creator of game</li>
						<li>Number of players</li>
						<li>Join</li>
					</ul>
				</header>
				<main className="ll-main">
					<ul>
						<li>(List of players in lobby)</li>
					</ul>
				</main> 
      		</div>
			)
	}
}