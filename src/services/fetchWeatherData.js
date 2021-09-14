import axios from "axios";

export default async function fetchWeatherData({ queryKey }) {
  const [, locationObject] = queryKey;

  if (locationObject) {
    let url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_weatherAPIKey}&q=${locationObject.name}`;

    url = encodeURI(url);

    const { data: weatherData } = await axios.get(url);

    return weatherData;
  }
  return null;
}
