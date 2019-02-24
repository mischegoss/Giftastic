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


function displayGifs() {

  let input = $(this).val();
  let api = "&api_key=dy0FmMLlA7vphv8GPrWfz8W18KNS9npL"
  let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + "dancing " + input + api;


  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {

    let results = response.data;

   
   pulled.empty();
    for (var i = 0; i < 10; i++) {
 
       if (results[i].rating === "g") {
        // Generating div with class "item"
        var gifyDiv = $("<div class='item'>");

        //Generating a div to hold the giphys
        var gifyDiv = $("<div>");

        //Storing rating response
        var rating = response.data.rating;

        //Fetching URL for image
        var imgURL = response.rating;

        //Generating <p> and rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        //Generating image tag
        var gify = $("<img>");

        //Defining src attribute of the images pulled
        gify.attr("src", results[i].images.fixed_height.url);

        //Appending rating to giphy
        gifyDiv.append(p);
        gifyDiv.append(gify);

        //Setting src and URL attributes to giphy
        var image = $("<img>").attr("src", imgURL);
        $("<img>").addClass("card-img-top");
        

        //Appending the giphy
        gifyDiv.append(image);

        //Prepending new giphys above previosly called giphys
        pulled.append(gifyDiv);
       }
    };
  });
};



//On.click function; prevents duplicatation of initial buttons
$("#add-gify").on("click", function (event) {
  event.preventDefault();

  //Stores user input from the textbox
  var gify = $("#gify-input").val().trim();

  //Removes previous giphys on.click
  $("gif").empty();

  //Adds Users input from the textbox to array
  gifys.push(gify);

  //Calls renderButtons function for User input buttons
  renderButtons();
});




makeButtons();


}); // Document ready end bracket