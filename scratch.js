var fetch = require('node-fetch')

function getArticle(title) {
fetch(`https://en.wikipedia.org/wiki/${title}?action=render`)
    .then(response => {
        return response.text()
    })
    .then(text => {
        console.log(text)
    })
}

getArticle('IserveU')