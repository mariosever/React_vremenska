import React from 'react';

export default function CurrentWeather({ weatherInfo, location}) {

    return (
      <div className="Weather">

        <h1 className="Header__title">
            {location.city || location.town},{" "}
            {location.state || location.country.toUpperCase()}
        </h1>

        <div className="Weather__info">
          <img
            className="Weather__icon"
            src={
              "./img/" 
              + weatherInfo.current.weather[0].main +
              ".png"
            }
            alt={weatherInfo.current.weather[0].main}
          />

          <ul className="Weather__list">
            <li className="list__temperature">
              {Math.round(weatherInfo.current.temp)}
              <sup className="list__temperature-symbol">°C</sup>
            </li>
            <li> Description: {weatherInfo.current.weather[0].description}</li>
            <li> Humidity: {weatherInfo.current.humidity}% </li>
            <li>
              {" "}
              Wind: {Math.round(weatherInfo.current.wind_speed * 3.6)} km/h{" "}
            </li>
          </ul>
        </div>
      </div>
    );

  }