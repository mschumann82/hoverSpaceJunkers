const request = require("request");
require("dotenv").config();
// const path = require("path");
const keys = require("./../keys");
module.exports = function(app) {







const ticket = keys.ticket.id;


app.get("/", function(req, res) {
    // req.sendFile(path.join(__dirname, "../views/main.html"));
        
    
        res.sendFile(path.join(__dirname, "../public/index.html"));
     
        
});



}// end of export