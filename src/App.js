import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  let apiKey = "11b3cb871ddaf6251b502e31b790f412";
  let [city, setCity] = useState("Hanoi");
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let [currentWeather, setCurrentWeather] = useState([]);

  let forecast = [
    {
      day: "Sat",
      precipitation: "100%",
      icon: `http://openweathermap.org/img/wn/01d@2x.png`,
      tempmax: 32,
      tempmin: 20,
    },
    {
      day: "Sun",
      precipitation: "90%",
      icon: `http://openweathermap.org/img/wn/01d@2x.png`,
      tempmax: 35,
      tempmin: 24,
    },
    {
      day: "Mon",
      precipitation: "800%",
      icon: `http://openweathermap.org/img/wn/01d@2x.png`,
      tempmax: 36,
      tempmin: 26,
    },
    {
      day: "Tue",
      precipitation: "50%",
      icon: `http://openweathermap.org/img/wn/01d@2x.png`,
      tempmax: 37,
      tempmin: 28,
    },
    {
      day: "Wed",
      precipitation: "200%",
      icon: `http://openweathermap.org/img/wn/01d@2x.png`,
      tempmax: 38,
      tempmin: 29,
    },
  ];

  // function showWeatherForecast(response) {
  // console.log(response.data.daily);
  // setWeatherForecast([
  // Math.round(response.data.daily.pop * 100),
  // `http://openweathermap.org/img/wn/${response.data.daily.weather[0].icon}@2x.png`,
  // response.data.daily.weather[0].description,
  // Math.round(response.data.daily.temp.max),
  // Math.round(response.data.daily.temp.min),
  // ]);
  // }

  function showCurrentWeather(response) {
    setCurrentWeather([
      Math.round(response.data.main.temp),
      response.data.main.humidity,
      Math.round(response.data.wind.speed * 3.6),
      response.data.weather[0].description,
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      response.data.name,
    ]);

    // Get API & call for weather forecast
    // let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`;
    // axios.get(apiForecastUrl).then(showWeatherForecast);
  }

  if (currentWeather.length === 0) {
    axios.get(urlApi).then(showCurrentWeather);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.get(urlApi).then(showCurrentWeather);
  }

  function searchCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a city to search"
          onChange={searchCity}
        />
        <button type="submit" className="material-symbols-outlined">
          Search
        </button>
      </form>
      <button type="submit">My location</button>

      <div className="current-weather">
        <div className="current-temperature">
          <img src={currentWeather[4]} width="50" alt=""></img>
          <span className="current-temperature-detail">
            {currentWeather[0]} °C
          </span>
        </div>
        <div className="current-details">
          <img
            src="precipitation.svg"
            width="25"
            alt="precipitation icon"
          ></img>
          <span>81%</span>
          <img src="humidity.svg" width="30" alt="humidity icon"></img>
          <span>{currentWeather[1]}%</span>
          <div>Wind: {currentWeather[2]} km/h</div>
          <div>UV Index: 0, Low</div>
        </div>
        <div className="city-time">
          <div>{currentWeather[5]}</div>
          <div>Friday 18:28</div>
          <div>{currentWeather[3]}</div>
        </div>
      </div>
      <ul className="forecast">
        {forecast.map(function (forecastDay, index) {
          return (
            <li key={index}>
              <div>{forecastDay.day}</div>
              <img
                src="precipitation.svg"
                alt="precipitation icon"
                width="25"
              ></img>
              {forecastDay.precipitation}
              <div>
                <img src={forecastDay.icon} alt="" width="50"></img>
              </div>
              <div>
                {forecastDay.tempmax}° {forecastDay.tempmin}°
              </div>
            </li>
          );
        })}
      </ul>

      <footer>
        <a
          href="https://github.com/maitrp/weather-app-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open-source code
        </a>
        , by Mai TP from{" "}
        <a
          href="https://www.shecodes.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          SheCodes
        </a>
      </footer>
    </div>
  );
}

export default App;
