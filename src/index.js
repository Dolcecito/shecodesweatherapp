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
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let todayHour = `${hours}:${minutes}`;
let showWeekday = document.querySelector("#titleweekday");
let todayWeekDay = weekDays[now.getDay()];
showWeekday.innerHTML = `${todayWeekDay}, ${todayHour}`;

function showTemp(response) {
  let nowTemp = document.querySelector("#nownumber");
  let nowCity = document.querySelector("#nowCity");
  let nowMax = document.querySelector("#nowMax");
  let nowMin = document.querySelector("#nowMin");
  let nowDate = document.querySelector("#today-date");
  let nowDescrip = document.querySelector("#nowDescrip");
  let nowIcon = document.querySelector("#nowIcon");
  celsiusTemp = response.data.main.temp;
  nowTemp.innerHTML = Math.round(celsiusTemp);
  nowCity.innerHTML = response.data.name;
  nowMax.innerHTML = response.data.main.temp_max;
  nowMin.innerHTML = response.data.main.temp_min;
  nowDate.innerHTML = "TODAY";
  nowDescrip.innerHTML = response.data.weather[0].description;
  nowIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function showForecast(response) {
  let forecastSection = document.querySelector("#forecast");
  forecastSource = response.data.list[0];
  forecastSection.innerHTML = `
          <div class="card" style="width: 8rem;">
            <div class="card-body">
              <img src="http://openweathermap.org/img/wn/${forecastSource.weather[0].icon}@2x.png"/>
              <h5 class="card-tuesday" id="descrip1">${forecastSource.weather[0].description}</h5>
              <h6 class="card-subtitle mb-2 text-muted" id="day1">TOMORROW</h6>
            </div>
          </div>`;
}

function generate(city) {
  let apiKey = "78f8e0a39c4d8f38e86511359618c7bb";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemp);

  apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showForecast);
}
function searchCity(event) {
  event.preventDefault();
  let cityIn = document.querySelector("#searchcity");
  generate(cityIn.value);
}

function showFahren(event) {
  event.preventDefault();
  let nowTemp = document.querySelector("#nownumber");
  celsius.classList.remove("active");
  fahren.classList.add("active");
  nowTemp.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}
function showCelsius(event) {
  event.preventDefault();
  let nowTemp = document.querySelector("#nownumber");
  celsius.classList.add("active");
  fahren.classList.remove("active");
  nowTemp.innerHTML = Math.round(celsiusTemp);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchCity);

let showNowTempF = document.querySelector("#fahren");
showNowTempF.addEventListener("click", showFahren);

let showNowTempC = document.querySelector("#celsius");
showNowTempC.addEventListener("click", showCelsius);

generate("Mexico City");

function showPosition(position) {
  let yourposition = document.querySelector(".nowcity");
  yourposition.innerHTML = `In lat ${position.coords.latitude} & lon ${position.coords.longitude}`;

  function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  let button = document.querySelector("button");
  button.addEventListener("click", getCurrentPosition);
}
