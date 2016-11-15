import React from 'react';

export default class Endgame extends React.Component{
  render() {
    return (
      <div>
      	<header className="eg-header">
      		<h2>(position) place!</h2>
      	</header>
      	<main className="eg-main">
      		<div>Time: (time)</div>
      		<div>Steps you took: (list of steps)</div>

	      	<div className="row">
				    <ul className="eg-main__ul--table row col-small-12 col-medium-3">Player
				    	<li>(Name)</li>
				    </ul>
				    <ul className="row col-small-12 col-medium-3">Time 
				    	<li>(time)</li>
				    </ul>
				    <ul className="row col-small-12 col-medium-3">Number of steps
				    	<li>num of steps</li>
				    </ul>
				    <ul className="row col-small-12 col-medium-3">Last article
				    	<li>(wikipedia)</li>
				    </ul>
	      	</div>

	      	<div className="eg-div__table--wrapper">
		      	<table className="eg-table">
		      		<thead>
						<tr>
						    <th>Player</th>
						    <th>Time</th> 
						    <th>Number of steps</th>
						    <th>Last article</th>
						</tr>
					</thead>
					<tbody>
						<tr>
						    <td>(Name)</td>
						    <td>(time)</td> 
						    <td>(num of steps)</td>
						    <td>(wikipedia title)</td>
						</tr>
					</tbody>
				</table>
			</div>
      	</main>	
      	<footer className="eg-footer">rematch</footer>
    </div>
    );
  }
}