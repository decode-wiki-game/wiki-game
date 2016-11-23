var fetch = require('node-fetch')
     function getPrettyTitle (target) {
        return fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${target}&format=json`)
        .then(response => response.json())
        .then(response => {
            var articleId = Object.keys(response.query.pages)[0];
            return response.query.pages[articleId].title;
        })
        
    }
    
    getPrettyTitle('cricket');