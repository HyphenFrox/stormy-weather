import axios from "axios";

export default async function fetchLocation({ queryKey }) {
  const [, locationInputValue] = queryKey;

  if (locationInputValue) {
    let url = `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_weatherAPIKey}&q=${locationInputValue}`;

    url = encodeURI(url);

    const { data: locationResults } = await axios.get(url);

    return locationResults;
  }

  return [];
}
