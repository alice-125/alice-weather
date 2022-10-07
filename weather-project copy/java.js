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
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=50fa4024e3b1d5eac2f51ab18a47e997`;
  axios.get(apiUrl).then(displayWeather);
}

let search = document.getElementById("searchCityForm");
search.addEventListener("submit", searchCity);
