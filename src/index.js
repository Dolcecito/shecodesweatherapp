//Add Weekday and Hour
let now = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];
let showWeekday = document.querySelector("#titleweekday");
let todayWeekDay = weekDays[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let todayHour = `${hours}:${minutes}`;
showWeekday.innerHTML = `${todayWeekDay}, ${todayHour}`;
//LIVE WEATHER
function defaultCity(city) {
  let apiKey = "78f8e0a39c4d8f38e86511359618c7bb";
  let apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=${cityIn}&appid={apiKey}&units=metric";
  axios.get(`${apiURL}&appid${apiKey}`).then(showTemp);
}
function searchCity(event) {
  event.preventDefault();
  let cityIn = document.querySelector("#searchcity").value;
  defaultCity(cityIn);
}

function showTemp(response) {
  console.log(response.data);
  document.querySelector(".nowcity").innerHTML = response.data.name;
  document.querySelector("#nownumber").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

let searchform = document.querySelector("form");
searchform.addEventListener("submit", searchCity);

function showPosition(position) {
  let yourposition = document.querySelector(".nowcity");
  yourposition.innerHTML = `In lat ${position.coords.latitude} & lon ${position.coords.longitude}`;
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
//F link
function mathTemp(event) {
  event.preventDefault();
  let nowTemperature = document.querySelector("#nownumber");
  let temp = nowTemperature.innerHTML;
  let convert = Math.round((temp * 9) / 5 + 32);
  nowTemperature.innerHTML = `${convert}`;
}

let nowTempF = document.querySelector("#fahren");
nowTempF.addEventListener("click", mathTemp);

let nowTempC = document.querySelector("#celcius");
nowTempC.addEventListener("click", showTemp);

defaultCity(`Mexico City`);
