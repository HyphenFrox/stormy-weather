import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useQuery } from "react-query";

//
import Theme from "./components/Theme";
import FilterSection from "./components/FilterSection";
import fetchWeatherData from "./services/fetchWeatherData";
import WeatherDataLoading from "./components/WeatherDataLoading";
import WeatherDataError from "./components/WeatherDataError";
import WeatherData from "./components/WeatherData";
//

const useStyles = makeStyles((theme) => ({
  app: {
    padding: "1em 0.5em 1em 0.5em",
    "& > * + *": {
      marginTop: "1em",
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "1em",
      paddingRight: "1em",
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

function App() {
  // location filter value state
  const [locationValue, setLocationValue] = useState(null);
  const handleLocationValueChange = (...args) => {
    const [, newValue] = args;
    setLocationValue(newValue);
  };
  //

  // fetch weather data
  const {
    status: fetchWeatherDataStatus,
    error: fetchWeatherDataError,
    data: weatherData,
  } = useQuery(["fetchWeatherData", locationValue], fetchWeatherData);
  //

  const classes = useStyles();
  return (
    <>
      <Theme>
        <div className={classes.app}>
          <Typography variant="h1" align="center" style={{ fontSize: "3rem" }}>
            Weather App
          </Typography>
          <div className={classes.filterSectionContainer}>
            <FilterSection
              locationValue={locationValue}
              handleLocationValueChange={handleLocationValueChange}
            ></FilterSection>
          </div>
          {fetchWeatherDataStatus === "success" && locationValue && (
            <WeatherData weatherData={weatherData}></WeatherData>
          )}
          {fetchWeatherDataStatus === "loading" && (
            <WeatherDataLoading></WeatherDataLoading>
          )}
          {fetchWeatherDataStatus === "error" && (
            <WeatherDataError error={fetchWeatherDataError}></WeatherDataError>
          )}
        </div>
      </Theme>
    </>
  );
}

export default App;
