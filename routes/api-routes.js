
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
  

  

}
