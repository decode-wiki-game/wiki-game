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
            <div><h2>{this.props.article.title}</h2>

            <div className="gm-article__div--wiki" >
                <article dangerouslySetInnerHTML={{__html: this.props.article.content}} />
            </div>
            </div>
        )
    }
}

Article.propTypes = {
    title: PropTypes.string
}
