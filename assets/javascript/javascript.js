
/* Still need to clean up 
 * Some classes are unused because styling has not yet been applied*/

$( document ).ready(function() {

  // Sets up initial array for button population 
  
  const pulled = $("#pulled-container");
  const buttons = $("#button-row");
  let limit = 10;
  
  //Setting Initial Array Values
  let dancingthings = ["puppies", "owls", "babies"];
  
  /* This first empties out the button row using empty() and then uses a for loop to create a button */
  /* Moved newButton var inside loop to create multiple buttons */
  
  function makeButtons() {
  
     buttons.empty();
    
      for (var i = 0; i < dancingthings.length; i++) {
  
       const newButton = $("<button>");
        
        newButton.addClass("btn-click");
        
        newButton.attr("value", dancingthings[i]);
        
        newButton.text(dancingthings[i]);
        
        buttons.append(newButton);
      };
    };
  
  /* This makes the buttons clickable and calls displayGifs */
  
  $(document).on("click", ".btn-click", displayGifs);
  
  /* This  uses Ajax to pull the Gifs */ 
  function displayGifs() {
  
    let input = $(this).val();
    let api = "&api_key=dy0FmMLlA7vphv8GPrWfz8W18KNS9npL&limit=" + limit
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + "dancing " + input + api;
  
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
  
   item = response.data;
 
     pulled.empty();
      for (var i = 0; i < limit; i++) {
   
         if (item[i].rating === "g" || item[i].rating === "pg" ) {
          newItem = $("<div>");
           
          stillimage = item[i].images.fixed_height_still.url;
          movingimage = item[i].images.fixed_height.url;
          rating = item[i].rating;
        
          image = $("<img>"); 
          image.attr('src', stillimage);	
          image.attr('data-still', stillimage);
					image.attr('data-state', 'still');	
          image.attr('data-animate', movingimage);
          
          heading = $("<div>").text("Rating: " + rating);
          heading.addClass("heading")
           
          newItem.append(image);
          newItem.append(heading);
          newItem.addClass("new-item")

        
          image.addClass("animate");
          newItem.append(image);  
          pulled.append(newItem);
         }
      };
    });
  };

  $(document).on('click', '.animate', function(){
    datastate = $(this).attr('data-state');

    switch(datastate) {
      case "still":
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
        break;
      case "animate":
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
        break;
      
    }

  });
  
 
  $("#submit").on("click", function (event) {
    event.preventDefault();
    var newInput = $("#form-input").val().trim();

    if (newInput.length > 2) {
    dancingthings.push(newInput);
    $("#form-input").val("");
    makeButtons();
    }
  });
  
  
  makeButtons();
  
  
  }); // Document ready end bracket
  