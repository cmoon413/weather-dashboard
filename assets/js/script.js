//The Mountain is the way

//variables
var cities = []
var APIKey = "cbe32bb3b579dad365829cdc5ba21e51"
var currentURL
var forecastURL
var weatherForecast = []
    //adding listener to search button
$("#search").on("click", function(event) {
    event.preventDefault()
    cities.unshift($('#cityInput').val().trim())
    $('#cityInput').val('')
    createCurrentURL(cities[0])
    getCurrent()
    createForecastURL(cities[0])
    getForecast()
})





//creates a url for the current weather
function createCurrentURL(city) {
    currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey
}
//creates a url for forecast
function createForecastURL(city) {
    forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=cbe32bb3b579dad365829cdc5ba21e51"
}


//ajax call to retrieve current weather
function getCurrent() {
    $.ajax({
        url: currentURL,
        method: "GET"
    }).then(function(response) {
        var lat = response.coord.lat
        var lon = response.coord.lon

        console.log(response)
        $('.card-title').text(cities[0])
        $('#temp').text('Temperature: ' + response.main.temp)
        $('#humidity').text('Humidity: ' + response.main.humidity)
        $('#wind').text('Wind: ' + response.wind.speed)



    })
}


//get forecast api info
function getForecast() {
    queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=davis,ca,us&units=imperial&appid=cbe32bb3b579dad365829cdc5ba21e51'
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var date = new Date(response.list[0].dt * 1000)
        console.log(date)
        for (let i = 7; i < 40; i += 8) {
            console.log(moment.unix(response.list[i].dt).format("MM/DD/YYYY"))
            weatherForecast.push({ date: response.list[i].dt, humidity: response.list[i].main.humidity, temp: response.list[i].main.temp })
        }
    })
}