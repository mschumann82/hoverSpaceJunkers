
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






        switch (radio) {
            case "Artist":
            $.post("/api/artist", userData, function(data) {
                console.log(data + "project.js");
               
      
              });
                break;
            case "Venue":
            $.post("/api/venue", userData, function(data) {
                console.log(data + "project.js");
                
      
              });
                break;
            case "Location":
            $.post("/api/location", userData, function(data) {
                console.log(data + "project.js");
                
      
              });
                break;
            default: 
            $.post("/api/artist", userData, function(data) {
                console.log(data + "project.js");
                
                
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




    

    








});// end of document.ready
