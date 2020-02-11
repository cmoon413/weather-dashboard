//The Mountain is the way

//variables
var cities = []
var APIKey = "cbe32bb3b579dad365829cdc5ba21e51"
var currentURL
var forecastURL
var UvURL
var weatherForecast = []
    //adding listener to search button
$("#search").on("click", function(event) {
        event.preventDefault()
        cities.push($('#cityInput').val().trim())
        $('#cityInput').val('')
        displayWeather(cities[cities.length - 1])
    })
    //displays weather forecast
function displayWeather(city) {
    renderCities()
    createCurrentURL(city)
    getCurrent()
    createForecastURL(city)
    getForecast()
}



//Functions to create URLS for API calls
function createCurrentURL(city) {
    currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey
}

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

        $('.card-title').text(cities[0])
        $('#temp').text('Temperature: ' + response.main.temp)
        $('#humidity').text('Humidity: ' + response.main.humidity)
        $('#wind').text('Wind: ' + response.wind.speed)



    })
}


//get forecast api info and display to elements
function getForecast() {
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response) {
        var count = 0
        var forecast = document.querySelectorAll('.weather-forecast')
        console.log(response)
        for (let i = 7; i < 40; i += 8) {
            forecast[count].previousElementSibling.innerHTML = moment.unix(response.list[i].dt).format("MM/DD/YYYY")
            forecast[count].children[0].src = 'http://openweathermap.org/img/wn/' + response.list[i].weather[0].icon + '.png'
            forecast[count].children[1].innerHTML = 'Temp: ' + response.list[i].main.temp
            forecast[count].children[2].innerHTML = 'Humidity: ' + response.list[i].main.humidity
            count++
        }
    })
}
//render creates cities list from searches
function renderCities() {
    $("#cities").empty();
    for (var i = 0; i < cities.length; i++) {
        var city = $('<li>').addClass('collection-item').attr('data-city', cities[i]).text(cities[i])
        var a = $("<button>");
        $("#cities").prepend(city)
    }
}