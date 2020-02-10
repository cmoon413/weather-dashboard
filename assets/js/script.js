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
    createCurrentURL(cities[0])
    getCurrent()
})





//creates a url for the current weather
function createCurrentURL(city) {
    currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey
}


//ajax call to retrieve current weather
function getCurrent() {
    $.ajax({
        url: currentURL,
        method: "GET"
    }).then(function(response) {


        console.log(response)
        $('.card-title').text(cities[0])
        $('#temp').text('Temperature: ' + response.main.temp)
        $('#humidity').text('Humidity: ' + response.main.humidity)
        $('#wind').text('Wind: ' + response.wind.speed)


    })
}