import React from 'react';

export default class Endgame extends React.Component{
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