export default function WeatherForecast() {
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
      precipitation: "80%",
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
      precipitation: "20%",
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

  // Get API & call for weather forecast
  // let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`;
  // axios.get(apiForecastUrl).then(showWeatherForecast);

  return (
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
  );
}
