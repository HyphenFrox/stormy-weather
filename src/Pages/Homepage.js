import React, { useState } from "react";
import { makeStyles, Typography, Paper } from "@material-ui/core";
import { useQueryClient, useQuery } from "react-query";

//
import FilterSection from "../components/FilterSection";
import fetchWeatherData from "../services/fetchWeatherData";
import WeatherDataLoading from "../components/WeatherDataLoading";
import WeatherDataError from "../components/WeatherDataError";
import WeatherData from "../components/WeatherData";
import NoCitySelected from "../components/NoCitySelected";
import useFlexbox from "../services/useFlexbox";
import classNames from "classnames";
//

const useStyles = makeStyles((theme) => ({
  app: {
    minHeight: "100%",
    padding: "1em 0.5em 1em 0.5em",
  },
  filterSectionContainer: {
    marginTop: "1.5em",
  },
  content: {
    minHeight: 200,
    padding: "1em",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "80%",
    },
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
  const flexbox = useFlexbox();
  return (
    <>
      <div className={classNames(flexbox.flexboxColumn, classes.app)}>
        <Typography variant="h1" align="center" style={{ fontSize: "3rem" }}>
          {fetchWeatherDataStatus === "success" && weatherData
            ? `Weather in ${weatherData.location.name}`
            : "Weather App"}
        </Typography>

        <div
          className={classNames(
            flexbox.flexboxRow,
            classes.filterSectionContainer
          )}
        >
          <FilterSection
            locationValue={locationValue}
            handleLocationValueChange={handleLocationValueChange}
            unit={unit}
            handleUnitChange={handleUnitChange}
            isNearbyWeatherOn={isNearbyWeatherOn}
            handleIsNearbyWeatherOnChange={handleIsNearbyWeatherOnChange}
          ></FilterSection>
        </div>

        <Paper className={classNames(flexbox.flexboxColumn, classes.content)}>
          {fetchWeatherDataStatus === "success" && weatherData ? (
            <WeatherData
              weatherData={weatherData}
              unit={unit}
              handleRefreshWeather={handleRefreshWeather}
            ></WeatherData>
          ) : fetchWeatherDataStatus === "loading" ? (
            <WeatherDataLoading></WeatherDataLoading>
          ) : fetchWeatherDataStatus === "error" ? (
            <WeatherDataError error={fetchWeatherDataError}></WeatherDataError>
          ) : !locationValue?.value ? (
            <NoCitySelected></NoCitySelected>
          ) : null}
        </Paper>
      </div>
    </>
  );
}

export default Homepage;
