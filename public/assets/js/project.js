
var globalId;

$(document).ready( function() {
  

  $.get("/session", function(data) {
     globalId = data.id;
     console.log(globalId + " id has value");
     
  });
    

   

    $("#searchBtn").on("click", function(event) {
        console.log("clicked");
        // Don't refresh the page!
        event.preventDefault();
        var radio = $("input[name=radios]:checked").val();
        var input = $("#table_filter").val();
        
        console.log(input);
        console.log(radio);

        const userData = {
            search: input
            
          };
        // search = $("#table-filter").val();





//displays Artist info into table
        switch (radio) {
            case "Artist":
            $.post("/api/artist", userData, function(data) {
              $("#artist-data").empty();
              $("#venue-data").empty();
              $("#location-data").empty();
                console.log(data);
                for(var i = 0; i < data.length; i++) {
                  console.log(data[i].dates.start.localDate);
                  console.log(data[i]._embedded.venues[0].name);
                  console.log(data[i]._embedded.venues[0].city.name);
                  console.log(data[i]._embedded.venues[0].state.name);
                  $("#artist-data").append(`<tr><td>${data[i].dates.start.localDate}</td><td>${data[i]._embedded.venues[0].city.name} , ${data[i]._embedded.venues[0].state.name}</td><td>${data[i]._embedded.venues[0].name}</td></tr>`);
                }
                $("#table-title").append(`<h4 id = "art-name">${data[0]._embedded.attractions[0].name}</h4><button id="favArtist"; style="margin-left: 10px">Add to favorites</button>`);
              });
                break;


//displays Venue info into table
            case "Venue":
            $.post("/api/venue", userData, function(data) {
              $("#venue-data").empty();
              $("#artist-data").empty();
              $("#location-data").empty();
              console.log(data);
              for(var i = 0; i < data.length; i++) {
                console.log(data[i].dates.start.localDate);
                console.log(data[i].name);
                console.log(data[i].classifications[0].genre.name);
                $("#venue-data").append(`<tr><td>${data[i].name}</td><td>${data[i].dates.start.localDate}</td><td>${data[i].classifications[0].genre.name}</td></tr>`);
              }
              $("#table-venue-title").append(`<h4 id = "ven-name">${data[0]._embedded.venues[0].name}</h4><button id="favVenue"; style="margin-left: 10px">Add to favorites</button>`);

              });
                break;


//displays location info into table
            case "Location":
            $.post("/api/location", userData, function(data) {
              $("#venue-data").empty();
              $("#artist-data").empty();
              $("#location-data").empty();
                console.log(data + "public");
                for(var i = 0; i < data.length; i++) {
                console.log(data[i].dates.start.localDate);
                console.log(data[i].name);
                console.log(data[i]._embedded.venues[0].name);
                $("#location-data").append(`<tr><td>${data[i].dates.start.localDate}</td><td>${data[i].name}</td><td>${data[i]._embedded.venues[0].name}</td></tr>`)
                }
                // $("#table-location-title").append(`<h4>${data[i]._embedded.venues[0].city.name}</h4>`);

              });
                break;

                
//Default Artist Case
            default: 
            $.post("/api/artist", userData, function(data) {

                console.log(data);
                for(var i = 0; i < data.length; i++) {
                  console.log(data[i].dates.start.localDate);
                  console.log(data[i]._embedded.venues[0].name);
                  console.log(data[i]._embedded.venues[0].city.name);
                  console.log(data[i]._embedded.venues[0].state.name);
                  $("#artist-data").append(`<tr><td>${data[i].dates.start.localDate}</td><td>${data[i]._embedded.venues[0].city.name} , ${data[i]._embedded.venues[0].state.name}</td><td>${data[i]._embedded.venues[0].name}</td></tr>`)
                }
                $("#table-title").append(`<h4 id = "art-name">${data[0]._embedded.attractions[0].name}</h4><button id="favArtist"; style="margin-left: 10px">Add to favorites</button>`);

              });
              break;
        }

// anything below this line is a draft of what the posts and deletes will be. We still need to populate the page and obtain values.

  // $("#searchBtn").on("click", function(event) {
  // console.log("clicked");
  // // Don't refresh the page!
  // event.preventDefault();
  // var radio = $("input[name=radios]:checked").val();
  // var input = $("#table_filter").val();
  
  // console.log(input);
  // console.log(radio);

  // const userData = {
  //     search: input
      
  //   };

        $(document).on("click", "#favArtist", insertArtist);
          
          
        function insertArtist(event) {
          const art = $("#art-name").text();
            event.preventDefault();
            let favorite = {
               artist: art, //need to confirm selectors.
               userId: globalId
            };
            console.log(favorite);
            $.post("/api/favartist", favorite, getArtists);
            console.log("post favArtist");
          }
        // });
        $(document).on("click", "#favVenue", insertVenue);
        function insertVenue(event) {
            const ven = $("#ven-name").text();
            event.preventDefault();
            let favorite = {
            venue: ven,
            userId: globalId
            };
            console.log(favorite);
            $.post("/api/favvenue", favorite, getVenues);
            console.log("post favVenue");
          }
        // });
        $(document).on("click", ".venue-item", deleteVenue);
        $(document).on("click", ".artist-item", deleteArtist);

        function deleteVenue(event) {
            event.stopPropagation();
            let id = $(this).data("id");
            $.ajax({
              method: "DELETE",
              url: "/api/favvenue/" + id
            }).then(getVenues);
          }
        function getVenues() {
            $.get("/api/favvenue", function(data) {
              venues = data;
              console.log(venues);
            });
          }
          function deleteArtist(event) {
            event.stopPropagation();
            let id = $(this).data("id");
            $.ajax({
              method: "DELETE",
              url: "/api/favartist/" + id
            }).then(getArtists);
          }
        function getArtists() {
            $.get("/api/favartist", function(data) {
              artists = data;
              console.log(artists);
            });
          }

    
      });

    








});// end of document.ready
