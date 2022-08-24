import { useState } from "react";
import "./TemperatureUnit.css";

export default function TemperatureUnit(props) {
  let [unit, setUnit] = useState("celsius");

  function showCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
    return (
      <span className="TemperatureUnit">
        <span className="current-temperature">{props.unit}</span>{" "}
        <span className="unit">°C</span>
      </span>
    );
  } else {
    return (
      <span>
        <span className="current-temperature">{Math.round(props.unit)}</span>{" "}
        <a href="/" onClick={showCelsius} className="unit">
          °C
        </a>
      </span>
    );
  }
}
