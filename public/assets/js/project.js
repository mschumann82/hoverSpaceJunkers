
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

  $("#artistDiv").hide();
  $("#venueDiv").hide();
  $("#locationDiv").hide();
  $("#radioListDiv").hide();

  $.get("/session", function(data) {
     globalId = data.id;
     console.log(globalId + " id has value");
     $.get("/api/art-table/" + globalId, function(data) {
      $("artList").empty();
      console.log(data);

      for (let i = 0; i < data.length; i++) {
      
        $("#artList").append("<ul><li><button class = 'btn artist-item' value ="+data[i].id+">X</button>&nbsp;<span class='runButtonArtist'>" + data[i].artist + "</span></li></ul>");
        
      }
      
    });

    $.get("/api/ven-table/" + globalId, function(data) {
      $("venList").empty();
      console.log(data);

      for (let i = 0; i < data.length; i++) {
      
        $("#venList").append("<ul><li><button class = 'btn venue-item' value ="+data[i].id+">X</button>&nbsp;<span class='runButtonVenue'>" + data[i].venue + "</span></li></ul>");
        
      }
      
    });
     
  });
    

   

    $("#searchBtn").on("click", searchEvent);




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
            
			  $("#venList").append("<ul><li><button class = 'btn venue-item' value ="+data[i].id+">X</button>&nbsp;<span class='runButtonVenue'>" + data[i].venue + "</span></li></ul>");
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
            
			  $("#artList").append("<ul><li><button class = 'btn artist-item' value ="+data[i].id+">X</button>&nbsp;<span class='runButtonArtist'>" + data[i].artist + "</span></li></ul>");
              // $("artist-item").data("number", {id: data[i].id});
            }
            
          });
          }

    
      

    

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

		
	  //runFromFavorites

	  $( "body" ).on( "click", ".runButtonArtist", function() {
            console.log("run Artist fromFavorites clicked");

            let searchTerm = $(this).text();
            console.log(searchTerm);

			searchEvent(event, "Artist", searchTerm)
			
      });

	  $( "body" ).on( "click", ".runButtonVenue", function() {
            console.log("run Venue fromFavorites clicked");

            let searchTerm = $(this).text();
            console.log(searchTerm);

			searchEvent(event, "Venue", searchTerm)
			
      });





});// end of document.ready

function searchEvent(event, fromFavorites, searchTerm) {
		window.scrollTo(0,0);
        console.log("clicked");
        // Don't refresh the page!
		if(event)
		{
			event.preventDefault();
		}
        $("#table-title").empty();
        $("#table-venue-title").empty();
        $("#table-location-title").empty();
              $("#artist-data").empty();
              $("#venue-data").empty();
              $("#location-data").empty();
        var radio = $("input[name=radios]:checked").val();
        var input = $("#table_filter").val();
		if(fromFavorites === "Artist" || fromFavorites === "Venue")
		{
			radio = fromFavorites;
			input = searchTerm;
		}
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
				if(data[0] === "This artist is not touring")
				{
					$("#table-title").append(`This artist is not touring`);
					return;
				}
                console.log(data);
                for(var i = 0; i < data.length; i++) {
                  console.log(data[i].dates.start.localDate);
                  console.log(data[i]._embedded.venues[0].name);
                  console.log(data[i]._embedded.venues[0].city.name);
                  console.log(data[i]._embedded.venues[0].state.name);
                  $("#artist-data").append(`<tr><td>${data[i].dates.start.localDate}</td><td>${data[i]._embedded.venues[0].city.name} , ${data[i]._embedded.venues[0].state.name}</td><td><span class='runButtonVenue'>${data[i]._embedded.venues[0].name}</span></td><td><a href="${data[i].url}" target="_blank">Buy Tickets</a></td></tr>`);
                }
                $("#table-title").append(`<span id = "art-name">${data[0]._embedded.attractions[0].name}</span><button id="favArtist" class="btn" style="margin-left: 10px; color: black;">Add to favorites</button>`);
              });
                break;


