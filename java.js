//display date
function updateDate() {
  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let todaydate = document.querySelector(".today");
  todaydate.innerHTML = `${day}, ${date} ${month} ${year}`;
}
updateDate();

//search city from api
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  displayDefault(city);
}
let search = document.getElementById("searchCityForm");
search.addEventListener("submit", searchCity);

function displayDefault(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=50fa4024e3b1d5eac2f51ab18a47e997`;
  axios.get(apiUrl).then(displayWeather);
}
displayDefault("Sydney");

//display weather
function displayWeather(response) {
  celsiusTemperature = response.data.main.temp;
  celsiusMax = response.data.main.temp_max;
  celsiusMin = response.data.main.temp_min;

  document.querySelector("#mainCityName").innerHTML = ` ${response.data.name}`;
  document.querySelector(".main-temp").innerHTML = `${Math.round(
    celsiusTemperature
  )}º`;
  document.querySelector(".max").innerHTML = `${Math.round(celsiusMax)}º / `;
  document.querySelector(".min").innerHTML = `${Math.round(celsiusMin)}º`;
  document.querySelector(".climate-wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}mph`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    ".climate-humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(".climate-feels").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}º`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector(".main-temp");
  let mainMax = document.querySelector(".max");
  let mainMin = document.querySelector(".min");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let fahrenheitMax = (celsiusMax * 9) / 5 + 32;
  let fahrenheitMin = (celsiusMin * 9) / 5 + 32;
  mainTemperature.innerHTML = `${Math.round(fahrenheitTemperature)}º`;
  mainMax.innerHTML = `${Math.round(fahrenheitMax)}º /`;
  mainMin.innerHTML = `${Math.round(fahrenheitMin)}º`;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusTemperature = null;

//display weekly forecast
function getForecast(coordinates) {
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weeklyForecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
              <p class="forecast-day">
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  height="25px"
                  class="forecast-icon"
                /><br />${formatForecastDate(forecastDay.dt)}
              </p>
              <span class="weekly-forecast-temp">
              <p class="forecast-max">${Math.round(forecastDay.temp.max)}° /</p>
              <p class="forecast-min">${Math.round(forecastDay.temp.min)}°</p>
              </span>
            </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}
//function showCelsiusTemperature(event) {
//event.preventDefault;
//let temperatureElement = document.querySelector("#temperature");
//fahrenheitLink.classList.remove("active");
//celsiusLink.classList.add("active");
// temperatureElement.innerHTML = Math.round(celsiusTemperature);
