const request = require("request");
require("dotenv").config();
// const path = require("path");
const keys = require("./../keys");
const ticket = keys.ticket.id;
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // var send = {};

  // GET route for getting all of the users
  app.get("/api/users", function(req, res) {
    db.user.findAll({})
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
    db.user.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Artist, db.Venue]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  



  app.post("/api/artist", function(req, res) {
    search = req.body.search;
   
    console.log(search + "search");
    let queryUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + ticket + "&keyword=" + search + "&sort=date,asc&countryCode=US&classificationName=music"; 
    
            //this get should work for artist or venue search.
        var apiData = [];
            request (queryUrl, function(error, response, body) {
              // console.log(body);
              if (!error && response.statusCode === 200) {
                for (let i = 0; i < (JSON.parse(body)._embedded.events.length); i++) {
                  // console.log(JSON.parse(body)._embedded.events[i]);
                  apiData.push(JSON.parse(body)._embedded.events[i]);

                }
              }
              res.json(apiData);
            })
          });
       

  app.post("/api/venue", function(req, res) {
    search = req.body.search;
   
    console.log(search);
    let queryUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + ticket + "&keyword=" + search + "&sort=date,asc&countryCode=US&classificationName=music"; 
    

        var apiData = [];   
            request (queryUrl, function(error, response, body) {
              if (!error && response.statusCode === 200) {
                for (let i = 0; i < (JSON.parse(body)._embedded.events.length); i++) {
                  // console.log(JSON.parse(body)._embedded.events[i]);
                  apiData.push(JSON.parse(body)._embedded.events[i]);
                }
              }
              res.json(apiData);
            })

  });
  app.post("/api/location", function(req, res) {
    search = req.body.search;
    
    console.log(search + "api");
    let queryUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + ticket + "&city=" + search + "&sort=date,asc&countryCode=US&classificationName=music"; 
    
          var apiData = [];           
            request (queryUrl, function(error, response, body) {
              if (!error && response.statusCode === 200) {

                 for (let i = 0; i < (JSON.parse(body)._embedded.events.length); i++) {
                  // console.log(JSON.parse(body)._embedded.events[i]);
                  apiData.push(JSON.parse(body)._embedded.events[i]);
                }

              }
              res.json(apiData);
            })
            
            
            
  });






  // drafting post to artist and venue table and delete to artist and venue table below.
  app.post("/api/favartist", function(req, res) {
    console.log(req.body, 'req for artist');
    db.Artist.create({
      artist: req.body.artist, // placeholder
      userId: req.body.userId // placeholder. column name is UserId in created table.
    }).then(Artist => {
      res.json(Artist);
      console.log(res.json(Artist));

    })

  });
  app.post("/api/favvenue", function(req, res) {
    console.log(req.body, 'req for venue');
    db.Venue.create({
      venue: req.body.venue, // placeholder
      userId: req.body.userId // placeholder. column name is UserId in created table.
    }).then(Venue => {
      res.json(Venue);
      console.log(res.json(Venue));

    })

  });
  // delete posts are probably not accurate yet. will need to see what info we get from the front end to pass into the query.
  app.delete("/api/favartist/:id", function(req, res) {
    db.Artist.destroy({
      where: {
        id: req.params.id
      }
    }).then(Artist => {
      res.json(Artist);
      console.log(res.json(Artist));
    })
  });
  app.delete("/api/favvenue/:id", function(req, res) {
    db.Venue.destroy({
      where: {
        id: req.params.id
      }
    }).then(Venue => {
      res.json(Venue);
      console.log(res.json(Venue));
    })
  });
 
  

  

} // end of modules export
