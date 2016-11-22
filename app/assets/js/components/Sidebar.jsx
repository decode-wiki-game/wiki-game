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
            <aside>
                <h2>Steps: {this.state.steps}</h2>
            </aside>
        )
    }
}
