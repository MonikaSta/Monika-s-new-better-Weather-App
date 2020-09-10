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
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
let now = new Date();
document.querySelector('#display-date').innerHTML = formatDate(now);
document.querySelector('#display-time').innerHTML = formatTime(now);

function displayCityTemp(event) {
  event.preventDefault();
  let cityInput = document.querySelector('#city-input').value;
  let h1 = document.querySelector('h1');
  if (cityInput < 0) {
    alert('Please enter your city');
  }
  let units = 'metric';
  let apiKey = '980705a0ba4bf0987a707dd1c07fbc80';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;

  function displayMoreInfo(response) {
    document.querySelector('#description').innerHTML =
      response.data.weather[0].description;
    document.querySelector('#current-location').innerHTML = response.data.name;
    document.querySelector('#current-temperature').innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector(
      '#humidity'
    ).innerHTML = `${response.data.main.humidity}%`;
    document.querySelector('#wind').innerHTML = `${Math.round(
      response.data.wind.speed
    )}km/h`;
    console.log(response.data);
  }
  axios(apiUrl).then(displayMoreInfo);
}
let cityInput = document.querySelector('#search-form');
cityInput.addEventListener('submit', displayCityTemp);

let yourTemp = document.querySelector('#button');
yourTemp.addEventListener('click', displayMyTemp);

function displayMyTemp() {
  function showTemperature(response) {
    let currentLocation = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    document.querySelector(
      '#current-location'
    ).innerHTML = `${currentLocation}`;
    document.querySelector('#current-temperature').innerHTML = `${temperature}`;
    document.querySelector('#description').innerHTML =
      response.data.weather[0].description;
    document.querySelector(
      '#humidity'
    ).innerHTML = `${response.data.main.humidity}%`;
    document.querySelector('#wind').innerHTML = `${Math.round(
      response.data.wind.speed
    )}km/h`;
    console.log(response);
  }

  function retrievePosition(position) {
    let longitude = Math.round(position.coords.longitude);
    let latitude = Math.round(position.coords.latitude);
    let apiKey = '980705a0ba4bf0987a707dd1c07fbc80';
    let units = 'metric';
    let urlStartPoint = 'https://api.openweathermap.org/data/2.5/weather?';
    let apiUrl = `${urlStartPoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}
