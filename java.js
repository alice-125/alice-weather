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

function displayWeather(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector(
    "#mainCityName"
  ).innerHTML = `<br />📍 ${response.data.name}`;
  document.querySelector(".main-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}º`;
  document.querySelector(".max").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}º / `;
  document.querySelector(".min").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}º`;
  document.querySelector(".climate-wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}mph`;
  //document.querySelector(".climate-rain").innerHTML = `${response.data.rain[0]}mm`;//
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    ".climate-humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#icon").innerHTML = `<img
      src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" >`;
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector(".main-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  mainTemperature.innerHTML = `${Math.round(fahrenheitTemperature)}º`;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusTemperature = null;

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=50fa4024e3b1d5eac2f51ab18a47e997`;
  axios.get(apiUrl).then(displayWeather);
}

let search = document.getElementById("searchCityForm");
search.addEventListener("submit", searchCity);

//function showCelsiusTemperature(event) {
//event.preventDefault;
//let temperatureElement = document.querySelector("#temperature");
//fahrenheitLink.classList.remove("active");
//celsiusLink.classList.add("active");
// temperatureElement.innerHTML = Math.round(celsiusTemperature);
