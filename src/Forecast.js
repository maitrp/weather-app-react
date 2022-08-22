import { useState } from "react";
import axios from "axios";

export default function Forecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [weatherForecast, setWeatherForecast] = useState([]);

  function showWeatherForecast(response) {
    setLoaded(true);
    setWeatherForecast(response.data.daily);
  }

  function day(forecastDay) {
    let date = new Date(forecastDay * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  if (loaded) {
    return (
      <ul className="Forecast">
        {weatherForecast.slice(1, 7).map(function (dailyForecast, index) {
          return (
            <li key={index}>
              <div>{day(dailyForecast.dt)}</div>
              <img
                src="precipitation.svg"
                alt="precipitation icon"
                width="25"
              ></img>
              {dailyForecast.pop * 100}
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`}
                  alt=""
                  width="50"
                ></img>
              </div>
              <div>
                {Math.round(dailyForecast.temp.max)}°{" "}
                {Math.round(dailyForecast.temp.min)}°
              </div>
            </li>
          );
        })}
      </ul>
    );
  } else {
    let apiKey = "11b3cb871ddaf6251b502e31b790f412";
    let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.coord.lat}&lon=${props.coord.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiForecastUrl).then(showWeatherForecast);
  }
}