//displays Venue info into table
            case "Venue":
            $.post("/api/venue", userData, function(data) {
              if(data[0] === "Venue not found.")
				{
					$("#table-title").append(`Venue not found.`);
					return;
				}
              console.log(data);
              for(var i = 0; i < data.length; i++) {
                console.log(data[i].dates.start.localDate);
                console.log(data[i].name);
                console.log(data[i].classifications[0].genre.name);
                $("#venue-data").append(`<tr><td><span class='runButtonArtist'>${data[i].name}</span></td><td>${data[i].dates.start.localDate}</td><td>${data[i].classifications[0].genre.name}</td><td><a href="${data[i].url}" target="_blank">Buy Tickets</a></td></tr>`);
              }
              $("#table-venue-title").append(`<span id = "ven-name">${data[0]._embedded.venues[0].name}</span><button id="favVenue" class="btn" style="margin-left: 10px; color: black;">Add to favorites</button>`);

              });
                break;


//displays location info into table
            case "Location":
            $.post("/api/location", userData, function(data) {
               if(data[0] === "Nothing found for that location.")
				{
					$("#table-title").append(`Nothing found for that location.`);
					return;
				}
                console.log(data + "public");
                for(var i = 0; i < data.length; i++) {
                console.log(data[i].dates.start.localDate);
                console.log(data[i].name);
                console.log(data[i]._embedded.venues[0].name);
                $("#location-data").append(`<tr><td>${data[i].dates.start.localDate}</td><td><span class='runButtonArtist'>${data[i].name}</span></td><td><span class='runButtonVenue'>${data[i]._embedded.venues[0].name}</span></td><td><a href="${data[i].url}">Buy Tickets</a></td></tr>`)
				//$("#location-data").append(`<tr><td>${data[i].dates.start.localDate}.</td><td>${data[i]._embedded.venues[0].city.name} , ${data[i]._embedded.venues[0].state.name}</td><td>${data[i]._embedded.venues[0].name}</td></tr>`);
                }
                 $("#table-location-title").append(`<h4>${data[0]._embedded.venues[0].city.name}</h4>`);

              });
                break;

                
//Default Artist Case
            default: 
            $.post("/api/artist", userData, function(data) {
				if(data[0] === "This artist is not touring")
				{
					$("#table-title").append(`This artist is not touring`);
					return;
				}
                console.log(data);
                for(var i = 0; i < data.length; i++) {
                  console.log(data[i].dates.start.localDate);
                  console.log(data[i]._embedded.venues[0].name);
                  console.log(data[i]._embedded.venues[0].city.name);
                  console.log(data[i]._embedded.venues[0].state.name);
                  $("#artist-data").append(`<tr><td>${data[i].dates.start.localDate}</td><td>${data[i]._embedded.venues[0].city.name} , ${data[i]._embedded.venues[0].state.name}</td><td><span class='runButtonVenue'>${data[i]._embedded.venues[0].name}</span></td><td><a href="${data[i].url}" target="_blank">Buy Tickets</a></td></tr>`)
                }

                $("#table-title").append(`<h4 id = "art-name">${data[0]._embedded.attractions[0].name}</h4><button id="favArtist" class="btn" style="margin-left: 10px; color: black;">Add to favorites</button>`);


              });
              break;
        }
}


var radioDivShown = false;

function showRadiosDiv()
{
	if(!radioDivShown)
	{
		radioDivShown = true;
		let catButtonLocationX = $("#categoryBtn").offset().left;
		let catButtonLocationY = $("#categoryBtn").offset().top;

		$("#radioListDiv").css({left: catButtonLocationX + "px", top: (catButtonLocationY + 34) + "px"});
		$("#radioListDiv").show();
	}
	else
	{	
		radioDivShown = false;
		$("#radioListDiv").hide();
	}
}

function submitSearch(event)
{
		var keypressed = event.keyCode;
		if (keypressed == 13) {
			searchEvent();
		}
}



$(window).on('resize', function(){
		if(radioDivShown)
		{
			let catButtonLocationX = $("#categoryBtn").offset().left;
			let catButtonLocationY = $("#categoryBtn").offset().top;

			console.log(catButtonLocationX, catButtonLocationY);

			$("#radioListDiv").css({left: catButtonLocationX + "px", top: (catButtonLocationY + 34) + "px"});
		}

	});
