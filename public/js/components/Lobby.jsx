import React from 'react';


export default class Lobby extends React.Component{
	render() {
		return (
			<div>      
	        	<header className="lobby-header">
					<a href="#">rules</a>
					<h1>Welcome</h1>
				</header>
				<main>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio at, laborum, aut culpa qui iusto, velit vero dolore eaque eligendi magnam nesciunt in. Molestias, ab, praesentium. Itaque rem, esse aperiam!
				</main>
				<div className="lobby-container">
					<button>start</button>
					<label className="checkbox"><input type="checkbox" />Make public</label>
				</div>  
      		</div>
			)
	}
}