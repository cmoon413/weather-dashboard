//The Mountain is the way

//variables
var cities = []


//adding listener to search button
$("#search").on("click", function(event) {
    event.preventDefault()
    cities.push($('#cityInput').val().trim())
    $('#cityInput').val('')

})