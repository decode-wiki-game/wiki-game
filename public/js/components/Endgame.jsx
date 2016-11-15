import React from 'react';

export default class Endgame extends React.Component{
  render() {
    return (
      <div>
      	<header className="eg-header">(position) place!</header>
      	<main className="eg-main">
      		<div>Time: (time)</div>
      		<div>Steps you took: (list of steps)</div>
      	</main>
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
      	<footer className="eg-footer">rematch</footer>
      </div>
    );
  }
}