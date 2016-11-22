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
            <div className="gm-article__div--wiki" >
                <article dangerouslySetInnerHTML={{__html: this.props.content}} />
            </div>
        )
    }
}

Article.propTypes = {
    title: PropTypes.string
}
