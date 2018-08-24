const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

const db = require("./models");
require('dotenv').config()

const app = express();

var passport   = require('passport');
var session    = require('express-session');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'aG92ZX',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
	
// Auth Routes
var authRoute = require('./routes/auth-routes.js')(app,passport,express);	

// Load passport strategies
require('./config/passport/passport.js')(passport,db.user);

// Import routes and give the server access to them.
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);



// Start our server so that it can begin listening to client requests.
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});