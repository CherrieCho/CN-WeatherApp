import React from "react";

const WeatherBox = ({ weather }) => {
  console.log(weather);
  return (
    <div className="weather-box">
      {/* 조건부 렌더링: weather값이 없으면 false되서 안보여줌 */}
      <div>{weather?.name}</div>
      <h2>
        {weather?.main.temp}°C / {weather?.main.temp * 1.8 + 32}°F
      </h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
