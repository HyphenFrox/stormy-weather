import { IconButton, makeStyles, Paper, Typography } from "@material-ui/core";
import { lightBlue } from "@material-ui/core/colors";
import React from "react";
import {
  WiStrongWind,
  WiWindDeg,
  WiHumidity,
  WiRain,
  WiCloudy,
  WiDaySunny,
  WiFog,
} from "weather-icons-react";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles((theme) => ({
  rootPaper: {
    padding: "2em",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "80%",
      margin: "auto",
    },
  },
  refreshIconContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  currentWeatherSection: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
    "& > *": {
      margin: "1em",
    },
  },
  currentTempSection: {
    display: "flex",
    alignContent: "center",
    alignItems: "stretch",
  },
  conditionIcon: {
    width: 100,
    height: 100,
    margin: "auto",
  },
  tempNumberSection: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  windSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > * + *": {
      marginLeft: "0.5em",
    },
  },
  flexJCCAIC: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  humiditySection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function WeatherData(props) {
  const { weatherData, handleRefreshWeather, unit } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.rootPaper}>
      <div className={classes.refreshIconContainer}>
        <IconButton color="primary" onClick={handleRefreshWeather}>
          <RefreshIcon></RefreshIcon>
        </IconButton>
      </div>
      <div className={classes.currentWeatherSection}>
        <div className={classes.currentTempSection}>
          <Typography
            variant="h4"
            align="center"
            style={{ fontSize: "2.5rem", margin: "auto" }}
          >
            {weatherData.current.condition.text}
          </Typography>
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
            className={classes.conditionIcon}
          ></img>
          <Typography
            variant="h4"
            style={{ fontSize: "2.5rem", margin: "auto" }}
          >
            {weatherData.current.temp_c}
            <sup>o</sup>C
          </Typography>
        </div>
        <div className={classes.flexJCCAIC}>
          <WiCloudy size={70} color={lightBlue["A200"]}></WiCloudy>
          <Typography variant="h4" style={{ fontSize: "2rem" }}>
            Cloud: {weatherData.current.cloud}%
          </Typography>
        </div>
        <div className={classes.flexJCCAIC}>
          <WiRain size={70} color={lightBlue["A200"]}></WiRain>
          <Typography variant="h4" style={{ fontSize: "2rem" }}>
            {unit === "metric"
              ? `Precipitation: ${weatherData.current.precip_mm} mm`
              : `Precipitation: ${weatherData.current.precip_in} inches`}
          </Typography>
        </div>
        <div className={classes.humiditySection}>
          <WiHumidity size={70} color={lightBlue["A200"]}></WiHumidity>
          <Typography variant="h4" style={{ fontSize: "2rem" }}>
            Humidity: {weatherData.current.humidity}%
          </Typography>
        </div>
        <div className={classes.windSection}>
          <div className={classes.flexJCCAIC}>
            <WiStrongWind size={70} color={lightBlue["A200"]}></WiStrongWind>
            <Typography variant="h4" style={{ fontSize: "2rem" }}>
              {unit === "metric"
                ? `${weatherData.current.wind_kph} KM/H`
                : `${weatherData.current.wind_mph} Miles/H`}
            </Typography>
          </div>
          <div className={classes.flexJCCAIC}>
            <WiWindDeg size={50} color={lightBlue["A200"]}></WiWindDeg>
            <Typography variant="h4" style={{ fontSize: "2rem" }}>
              {weatherData.current.wind_degree} <sup>o</sup>
              {weatherData.current.wind_dir}
            </Typography>
          </div>
        </div>
        <div className={classes.flexJCCAIC}>
          <WiDaySunny size={70} color={lightBlue["A200"]}></WiDaySunny>
          <Typography variant="h4" style={{ fontSize: "2rem" }}>
            UV Index: {weatherData.current.uv}
          </Typography>
        </div>
        <div className={classes.flexJCCAIC}>
          <WiFog size={70} color={lightBlue["A200"]}></WiFog>
          <Typography variant="h4" style={{ fontSize: "2rem" }}>
            {unit === "metric"
              ? `Visiblity: ${weatherData.current.vis_km} KMs`
              : `Visiblity: ${weatherData.current.vis_miles} Miles`}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default WeatherData;
