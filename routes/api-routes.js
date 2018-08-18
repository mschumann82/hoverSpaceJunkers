const request = require("request");
require("dotenv").config();
// const path = require("path");
const keys = require("./../keys");
const ticket = keys.ticket.id;
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the users
  app.get("/api/users", function(req, res) {
    db.User.findAll({})
      .then(function(dbUser) {
        res.json(dbUser);
      });

  });
  app.get("/api/artists", function(req, res) {
    // find all artists
    db.Artist.findAll({}).then(function(dbArtist) {
      res.json(dbArtist);
    });
  });
  app.get("/api/venues", function(req, res) {
    // find all venues
    db.Venue.findAll({}).then(function(dbVenue) {
      res.json(dbVenue);
    });
  });
  app.get("/api/users/:id", function(req, res) {
    // 2; Add a join to include all of the Author's Posts here
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Artist, db.Venue]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  app.post("/api/artist", function(req, res) {
    search = req.body;
    console.log(search);
    let queryUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + ticket + "&keyword=" + search + "&countryCode=US"; 
    
            //this get should work for artist or venue search.
        
            request (queryUrl, function(error, response, body) {
              if (!error && response.statusCode === 200) {
                  
                  console.log(JSON.parse(body)._embedded);
                  res.json(JSON.parse(body)._embedded);
                  
              }
            })
  
  
  });
  

  

}
