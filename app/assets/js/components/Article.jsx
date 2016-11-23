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
            <div>
                <h2 className="gm-article__title">{this.props.article.title}</h2>
                <article className="article" dangerouslySetInnerHTML={{__html: this.props.article.content}} />
            </div>
        )
    }
}

Article.propTypes = {
    title: PropTypes.string
}
