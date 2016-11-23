import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>
      	<header className="header">
      	<a href="/">
      	<img className="header__logo" src="files/images/logo.svg" />
      	</a>
      	</header>
      	{this.props.children}
      </div>
    );
  }
}
