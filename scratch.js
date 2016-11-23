var fetch = require('node-fetch')

    function getPrettyTitle (target) {
       fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${target}&format=json`)
       .then(response => response.json())
       .then(response => {

           console.log(response.query.pages)
           
       })
       
   }
   
   getPrettyTitle('cricket');