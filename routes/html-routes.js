const request = require("request");
require("dotenv").config();
// const path = require("path");
const keys = require("./../keys");
module.exports = function(app) {







const ticket = keys.ticket.id;


app.get("/", function(req, res) {
    // req.sendFile(path.join(__dirname, "../views/main.html"));
        
        let queryUrl = "https://app.ticketmaster.com/discovery/v2/venues?apikey=" + ticket + "&keyword=van%20buren&countryCode=US&stateCode=az";
    
        
    
        request (queryUrl, function(error, response, body) {
          if (!error && response.statusCode === 200) {
              
              console.log(JSON.parse(body)._embedded);
              res.json(JSON.parse(body)._embedded);
              
          }
        })
        
});



}// end of export