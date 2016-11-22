import React from 'react';
var {
    Component,
    PropTypes
} = React;
var InlineCss = require('react-inline-css');

export default class Gamemeta extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.parent;
    }

    render() {
        return (
            <InlineCss stylesheet={`
                & .game-meta__title::after {
                    content: '${this.state.game.targetTitle}';
                }
                `}>
            <div className="game-meta">
                <h2>Target: <span className="game-meta__title"></span></h2>
            </div>
            </InlineCss>
        )
    }
}
