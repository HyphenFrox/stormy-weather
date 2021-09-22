import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useQueryClient, useQuery } from "react-query";

//
import FilterSection from "../components/FilterSection";
import fetchWeatherData from "../services/fetchWeatherData";
import WeatherDataLoading from "../components/WeatherDataLoading";
import WeatherDataError from "../components/WeatherDataError";
import WeatherData from "../components/WeatherData";
import NoCitySelected from "../components/NoCitySelected";
//

const useStyles = makeStyles((theme) => ({
  app: {
    padding: "1em 0.5em 1em 0.5em",
    "& > * + *": {
      marginTop: "1em",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "2em 1em",
    },
  },
  filterSectionContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    padding: "1em",
  },
}));

function Homepage() {
  // location filter value state
  const [locationValue, setLocationValue] = useState(null);
  const handleLocationValueChange = (...args) => {
    const [, newValue] = args;
    setLocationValue({
      type: "select",
      value: newValue,
    });
  };
  //

  // fetch weather data
  const {
    status: fetchWeatherDataStatus,
    error: fetchWeatherDataError,
    data: weatherData,
  } = useQuery(["fetchWeatherData", locationValue], fetchWeatherData);
  //

  // handle refresh weather
  const queryClient = useQueryClient();
  const handleRefreshWeather = () => {
    queryClient.invalidateQueries(["fetchWeatherData", locationValue]);
  };
  //

  // unit
  const [unit, setUnit] = useState("metric");
  const handleUnitChange = (event) => setUnit(event.target.value);
  //

  // nearby weather
  const [isNearbyWeatherOn, setIsNearbyWheatherOn] = useState(false);
  const handleIsNearbyWeatherOnChange = (event) => {
    if (event.target.checked === true && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocationValue({ type: "geoLocation", value: position.coords });
        setIsNearbyWheatherOn(true);
      });
    }
    if (event.target.checked === false) {
      setLocationValue(null);
      setIsNearbyWheatherOn(false);
    }
  };
  //

  const classes = useStyles();
  return (
    <>
      <div className={classes.app}>
        <Typography variant="h1" align="center" style={{ fontSize: "3rem" }}>
          {fetchWeatherDataStatus === "success" && weatherData
            ? `Weather in ${weatherData.location.name}`
            : "Weather App"}
        </Typography>

        <div className={classes.filterSectionContainer}>
          <FilterSection
            locationValue={locationValue}
            handleLocationValueChange={handleLocationValueChange}
            unit={unit}
            handleUnitChange={handleUnitChange}
            isNearbyWeatherOn={isNearbyWeatherOn}
            handleIsNearbyWeatherOnChange={handleIsNearbyWeatherOnChange}
          ></FilterSection>
        </div>
        {fetchWeatherDataStatus === "success" && locationValue && (
          <WeatherData
            weatherData={weatherData}
            unit={unit}
            handleRefreshWeather={handleRefreshWeather}
          ></WeatherData>
        )}
        {fetchWeatherDataStatus === "loading" && (
          <WeatherDataLoading></WeatherDataLoading>
        )}
        {fetchWeatherDataStatus === "error" && (
          <WeatherDataError error={fetchWeatherDataError}></WeatherDataError>
        )}
        {!locationValue && <NoCitySelected></NoCitySelected>}
      </div>
    </>
  );
}

export default Homepage;
