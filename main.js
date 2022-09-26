import './style.css'

const BASE_URL = "https://dataservice.accuweather.com";
const API_KEY = "YwUQofcX7Lr8gaySg26TpOAUBErYGceu"; // terrible practice!
// You should never save API key directly in source code

const search = document.getElementById("search");
search.addEventListener("submit", getWeatherForecast);

function getWeatherForecast(event) {
  event.preventDefault();
  const city = document.getElementById("city").value.trim(); // removes spaces
  getLocationKey(city);
}

// get the "location key" for the given `city`!
// then call getCurrentCondition to retrieve weather forecast for it!
function getLocationKey(city) {
  fetch(`${BASE_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`)
    .then((response) => response.json()) // asynchronous programming
    .then((data) => {
     const location = data[0];
     getCurrentCondition(location);
    }) // returning a promise
    .catch((err) => console.log(err));
}

// get the "current condition" based on the `location` argument!
// then call updateUI to update the UI!
function getCurrentCondition(location) {
  const key = location.Key;
  fetch(`${BASE_URL}/currentconditions/v1/${key}?apikey=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      updateUI(location, data[0]);
    })
    .catch((err) => console.log(err));
}

function updateUI(location, forecast) {
  const cityName = location.LocalizedName;
  const condition = forecast.WeatherText;
  const temperature = forecast.Temperature.Imperial.Value;
  document.getElementById("name").innerText = `${cityName}`;
  document.getElementById("condition").innerText = condition;
  document.getElementById("temperature").innerText = `${temperature} F`;
}
