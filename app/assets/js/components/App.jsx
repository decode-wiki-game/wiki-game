import React from 'react';

export default class App extends React.Component{
  
  constructor() {
    super()
    this.state = {
      player: {}
    }
  }
  
  componentWillMount() {
    fetch('/user', {headers: new Headers({'x-usertoken' : document.cookie.substr(document.cookie.indexOf('=') + 1)})})
      .then(response => {
        return response.json()
      })
      .then(json => {
        var player = json.player
        this.setState({
          player: player
        })
      })
  }
  // childrenWithProps is a copy of this.props.children except you can pass props to it, in this case, we're passing player information
  render() {
    var childrenWithProps = React.cloneElement(this.props.children, {player: this.state.player});
    return (
      <div>
      	<h2>Wikisprint</h2>
      	{childrenWithProps}
      </div>
    );
  }
}
