import React from 'react';

const CountryWeather = ({ weather }) => {

  return (
    <div>
      <h3>Weather in {weather.name}</h3>
      <p><strong>Temperature:</strong> {(weather.main.temp - 273.15).toFixed(2)}°C</p>
      <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
      <p><strong>Weather:</strong> {weather.weather[0].description}</p>
      {weather.weather[0].icon && (
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" />
      )}
    </div>
  );
};

export default CountryWeather;