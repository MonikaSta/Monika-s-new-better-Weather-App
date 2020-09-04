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
let now = new Date();
document.querySelector("#display-date").innerHTML = formatDate(now);
