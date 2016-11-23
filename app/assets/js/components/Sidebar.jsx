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
    componentDidUpdate(prevProps){
        if(prevProps.parent.steps != this.props.parent.steps) {
            this.setState({
                steps: this.props.parent.steps
            })
        }
    }

    render() {
        return (
            <aside className="sidebar">
                <h2 className="sidebar__heading">{this.state.steps} {this.state.steps === 1 ? 'step' : 'steps'}</h2>
            </aside>
        )
    }
}
