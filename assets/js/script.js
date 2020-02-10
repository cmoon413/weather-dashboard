//The Mountain is the way

//variables
var cities = []
var APIKey = "cbe32bb3b579dad365829cdc5ba21e51"
var currentURL
    //adding listener to search button
$("#search").on("click", function(event) {
    event.preventDefault()
    cities.push($('#cityInput').val().trim())
    $('#cityInput').val('')
    currentWeatherURL(cities[0])
})





//creates a url for the current weather
function currentWeatherURL(city) {
    currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey
}