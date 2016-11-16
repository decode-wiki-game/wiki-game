import React from 'react';
var {
    Component,
    PropTypes
} = React;

export default class Article extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <p dangerouslySetInnerHTML={{__html: this.props.title}} />
        )
    }
}

Article.propTypes = {
    title: PropTypes.string
}
