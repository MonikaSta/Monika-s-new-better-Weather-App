let now = new Date();
function formatDate(date) {
  let weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Nov',
    'Dec',
  ];
  let weekDay = weekDays[date.getDay()];
  let month = months[date.getMonth()];
  let day = date.getDate();

  return `${weekDay}, ${month} ${day}`;
}

function formatTime(time) {
  let hours = time.getHours();
  return `${formatHours(time)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

document.querySelector('#display-date').innerHTML = formatDate(now);
document.querySelector('#display-time').innerHTML = formatTime(now);

function showTemperature(response) {
  let currentLocation = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = response.data.main.temp;
  document.querySelector('#current-location').innerHTML = `${currentLocation}`;
  document.querySelector('#current-temperature').innerHTML = `${temperature}`;
  document.querySelector('#description').innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    '#humidity'
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector('#wind').innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/h`;
  document
    .querySelector('#icon')
    .setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector('#icon')
    .setAttribute('alt', response.data.weather[0].description);
}

function displayForcast(response) {
  let forecastElement = document.querySelector('#forecast');
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
            <h3>
              ${formatHours(forecast.dt * 1000)}
            </h3>
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" alt="" />
            <div class="weather-forecast-temperature">
              <strong>${Math.round(
                forecast.main.temp_max
              )}°</strong> ${Math.round(forecast.main.temp_min)}°
            </div>
          </div>`;
  }
}

function search(city) {
  let apiKey = '980705a0ba4bf0987a707dd1c07fbc80';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}  &appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}
function displayCityTemp(event) {
  event.preventDefault();
  let cityInput = document.querySelector('#city-input');
  search(cityInput.value);
}

let cityInput = document.querySelector('#search-form');
cityInput.addEventListener('submit', displayCityTemp);

let yourTemp = document.querySelector('#button');
yourTemp.addEventListener('click', displayMyTemp);

function displayMyTemp() {
  function retrievePosition(position) {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let apiKey = '980705a0ba4bf0987a707dd1c07fbc80';
    let units = 'metric';
    let urlStartPoint = 'https://api.openweathermap.org/data/2.5/weather?';
    let apiUrl = `${urlStartPoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector('#current-temperature');
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector('#current-temperature');
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahreinheitLink = document.querySelector('#temperature-f');
fahreinheitLink.addEventListener('click', displayFahrenheitTemp);

let celsiusLink = document.querySelector('#temperature-c');
celsiusLink.addEventListener('click', displayCelsiusTemp);

search('Kaunas');
