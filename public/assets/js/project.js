
function toggleTables(radio) {
  $("#artistDiv").show();
  $("#venueDiv").show();
  $("#locationDiv").show();

  $("#venue-data").empty();
  $("#artist-data").empty();
  $("#location-data").empty();
  $("#table-venue-title").empty();
  $("#table-title").empty();
  $("#location-data").empty();


  if (radio==="Artist") {
  $("#venueDiv").hide();
  $("#locationDiv").hide();
  } else if (radio==="Venue") {
  $("#artistDiv").hide();
  $("#locationDiv").hide();
} else if (radio==="Location") {
  $("#artistDiv").hide();
  $("#venueDiv").hide();
} else {
  $("#venueDiv").hide();
  $("#locationDiv").hide()
}
}
// var search;


var globalId;

$(document).ready( function() {
  

  $.get("/session", function(data) {
     globalId = data.id;
     console.log(globalId + " id has value");
     $.get("/api/art-table/" + globalId, function(data) {
      $("artList").empty();
      console.log(data);

      for (let i = 0; i < data.length; i++) {
      
        $("#artList").append("<ul><li><button class = 'artist-item' value ="+data[i].id+">X</button>" + data[i].artist + "</li></ul>");
        
      }
      
    });
    $.get("/api/ven-table/" + globalId, function(data) {
      $("venList").empty();
      console.log(data);

      for (let i = 0; i < data.length; i++) {
      
        $("#venList").append("<ul><li><button class = 'venue-item' value ="+data[i].id+">X</button>" + data[i].venue + "</li></ul>");
        
      }
      
    });
     
  });
    

   

    $("#searchBtn").on("click", function(event) {
      
        console.log("clicked");
        // Don't refresh the page!
        event.preventDefault();
        $("#table-title").empty();
        $("#table-venue-title").empty();
        $("#table-location-title").empty();
              $("#artist-data").empty();
              $("#venue-data").empty();
              $("#location-data").empty();
        var radio = $("input[name=radios]:checked").val();
        var input = $("#table_filter").val();
        toggleTables(radio)
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
                  $("#artist-data").append(`<tr><td>${data[i].dates.start.localDate}.</td><td>${data[i]._embedded.venues[0].city.name} , ${data[i]._embedded.venues[0].state.name}</td><td>${data[i]._embedded.venues[0].name}</td></tr>`);
                }
                $("#table-title").append(`<h4 id = "art-name">${data[0]._embedded.attractions[0].name}</h4><button id="favArtist"; style="margin-left: 10px">Add to favorites</button>`);
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
              $("#table-venue-title").append(`<h4 id = "ven-name">${data[0]._embedded.venues[0].name}</h4><button id="favVenue"; style="margin-left: 10px">Add to favorites</button>`);

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

                $("#table-title").append(`<h4 id = "art-name">${data[0]._embedded.attractions[0].name}</h4><button id="favArtist"; style="margin-left: 10px">Add to favorites</button>`);


              });
              break;
        }

// anything below this line is a draft of what the posts and deletes will be. We still need to populate the page and obtain values.

  

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
        // $('body').on("click", ".venue-item", deleteVenue);
        // $('body').on("click", ".artist-item", deleteArtist);

        // function deleteVenue(event) {
        //   // event.preventDefault();
        //     console.log("delete venue clicked");
        //     let id = $(this).data("id");

        //     $.ajax({
        //       method: "DELETE",
        //       url: "/api/ven-table/" + id
        //     }).then(getVenues);
        //   }
        function getVenues() {
          $("#venList").empty();
          $.get("/api/ven-table/" + globalId, function(data) {
      
            console.log(data);
      
            for (let i = 0; i < data.length; i++) {
            
              $("#venList").append("<ul><li><button class = 'venue-item' value ="+data[i].id+">X</button>" + data[i].venue + "</li></ul>");
              // $("venue-item").data("number", {id: data[i].id});
            }
            
          });
          }
          // function deleteArtist(event) {
          //   // event.preventDefault();
          //   console.log("delete artist clicked");
          //   let id = $(this).data("id");
          //   $.ajax({
          //     method: "DELETE",
          //     url: "/api/art-table/" + id
          //   }).then(getArtists);
          // }
        function getArtists() {
          $("#artList").empty();
          $.get("/api/art-table/" + globalId, function(data) {
      
            console.log(data);
      
            for (let i = 0; i < data.length; i++) {
            
              $("#artList").append("<ul><li><button class = 'artist-item' value ="+data[i].id+">X</button>" + data[i].artist + "</li></ul>");
              // $("artist-item").data("number", {id: data[i].id});
            }
            
          });
          }

          

          
    
      });

    

      $( "body" ).on( "click", ".artist-item", function() {
        console.log("delete artist clicked");
            // $("#artList").empty();
            // let id = $(this).data("id");
            let id = $(this).val();
            // let id = $((this).data("number").id);
            console.log(id);
            $.ajax({
              method: "DELETE",
              url: "/api/art-table/" + id
            }).then(getArtists);
      });
      $( "body" ).on( "click", ".venue-item", function() {
            // $("#venList").empty();
            console.log("delete venue clicked");
            // let id = $(this).data("id");
            let id = $(this).val();
            // let id = $((this).data("number").id);
            console.log(id);
            $.ajax({
              method: "DELETE",
              url: "/api/ven-table/" + id
            }).then(getVenues);
      });
      






});// end of document.ready
