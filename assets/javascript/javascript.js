
$(document).ready(function(){

/* This is my starter array with 3 names  */
let trumpians = ["Donald Trump", "Kellyanne Conway", "Sarah Sanders"];

function makeButtons() {

    for (i=0; i < trumpians.length; i ++) {
    var newButton = $("<button>") 
            newButton.attr("class", "button");
            newButton.attr("id", "input")  
            newButton.attr("data-name", trumpians[i]); 
            newButton.text(trumpians[i]); 
            $("#display-buttons").append(newButton); 
}
}

makeButtons()

});