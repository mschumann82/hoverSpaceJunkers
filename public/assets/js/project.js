
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
                console.log(userData);
               
      
              });
                break;
            case "Venue":
            $.post("/api/venue", userData, function(data) {
                console.log(userData);
                
      
              });
                break;
            case "Location":
            $.post("/api/location", userData, function(data) {
                console.log(userData + "public");
                
      
              });
                break;
            default: 
            $.post("/api/artist", userData, function(data) {
                console.log(userData);
                
                
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
