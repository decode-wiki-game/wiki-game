import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import StartButton from './StartButton';

var string = Math.random().toString(36).substr(2, 4); //placeholder for slug

export default class Copy extends React.Component{
	constructor() {
	    super()
		    this.state = {
		      value: string,
		      showStartButton: false
		    }
		}
		handleClick() {
			this.setState({
				showStartButton: !this.state.showStartButton
			});
		}
		render() {
			return (
				<div>   
				  <CopyToClipboard text={this.state.value} >
				  		<div>
				          <button onClick={this.handleClick.bind(this)}>{this.state.value}</button>
  				          {this.state.showStartButton ? <StartButton /> : null}
  				        </div>  		

				  </CopyToClipboard> 
				</div>
		  	)
		 }
}