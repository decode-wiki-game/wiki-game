import React from 'react';
var {
    Component,
    PropTypes
} = React;

export default class Gamemeta extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.parent;
    }

    render() {
        return (
            <div className="game-meta">
                <h2>Target: <span className="test">{this.state.game.targetTitle}</span></h2>
            </div>
        )
    }
}
