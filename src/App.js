import React, { useState } from "react";
import axios from "axios";
import Forecast from "./Forecast";
import FormattedDate from "./FormattedDate";
import TemperatureUnit from "./TemperatureUnit";
import "./App.css";

export default function App() {
  let apiKey = "11b3cb871ddaf6251b502e31b790f412";
  let [city, setCity] = useState("Hanoi");
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let [currentWeather, setCurrentWeather] = useState([]);

  function showCurrentWeather(response) {
    setCurrentWeather({
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed * 3.6),
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      city: response.data.name,
      timezone: response.data.timezone,
      coord: response.data.coord,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.get(urlApi).then(showCurrentWeather);
  }

  function searchCity(event) {
    setCity(event.target.value);
  }

  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiCurrentDayUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiCurrentDayUrl).then(showCurrentWeather);
  }

  function showLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  if (currentWeather.length === 0) {
    axios.get(urlApi).then(showCurrentWeather);
    return "Loading";
  } else {
    return (
      <div className="App">
        <div className="search-bar">
          <form onSubmit={handleSubmit} className="d-flex">
            <input
              type="search"
              placeholder="Enter a city to search"
              className="search-input"
              onChange={searchCity}
            />
            <button
              type="submit"
              className="material-symbols-outlined pulse search-submit"
            >
              Search
            </button>
          </form>
          <button
            type="submit"
            className="location-button"
            onClick={showLocation}
          >
            My location
          </button>
        </div>
        <div className="current-weather">
          <div className="current-icon-temperature d-flex">
            <img
              src={currentWeather.icon}
              width="50"
              alt={currentWeather.description}
              className="current-icon"
            />
            <TemperatureUnit unit={currentWeather.temperature} />
          </div>
          <div className="current-details">
            <ul>
              {/* <img src="precipitation.svg" width="25" alt="precipitation icon" />
          <span>81%</span> */}
              <li className="d-flex">
                <img
                  src="humidity.svg"
                  width="30"
                  alt="humidity icon"
                  className="humidity"
                />
                <span>{currentWeather.humidity}%</span>
              </li>
              <li>
                <div>Wind: {currentWeather.wind} km/h</div>
              </li>
              {/*<div>UV Index: 0, Low</div> */}
            </ul>
          </div>
          <div className="city-time">
            <div>{currentWeather.city}</div>
            <div>
              <FormattedDate timezone={currentWeather.timezone} />
            </div>
            <div className="description">{currentWeather.description}</div>
          </div>
        </div>
        <Forecast coord={currentWeather.coord} />
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
}
