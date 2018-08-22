// const request = require("request");
require("dotenv").config();
const path = require("path");
// const keys = require("./../keys");
module.exports = function(app) {










app.get("/api/location", function(req, res) {
    const results = req.body;

    res.json(results);
     
        
});



}// end of export