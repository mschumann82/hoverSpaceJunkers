const request = require("request");
require("dotenv").config();
// const path = require("path");
module.exports = function(app) {



// const ticketmaster = require('ticketmaster');
const keys = require("./../keys");


const ticket = keys.ticket.id;

// app.get("/", function(req, res) {
//     ticketmaster(ticket).discovery.v2.event.all()
//         .then(function(result) {
//             res.json(result);
//   // "result" is an object of Ticketmaster events information
// });
//   });

app.get("/", function(req, res) {
    // req.sendFile(path.join(__dirname, "../views/main.html"));
        
        let queryUrl = "https://app.ticketmaster.com/discovery/v2/venues?apikey=" + ticket + "&keyword=van%20buren&countryCode=US&stateCode=az";
    
        
    
        request (queryUrl, function(error, response, body) {
          if (!error && response.statusCode === 200) {
              
              console.log(JSON.parse(body)._embedded);
              
          }
        })
        
});



}// end of export