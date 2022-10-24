import axios from "axios";

async function getWeatherAndForecast(coordinates) {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/onecall?",
    {
      params: {
        lat: coordinates.lat,
        lon: coordinates.lng,
        exclude: "minutely,hourly,alerts",
        appid: "a584720c43c130d020ae58d96440565e",
        units: "metric"
      }
    }
  );
  return response;
}

export default getWeatherAndForecast;