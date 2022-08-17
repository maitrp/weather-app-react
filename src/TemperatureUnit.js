import { useState } from "react";
import "./TemperatureUnit.css";

export default function TemperatureUnit(props) {
  let [unit, setUnit] = useState("celsius");

  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function showCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
    return (
      <span className="TemperatureUnit">
        <span className="current-temperature">{props.unit}</span>{" "}
        <span>°C</span> |{" "}
        <a href="/" onClick={showFahrenheit}>
          °F
        </a>
      </span>
    );
  } else {
    return (
      <span>
        <span className="current-temperature">
          {Math.round((props.unit * 9) / 5 + 32)}
        </span>{" "}
        <a href="/" onClick={showCelsius}>
          °C
        </a>{" "}
        |<span> °F</span>
      </span>
    );
  }
}
