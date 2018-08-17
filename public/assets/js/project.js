$(document).ready( function() {

// only two types that we need are events and venues.
    let queryUrl = "https://app.ticketmaster.com/discovery/v2/" + type + "?apikey=" + ticket + "&keyword=" + search + "&countryCode=US"; 
    
        //this get should work for artist or venue search.
    
        request (queryUrl, function(error, response, body) {
          if (!error && response.statusCode === 200) {
              
              console.log(JSON.parse(body)._embedded);
              res.json(JSON.parse(body)._embedded);
              
          }
        })


    let queryUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + ticket + "&city=" + city + "&countryCode=US&stateCode=" + state; 
    
        //this get should work for location.
    
        request (queryUrl, function(error, response, body) {
          if (!error && response.statusCode === 200) {
              
              console.log(JSON.parse(body)._embedded);
              res.json(JSON.parse(body)._embedded);
              
          }
        })


    








});// end of document.ready
