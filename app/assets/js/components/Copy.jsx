import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class Copy extends React.Component{
	constructor(props) {
	    super(props)
		    this.state = {
		      slug: this.props.slug
		    }
		}
		_copyToClipboard() {

		}
		render() {
			return (
			  <CopyToClipboard text={window.location.href} >
			        <button className="lobby__button" onClick={this._copyToClipboard}>{this.state.slug}</button>
			  </CopyToClipboard> 
		  	)
		 }
}