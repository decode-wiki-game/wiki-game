import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>
      	<header className="header">
      	<img className="header__logo" src="files/images/logo.svg" />
      	</header>
      	{this.props.children}
      </div>
    );
  }
}
