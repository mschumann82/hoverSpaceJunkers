
var search;

$(document).ready( function() {


    




   

    $("#searchBtn").on("click", function(event) {
        console.log("clicked");
        // Don't refresh the page!
        event.preventDefault();

        var userData = {
            search: $("#table-filter").val()
            
          };
        search = $("#table-filter").val();






        switch ($("input[name=radios]:checked").val()) {
            case "Artist":
            $.post("/api/artist", userData, function(data) {
                console.log(data);
                // Grab the result from the AJAX post so that the best match's name and photo are displayed.
               
                
      
              });
                break;
            case "Venue":
            $.post("/api/venue", userData, function(data) {
                console.log(data);
                // Grab the result from the AJAX post so that the best match's name and photo are displayed.
                
                
      
              });
                break;
            case "Location":
            $.post("/api/location", userData, function(data) {
                console.log(data);
                // Grab the result from the AJAX post so that the best match's name and photo are displayed.
                
                
      
              });
                break;
            default: 
            $.post("/api/artist", userData, function(data) {
                console.log(data);
                // Grab the result from the AJAX post so that the best match's name and photo are displayed.
               
                
                
              });
              break;
        }














        
        // switch ($("input[name=radios]:checked").val()) {
        //     case "Artist":
        //     let queryUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + ticket + "&keyword=" + search + "&countryCode=US"; 
    
        //     //this get should work for artist or venue search.
        
        //     request (queryUrl, function(error, response, body) {
        //       if (!error && response.statusCode === 200) {
                  
        //           console.log(JSON.parse(body)._embedded);
        //           res.json(JSON.parse(body)._embedded);
                  
        //       }
        //     })
        //         break;
        //     case "Venue":
        //     let queryUrl = "https://app.ticketmaster.com/discovery/v2/venues?apikey=" + ticket + "&keyword=" + search + "&countryCode=US"; 
    
        //     //this get should work for artist or venue search.
        
        //     request (queryUrl, function(error, response, body) {
        //       if (!error && response.statusCode === 200) {
                  
        //           console.log(JSON.parse(body)._embedded);
        //           res.json(JSON.parse(body)._embedded);
                  
        //       }
        //     })
        //         break;
        //     case "Location":
        //     let queryUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + ticket + "&city=" + search + "&countryCode=US"; 
    
        //     //this get should work for location.
        
        //     request (queryUrl, function(error, response, body) {
        //       if (!error && response.statusCode === 200) {
                  
        //           console.log(JSON.parse(body)._embedded);
        //           res.json(JSON.parse(body)._embedded);
                  
        //       }
        //     })
        //         break;
        //     default: 
        //     let queryUrl = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + ticket + "&keyword=" + search + "&countryCode=US"; 
    
        //     //this get should work for artist or venue search.
        
        //     request (queryUrl, function(error, response, body) {
        //       if (!error && response.statusCode === 200) {
                  
        //           console.log(JSON.parse(body)._embedded);
        //           res.json(JSON.parse(body)._embedded);
                  
        //       }
        //     })
        //     break;
        // }
            
            
        
        
        
    
    
      });




    

    








});// end of document.ready
