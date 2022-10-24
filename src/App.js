import React, { useState, useEffect } from 'react';

import Header from "./components/Header";
import Loader from "./components/Loader";
import CurrentWeather from "./components/Current-weather";

import getAddressOfCoordinates from "./api/get-address";
import getCoordinatesOfAddress from "./api/get-coordinates";
import getWeatherAndForecast from "./api/weather-forecast";

import './App.css';

function App() {

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [weatherAndForecastInfo, setWeatherAndForecastInfo] = useState({});
  const [locationInfo, setLocationInfo] = useState({});
  const [contentState, setContentState] = useState("blank");
  const [bgImage, setBgImage] = useState("");

  function searchCity(target) {
    setAddress(target);
  }


  /* GET LOCATION */
  useEffect(() => {
    function makeRequest(position) {
      setContentState("loading");
      getAddressOfCoordinates(
        position.coords.latitude,
        position.coords.longitude
      )
        .then((res) => {
          setLocationInfo({
            city: res.data.results[0].components.city_district,
            town: res.data.results[0].components.town,
            state: res.data.results[0].components.state_code,
            country: res.data.results[0].components.country_code
          });
        })
        .then(() =>
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        )
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(makeRequest);
    } else {
      alert("Geolocation is not supported by this browser.");
    }

  }, []);


  /* GET ADDRESS */
  useEffect(() => {
    if (address === "") return;

    setContentState("loading");
    getCoordinatesOfAddress(address)
      .then((res) => {
        setCoordinates(res.data.results[0].geometry);
        setLocationInfo({
          city: res.data.results[0].components.city,
          town: res.data.results[0].components.town,
          state: res.data.results[0].components.state_code,
          country: res.data.results[0].components.country_code
        });
      })
  
  }, [address]);


  /* GET WEATHER */
  useEffect(() => {
    if (Object.keys(coordinates).length === 0) return;

    getWeatherAndForecast(coordinates)
      .then((res) => {
        setWeatherAndForecastInfo(res.data);
        setBgImage(res.data.current.weather[0].main)
        setContentState("weatherAndForecast");
      })

  }, [coordinates]);

  /* MAIN COMPONENTS SETUP */
  const Main = {
    blank: () => null,
    loading: () => <Loader />,
    weatherAndForecast: () => (
      <CurrentWeather
        weatherInfo={weatherAndForecastInfo}
        location={locationInfo}
      />
    )
  };

  /* APP */
  return (
    <div className="App">
      <div className="App__container" style={{backgroundImage: "url(img/bg/" + `${bgImage}.jpg` + ")"}}>
      
          <Header searchCity={searchCity} />
          {Main[contentState]()}
        
      </div>
    </div>
  );
}

export default App;
