
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
    // 1. Add a join to include all of each User's Artists
    db.User.findAll({include: db.Artist}).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  app.get("/api/venues", function(req, res) {
    // 1. Add a join to include all of each User's Venues
    db.User.findAll({include: db.Venue}).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  

  

}
