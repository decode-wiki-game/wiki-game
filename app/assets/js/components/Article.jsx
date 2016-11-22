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
        <article dangerouslySetInnerHTML={{__html: this.props.content}} />
        )
    }
}

Article.propTypes = {
    title: PropTypes.string
}
