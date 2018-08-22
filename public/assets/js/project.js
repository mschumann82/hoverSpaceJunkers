
// var search;

$(document).ready( function() {


    

   

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

                console.log(data);
                for(var i = 0; i < data.length; i++) {
                  console.log(data[i].dates.start.localDate);
                  console.log(data[i]._embedded.venues[0].name);
                  console.log(data[i]._embedded.venues[0].city.name);
                  console.log(data[i]._embedded.venues[0].state.name);
                  $("#artist-data").append(`<tr><td>${data[i].dates.start.localDate}</td><td>${data[i]._embedded.venues[0].city.name} , ${data[i]._embedded.venues[0].state.name}</td><td>${data[i]._embedded.venues[0].name}</td></tr>`);
                }
                $("#table-title").append(`<h4>${data[0]._embedded.attractions[0].name}<button id="favArtist"; style="margin-left: 10px">Add to favorites</button></h4>`);
              });
                break;


//displays Venue info into table
            case "Venue":
            $.post("/api/venue", userData, function(data) {

              console.log(data);
              for(var i = 0; i < data.length; i++) {
                console.log(data[i].dates.start.localDate);
                console.log(data[i].name);
                console.log(data[i].classifications[0].genre.name);
                $("#venue-data").append(`<tr><td>${data[i].name}</td><td>${data[i].dates.start.localDate}</td><td>${data[i].classifications[0].genre.name}</td></tr>`);
              }
              $("#table-venue-title").append(`<h4>${data[0]._embedded.venues[0].name}<button id="favVenue"; style="margin-left: 10px">Add to favorites</button></h4>`);

              });
                break;


//displays location info into table
            case "Location":
            $.post("/api/location", userData, function(data) {
              
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
                $("#table-title").append(`<h4>${data[0].name}<button id="favArtist"; style="margin-left: 10px">Add to favorites</button></h4>`);

              });
              break;
        }

// anything below this line is a draft of what the posts and deletes will be. We still need to populate the page and obtain values.

        $(document).on("click", ".favorite-artist", insertArtist);
        function insertArtist(event) {
            event.preventDefault();
            let favorite = {
            //   artist: $artistName.val().trim(), need to confirm selectors.
            //   userId: $userId.val()
            };
        
            $.post("/api/artist", favorite, getArtists);
            // $newItemInput.val(""); 
          }
        // });
        $(document).on("click", ".favorite-venue", insertVenue);
        function insertVenue(event) {
            event.preventDefault();
            let favorite = {
            //   venue: $venueName.val().trim(), need to confirm selectors.
            //   userId: $userId.val()
            };
        
            $.post("/api/venue", favorite, getVenues);
            // $newItemInput.val(""); 
          }
        // });
        $(document).on("click", ".venue-item", deleteVenue);
        $(document).on("click", ".artist-item", deleteArtist);

        function deleteVenue(event) {
            event.stopPropagation();
            let id = $(this).data("id");
            $.ajax({
              method: "DELETE",
              url: "/api/venue/" + id
            }).then(getVenues);
          }
        function getVenues() {
            $.get("/api/venue", function(data) {
              venues = data;
              
            });
          }
          function deleteArtist(event) {
            event.stopPropagation();
            let id = $(this).data("id");
            $.ajax({
              method: "DELETE",
              url: "/api/artist/" + id
            }).then(getArtists);
          }
        function getArtists() {
            $.get("/api/artist", function(data) {
              venues = data;
              
            });
          }

    
      });

    //   function display() {

    //   }




    // function results(data) {
    //     for (let i = 0; i < data.length; i++) {
    //         console.log(JSON.parse(data)._embedded.events[i]);
    //         $("#results").append(
    //             '<img src="'+(JSON.parse(data)[i].images[2])+'">'
    //             +'<p>'+JSON.parse(data)[i].name+'"/n"'
    //             +
    //             JSON.parse(data)[i]._embedded.venues[0].address+'", "'+
    //             JSON.parse(data)[i]._embedded.venues[0].city+'", "'+
    //             JSON.parse(data)[i]._embedded.venues[0].state+'"/n"'+
    //             JSON.parse(data)[i].dates.start.localTime+'"/n"'+
    //             JSON.parse(data)[i].dates.start.localDate+'"/n"'+
    //             JSON.parse(data)[i].priceRanges[0].min + "Min Price" + JSON.parse(data)[i].priceRanges[0].max+ "Max Price" +'"/n"'+
    //             '<a href="'+JSON.parse(data)[i].url+'">'
    //         );
    //         $("#results").append(
    //             '<img src="'+data[i].images[2]+'">'
    //             +'<p>'+data[i].name+'"/n"'
    //             +
    //             data[i]._embedded.venues[0].address+'", "'+
    //             data[i]._embedded.venues[0].city+'", "'+
    //             data[i]._embedded.venues[0].state+'"/n"'+
    //             data[i].dates.start.localTime+'"/n"'+
    //             data[i].dates.start.localDate+'"/n"'+
    //             data[i].priceRanges[0].min + "Min Price" + data[i].priceRanges[0].max+ "Max Price" +'"/n"'+
    //             '<a href="'+ data[i].url+'">'
    //         );
    //       }
    // }

    








});// end of document.ready
