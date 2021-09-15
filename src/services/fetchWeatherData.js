import axios from "axios";

export default async function fetchWeatherData({ queryKey }) {
  const [, locationObject] = queryKey;

  if (locationObject) {
    let url = ``;

    if (locationObject.type === "select") {
      url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_weatherAPIKey}&q=${locationObject.value.name}`;
    }

    if (locationObject.type === "geoLocation") {
      url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_weatherAPIKey}&q=${locationObject.value.latitude},${locationObject.value.longitude}`;
    }
    url = encodeURI(url);

    const { data: weatherData } = await axios.get(url);

    return weatherData;
  }
  return null;
}
