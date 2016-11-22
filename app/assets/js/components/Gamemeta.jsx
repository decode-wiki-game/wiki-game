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
    
    _createCSS() {
        console.log('creating CSS!')
        return {__html: `.game-meta__title::after{content: '${this.state.game.targetTitle}'}`}
    }

    render() {
        console.log(this._createCSS())
        return (
            <div className="game-meta">
            <style dangerouslySetInnerHTML={this._createCSS()} />
                <h2>Target: <span className="game-meta__title"></span></h2>
            </div>
        )
    }
}
