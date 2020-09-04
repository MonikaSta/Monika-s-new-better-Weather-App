function formatDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
    "Nov",
    "Dec",
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
document.querySelector("#display-date").innerHTML = formatDate(now);
document.querySelector("#display-time").innerHTML = formatTime(now);

let yourTemp = document.querySelector("#button");
yourTemp.addEventListener("click", displayMyTemp);

function displayMyTemp() {
  function showTemperature(response) {
    let currentLocation = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    document.querySelector(
      "#current-location"
    ).innerHTML = `${currentLocation}`;
    document.querySelector("#current-temperature").innerHTML = `${temperature}`;
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
    console.log(response);
  }

  function retrievePosition(position) {
    let longitude = Math.round(position.coords.longitude);
    let latitude = Math.round(position.coords.latitude);
    let apiKey = "980705a0ba4bf0987a707dd1c07fbc80";
    let units = "metric";
    let urlStartPoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${urlStartPoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}
