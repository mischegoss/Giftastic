$( document ).ready(function() {

  // Sets up initial array for button population 
  
  const pulled = $("#pulled-container");
  const buttons = $("#button-row");
  
  
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
  
  /* This makes the buttons clickable */
  
  $(document).on("click", ".btn-click", displayGifs);
  
  /* This  uses Ajax to pull  the Gifs */ 
  function displayGifs() {
  
    let input = $(this).val();
    let api = "&api_key=dy0FmMLlA7vphv8GPrWfz8W18KNS9npL&limit=10"
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + "dancing " + input + api;
  
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
  
   item = response.data;
  
     
     pulled.empty();
      for (var i = 0; i < 10; i++) {
   
         if (item[i].rating === "g" || item[i].rating === "G" || item[i].rating === "pg" || item[i].rating === "PG") {
          newItem = $("<div>");
          rating = response.data.rating;  
          imgURL = response.rating; 
          heading = $("<h6>").text("Rating: " + item[i].rating);
          image = $("<img>"); 
          image.attr("src", item[i].images.fixed_height.url);
          newItem.append(image);
          newItem.append(heading); 
          image.attr("src", imgURL);
          newItem.append(image);  
          pulled.append(newItem);
         }
      };
    });
  };
  
  /*TODO: Clear Out Form-Input */
  $("#submit").on("click", function (event) {
    event.preventDefault();
    var newInput = $("#form-input").val().trim();
    dancingthings.push(newInput);
    makeButtons();
    $("#form-input").empty();
  });
  
  
  makeButtons();
  
  
  }); // Document ready end bracket
  