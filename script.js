var apiKey = 'bb95a39833559c20c4b54a07619bd7f6';
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "&appid=" + apiKey;
let FivedayForecastWrapper = document.querySelector(".FivedayForecastWrapper");
let searchedCities = document.querySelector(".searchedCities");
let citiesArray = JSON.parse(localStorage.getItem("citiesArray")) || [];

$(function () {
    function currentWeather(cityName) {
        console.log(cityName)
        var coordinatesUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=' + apiKey;
        fetch(coordinatesUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apiKey}`;
                console.log(data);
                console.log(data[0].lat);
                console.log(data[0].lon);
                fetch(url)
                    .then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        console.log(data);
                        localStorage.setItem("citiesArray", JSON.stringify(citiesArray));
                        $("#cityname").text(data.city.name);
                        $("#currentDate").text(data.list[0].dt_txt.split(" ")[0]);
                        $("#temperature").text(parseInt((data.list[0].main.temp) - 273) * 1.8 + 32);
                        $("#Wind").text(data.list[0].wind.speed);
                        $("#humidity").text(data.list[0].main.humidity);
                        FiveDayForecast(data.list)
                    })
            });
    }
    $('#BtnSearch').click(function () {
        var cityName = $('#Searching').val();
        if (!citiesArray.includes(cityName)) {
            citiesArray.push(cityName);
        }
        var url = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
        var coordinatesUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=' + apiKey;
        console.log(cityName);
        currentWeather(cityName)

    });
    function FiveDayForecast(list) {
        FivedayForecastWrapper.innerHTML = "";
        for (let i = 0; i < list.length; i = i + 8) {
            let newcard = `
            <div class="card">
                        <h3>9/14/2022</h3>
                        <img src="https://openweathermap.org/img/w/${list[i].weather[0].icon}.png" alt="icon" />
                        <p>temp:<span id="5-day-temperature">${(parseInt((list[i].main.temp) - 273) * 1.8 + 32)}</span>F</p>
                        <p>wind:<span id="5-day-Wind">${(list[i].wind.speed)}</span>MPH</p>
                        <p>humidity:<span id="5-day-humidity">${(list[i].main.humidity)}</span>%</p>
                    </div>`
            FivedayForecastWrapper.innerHTML += newcard
        }
    }
    function savedButtons() {
        searchedCities.innerHTML = ""
        console.log(citiesArray);
        for (let i = 0; i < citiesArray.length; i++) {
            let button = document.createElement("button");
            button.textContent = citiesArray [i]
            searchedCities.appendChild(button);
        }
    }

    searchedCities.addEventListener("click", function(event) {
        currentWeather(event.target.textContent)
    })

    savedButtons()
});

