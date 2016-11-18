import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>
      	<h2>Wikisprint</h2>
      	{this.props.children}
      </div>
    );
  }
}
