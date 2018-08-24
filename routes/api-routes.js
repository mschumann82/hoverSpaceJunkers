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
   

    console.log(search + " search");
    
    let queryUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + ticket + "&keyword=" + search + "&sort=date,asc&countryCode=US&classificationName=music"; 
    
            //this get should work for artist or venue search.
        var apiData = [];
            request (queryUrl, function(error, response, body) {
              // console.log(body);
              if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body));
                if (!(JSON.parse(body)._embedded)) { // checks if the object returned is missing an events array.
                  console.log("This artist is not touring");
				  apiData.push("This artist is not touring");
                } else {
                  for (let i = 0; i < (JSON.parse(body)._embedded.events.length); i++) {
                    // console.log(JSON.parse(body)._embedded.events[i]);
                    apiData.push(JSON.parse(body)._embedded.events[i]);
                  }
                  
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
				if(!(JSON.parse(body)._embedded)) { 
					console.log("Venue not found.");
				    apiData.push("Venue not found.");
				}
				else
				{
					for (let i = 0; i < (JSON.parse(body)._embedded.events.length); i++) {
					  // console.log(JSON.parse(body)._embedded.events[i]);
					  apiData.push(JSON.parse(body)._embedded.events[i]);
					}
				}
              }
              res.json(apiData);
            })

  });
  app.post("/api/location", function(req, res) {
    search = req.body.search;
	var city = "";
	var state = "";

	if(search.indexOf(",") !== -1)
	{
		city = search.split(",")[0].trim();
		state = search.split(",")[1].trim();
		
		var queryUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + ticket + "&city=" + city + "&sort=date,asc&countryCode=US&stateCode=" + convertRegion(state, 2) + "&classificationName=music"; 
	}
	else
	{
		var queryUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + ticket + "&city=" + search + "&sort=date,asc&countryCode=US&classificationName=music"; 
	}
    
	console.log(queryUrl);
    
          var apiData = [];           
            request (queryUrl, function(error, response, body) {
              if (!error && response.statusCode === 200) {
				if(!(JSON.parse(body)._embedded)) { 
					console.log("Nothing found for that location.");
				    apiData.push("Nothing found for that location.");
				}
				else
				{
					 for (let i = 0; i < (JSON.parse(body)._embedded.events.length); i++) {
					  //console.log(JSON.parse(body)._embedded.events[i]);
					  apiData.push(JSON.parse(body)._embedded.events[i]);
					}
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
  app.delete("/api/art-table/:id", function(req, res) {
    db.Artist.destroy({
      where: {
        id: req.params.id
      }
    }).then(Artist => {
      res.json(Artist);
      console.log(res.json(Artist));
    })
  });
  app.delete("/api/ven-table/:id", function(req, res) {
    db.Venue.destroy({
      where: {
        id: req.params.id
      }
    }).then(Venue => {
      res.json(Venue);
      console.log(res.json(Venue));
    })
  });
 
  


// draft gets for tables
app.get("/api/art-table/:id", function(req, res) {
  // 2; Add a join to include all of the Author's Posts here
  db.Artist.findAll({
    where: {
      userId: req.params.id
    },
    
  }).then(function(dbArtists) {
    res.json(dbArtists);
  });
});

app.get("/api/ven-table/:id", function(req, res) {
  // 2; Add a join to include all of the Author's Posts here
  db.Venue.findAll({
    where: {
      userId: req.params.id
    },
    
  }).then(function(dbVenues) {
    res.json(dbVenues);
  });
});














  

} // end of modules export


const TO_NAME = 1;
const TO_ABBREVIATED = 2;

function convertRegion(input, to) {
console.log(input);
    var states = [
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['American Samoa', 'AS'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['Armed Forces Americas', 'AA'],
        ['Armed Forces Europe', 'AE'],
        ['Armed Forces Pacific', 'AP'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['District Of Columbia', 'DC'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Guam', 'GU'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Marshall Islands', 'MH'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Northern Mariana Islands', 'NP'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Puerto Rico', 'PR'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['US Virgin Islands', 'VI'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    // So happy that Canada and the US have distinct abbreviations
    var provinces = [
        ['Alberta', 'AB'],
        ['British Columbia', 'BC'],
        ['Manitoba', 'MB'],
        ['New Brunswick', 'NB'],
        ['Newfoundland', 'NF'],
        ['Northwest Territory', 'NT'],
        ['Nova Scotia', 'NS'],
        ['Nunavut', 'NU'],
        ['Ontario', 'ON'],
        ['Prince Edward Island', 'PE'],
        ['Quebec', 'QC'],
        ['Saskatchewan', 'SK'],
        ['Yukon', 'YT'],
    ];

    var regions = states.concat(provinces);

    var i; // Reusable loop variable
    if (to == TO_ABBREVIATED) {
        input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        for (i = 0; i < regions.length; i++) {
            if (regions[i][0] == input) {
                return (regions[i][1]);
            }
        }
    } else if (to == TO_NAME) {
        input = input.toUpperCase();
        for (i = 0; i < regions.length; i++) {
            if (regions[i][1] == input) {
                return (regions[i][0]);
            }
        }
    }
}