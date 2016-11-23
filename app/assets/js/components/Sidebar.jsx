import React from 'react';
var {
    Component,
    PropTypes
} = React;

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.parent;
    }
    componentDidUpdate(prevProps) {
        if (prevProps.parent.groupSteps != this.props.parent.groupSteps) {
            this.setState({
                groupSteps: this.props.parent.groupSteps
            })
        }
    }
    
    _formatPlayerSteps(steps) {
        var keys = Object.keys(steps)
        return keys.map((user) => {
            return (
                <div key={user}>
                    <h3 className="sidebar__heading--name">{steps[user].username}</h3>
                    <h3 className="sidebar__heading">{steps[user].steps} {steps[user].steps === 1 ? 'step' : 'steps'}</h3>
                </div>)
        })
    }

    render() {
        return (
            <aside className="sidebar">
                {this._formatPlayerSteps(this.state.groupSteps)}
                {/*<h2 className="sidebar__heading">{this.state.steps} {this.state.steps === 1 ? 'step' : 'steps'}</h2>*/}
            </aside>
        )
    }
}
