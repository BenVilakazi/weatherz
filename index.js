const API_KEY = "9d3815fad8c8333773e0cfcd523d3a86";

const html = {
  weatherIcon: document.querySelector(".weather-icon>img"),
  weatherCondition: document.querySelector(".weather-condition"),
  city: document.querySelector(".city"),
  temperature: document.querySelector(".temperature"),
  humidity: document.querySelector(".humidity>.value"),
  airPressure: document.querySelector(".air-pressure>.value"),
  chanceOfRain: document.querySelector(".chance-of-rain>.value"),
  windSpeed: document.querySelector(".wind-speed>.value"),
  day: document.querySelector(".day"),
  cardOne: {
    time: document.querySelector("#card-1>.card-time"),
    temperature: document.querySelector("#card-1>.card-temperature"),
    feelsLike: document.querySelector("#card-1>.card-feels-like"),
  },
  cardTwo: {
    time: document.querySelector("#card-2>.card-time"),
    temperature: document.querySelector("#card-2>.card-temperature"),
    feelsLike: document.querySelector("#card-2>.card-feels-like"),
  },
  cardThree: {
    time: document.querySelector("#card-3>.card-time"),
    temperature: document.querySelector("#card-3>.card-temperature"),
    feelsLike: document.querySelector("#card-3>.card-feels-like"),
  },
  cardFour: {
    time: document.querySelector("#card-4>.card-time"),
    temperature: document.querySelector("#card-4>.card-temperature"),
    feelsLike: document.querySelector("#card-4>.card-feels-like"),
  },
  cardFive: {
    time: document.querySelector("#card-5>.card-time"),
    temperature: document.querySelector("#card-5>.card-temperature"),
    feelsLike: document.querySelector("#card-5>.card-feels-like"),
  },
  cardSix: {
    time: document.querySelector("#card-6>.card-time"),
    temperature: document.querySelector("#card-6>.card-temperature"),
    feelsLike: document.querySelector("#card-6>.card-feels-like"),
  },
  cardSeven: {
    time: document.querySelector("#card-7>.card-time"),
    temperature: document.querySelector("#card-7>.card-temperature"),
    feelsLike: document.querySelector("#card-7>.card-feels-like"),
  },
  cardEight: {
    time: document.querySelector("#card-8>.card-time"),
    temperature: document.querySelector("#card-8>.card-temperature"),
    feelsLike: document.querySelector("#card-8>.card-feels-like"),
  },
};

let currentDate;
let currentWeatherIcon;
let currentWeatherCondition;
let currentLocation;
let currentTemperature;
let currentHumidity;
let currentPressure;
let currentChanceOfRain;
let currentWindSpeed;
let hourlyOneHour;
let hourlyOneTemperature;
let hourlyOneFeelsLike;
let hourlyTwoHour;
let hourlyTwoTemperature;
let hourlyTwoFeelsLike;
let hourlyThreeHour;
let hourlyThreeTemperature;
let hourlyThreeFeelsLike;
let hourlyFourHour;
let hourlyFourTemperature;
let hourlyFourFeelsLike;
let hourlyFiveHour;
let hourlyFiveTemperature;
let hourlyFiveFeelsLike;
let hourlySixHour;
let hourlySixTemperature;
let hourlySixFeelsLike;
let hourlySevenHour;
let hourlySevenTemperature;
let hourlySevenFeelsLike;
let hourlyEightHour;
let hourlyEightTemperature;
let hourlyEightFeelsLike;

async function getWeatherFromCoordinates(location) {
  const lat = location.lat;
  const lon = location.lon;
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    currentWeatherIcon = data.current.weather[0].icon;
    currentWeatherCondition = data.current.weather[0].main;
    currentLocation = data.timezone;
    currentTemperature = data.current.temp;
    currentHumidity = data.current.humidity;
    currentPressure = data.current.pressure;
    currentChanceOfRain = data.daily[0].pop * 100;
    currentWindSpeed = data.current.wind_speed;
    currentDate = new Date(data.current.dt * 1000).toLocaleDateString("en-US", {
      weekday: "long",
    });
    hourlyOneHour = getTime(data.hourly[0].dt);
    hourlyTwoHour = getTime(data.hourly[1].dt);
    hourlyThreeHour = getTime(data.hourly[2].dt);
    hourlyFourHour = getTime(data.hourly[3].dt);
    hourlyFiveHour = getTime(data.hourly[4].dt);
    hourlySixHour = getTime(data.hourly[5].dt);
    hourlySevenHour = getTime(data.hourly[6].dt);
    hourlyEightHour = getTime(data.hourly[7].dt);
    hourlyOneTemperature = data.hourly[0].temp;
    hourlyTwoTemperature = data.hourly[1].temp;
    hourlyThreeTemperature = data.hourly[2].temp;
    hourlyFourTemperature = data.hourly[3].temp;
    hourlyFiveTemperature = data.hourly[4].temp;
    hourlySixTemperature = data.hourly[5].temp;
    hourlySevenTemperature = data.hourly[6].temp;
    hourlyEightTemperature = data.hourly[7].temp;
    hourlyOneFeelsLike = data.hourly[0].feels_like;
    hourlyTwoFeelsLike = data.hourly[1].feels_like;
    hourlyThreeFeelsLike = data.hourly[2].feels_like;
    hourlyFourFeelsLike = data.hourly[3].feels_like;
    hourlyFiveFeelsLike = data.hourly[4].feels_like;
    hourlySixFeelsLike = data.hourly[5].feels_like;
    hourlySevenFeelsLike = data.hourly[6].feels_like;
    hourlyEightFeelsLike = data.hourly[7].feels_like;
  } catch (error) {
    console.log(error);
  }
  renderPage();
}

function getUserLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const location = { lat, lon };
    getWeatherFromCoordinates(location);
  }
  function error() {
    alert("Unable to retrieve your location");
  }
}

async function getWeatherFromInput() {
  let isValid;
  let hasCity;
  let hasState;
  let hasCountry;
  if (
    document.querySelector("#city").value &&
    document.querySelector("#city").value != null &&
    document.querySelector("#city").value != ""
  ) {
    hasCity = true;
    isValid = true;
  }
  if (
    document.querySelector("#state").value &&
    document.querySelector("#state").value != null &&
    document.querySelector("#state").value != ""
  ) {
    hasState = true;
    isValid = true;
  }
  if (
    document.querySelector("#country").value &&
    document.querySelector("#country").value != null &&
    document.querySelector("#country").value != ""
  ) {
    hasCountry = true;
    isValid = true;
  }
  let url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  if (hasCity) {
    url = url + document.querySelector("#city").value;
  }
  if (hasState) {
    if (hasCity) {
      url = url + `,${document.querySelector("#state").value}`;
    } else {
      url = url + `${document.querySelector("#state").value}`;
    }
  }
  if (hasCountry) {
    if (hasCity || hasState) {
      url = url + `,${document.querySelector("#country").value}`;
    } else {
      url = url + `${document.querySelector("#country").value}`;
    }
  }
  url = url + `&appid=${API_KEY}&units=metric`;

  if (isValid) {
    console.log(url);
    try {
      const response = await fetch(url, { mode: "cors" });
      const data = await response.json();
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const location = { lat, lon };
      console.log(location);
      getWeatherFromCoordinates(location);
    } catch (error) {
      console.log(error);
      alert("Error: Invalid Location \nPlease enter a city name.");
    }
  }
}

function getTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  if (date.getHours().toString().length === 2) {
    return `${date.getHours()}:${"0" + date.getMinutes()}`;
  } else {
    return `${"0" + date.getHours()}:${"0" + date.getMinutes()}`;
  }
}

function initModal() {
  const modal = document.querySelector(".modal");
  const btn = document.querySelector(".location");
  const span = document.querySelector(".save-location");
  btn.onclick = function () {
    document.querySelector("#city").value = null;
    document.querySelector("#state").value = null;
    document.querySelector("#country").value = null;
    modal.style.display = "block";
  };
  span.onclick = function () {
    modal.style.display = "none";
    getWeatherFromInput();
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function renderPage() {
  html.weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`
  );
  html.weatherCondition.textContent = currentWeatherCondition;
  html.city.textContent = currentLocation;
  html.temperature.textContent = `${currentTemperature} °C`;
  html.humidity.textContent = `${currentHumidity}%`;
  html.airPressure.textContent = `${currentPressure} hPa`;
  html.chanceOfRain.textContent = `${currentChanceOfRain}%`;
  html.windSpeed.textContent = `${currentWindSpeed} m/s`;
  html.day.textContent = currentDate;
  html.cardOne.time.textContent = hourlyOneHour;
  html.cardTwo.time.textContent = hourlyTwoHour;
  html.cardThree.time.textContent = hourlyThreeHour;
  html.cardFour.time.textContent = hourlyFourHour;
  html.cardFive.time.textContent = hourlyFiveHour;
  html.cardSix.time.textContent = hourlySixHour;
  html.cardSeven.time.textContent = hourlySevenHour;
  html.cardEight.time.textContent = hourlyEightHour;
  html.cardOne.temperature.textContent = `${hourlyOneTemperature}°C`;
  html.cardTwo.temperature.textContent = `${hourlyTwoTemperature}°C`;
  html.cardThree.temperature.textContent = `${hourlyThreeTemperature}°C`;
  html.cardFour.temperature.textContent = `${hourlyFourTemperature}°C`;
  html.cardFive.temperature.textContent = `${hourlyFiveTemperature}°C`;
  html.cardSix.temperature.textContent = `${hourlySixTemperature}°C`;
  html.cardSeven.temperature.textContent = `${hourlySevenTemperature}°C`;
  html.cardEight.temperature.textContent = `${hourlyEightTemperature}°C`;
  html.cardOne.feelsLike.textContent = `Feels like ${hourlyOneFeelsLike}°C`;
  html.cardTwo.feelsLike.textContent = `Feels like ${hourlyTwoFeelsLike}°C`;
  html.cardThree.feelsLike.textContent = `Feels like ${hourlyThreeFeelsLike}°C`;
  html.cardFour.feelsLike.textContent = `Feels like ${hourlyFourFeelsLike}°C`;
  html.cardFive.feelsLike.textContent = `Feels like ${hourlyFiveFeelsLike}°C`;
  html.cardSix.feelsLike.textContent = `Feels like ${hourlySixFeelsLike}°C`;
  html.cardSeven.feelsLike.textContent = `Feels like ${hourlySevenFeelsLike}°C`;
  html.cardEight.feelsLike.textContent = `Feels like ${hourlyEightFeelsLike}°C`;
}

function onLoad() {
  initModal();
  getUserLocationWeather();
}

window.addEventListener("load", onLoad);
