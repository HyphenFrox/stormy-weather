import { IconButton, makeStyles, Typography } from "@material-ui/core";
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
import classNames from "classnames";

//
import useFlexbox from "../services/useFlexbox";
//

const useStyles = makeStyles({
  refreshIconContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  conditionIcon: {
    width: 100,
    height: 100,
  },
});

function WeatherData(props) {
  const { weatherData, handleRefreshWeather, unit } = props;
  const classes = useStyles();
  const flexbox = useFlexbox();
  return (
    <div className={flexbox.flexboxRowWrap}>
      <div
        className={classNames(flexbox.flexboxRow, classes.refreshIconContainer)}
      >
        <IconButton color="primary" onClick={handleRefreshWeather}>
          <RefreshIcon></RefreshIcon>
        </IconButton>
        <Typography variant="h4" style={{ fontSize: "1rem" }}>
          Refresh Weather
        </Typography>
      </div>
      <div className={flexbox.flexboxColumn}>
        <Typography variant="h4" align="center" style={{ fontSize: "2.5rem" }}>
          {weatherData.current.condition.text}
        </Typography>
        <img
          src={weatherData.current.condition.icon}
          alt={weatherData.current.condition.text}
          className={classes.conditionIcon}
        ></img>
        <Typography variant="h4" style={{ fontSize: "2.5rem" }}>
          {weatherData.current.temp_c}
          <sup>o</sup>C
        </Typography>
        <div className={flexbox.flexboxRow}>
          <WiCloudy size={70} color={lightBlue["A200"]}></WiCloudy>
          <Typography variant="h4" style={{ fontSize: "2rem" }}>
            Cloud: {weatherData.current.cloud}%
          </Typography>
        </div>
        <div className={flexbox.flexboxRow}>
          <WiRain size={70} color={lightBlue["A200"]}></WiRain>
          <Typography variant="h4" style={{ fontSize: "2rem" }}>
            {unit === "metric"
              ? `Precipitation: ${weatherData.current.precip_mm} mm`
              : `Precipitation: ${weatherData.current.precip_in} inches`}
          </Typography>
        </div>
        <div className={flexbox.flexboxRow}>
          <WiHumidity size={70} color={lightBlue["A200"]}></WiHumidity>
          <Typography variant="h4" style={{ fontSize: "2rem" }}>
            Humidity: {weatherData.current.humidity}%
          </Typography>
        </div>
        <div className={flexbox.flexboxRow}>
          <div className={flexbox.flexboxRow}>
            <WiStrongWind size={70} color={lightBlue["A200"]}></WiStrongWind>
            <Typography variant="h4" style={{ fontSize: "2rem" }}>
              {unit === "metric"
                ? `${weatherData.current.wind_kph} KM/H`
                : `${weatherData.current.wind_mph} Miles/H`}
            </Typography>
          </div>
          <div className={flexbox.flexboxRow}>
            <WiWindDeg size={50} color={lightBlue["A200"]}></WiWindDeg>
            <Typography variant="h4" style={{ fontSize: "2rem" }}>
              {weatherData.current.wind_degree} <sup>o</sup>
              {weatherData.current.wind_dir}
            </Typography>
          </div>
        </div>
        <div className={flexbox.flexboxRow}>
          <WiDaySunny size={70} color={lightBlue["A200"]}></WiDaySunny>
          <Typography variant="h4" style={{ fontSize: "2rem" }}>
            UV Index: {weatherData.current.uv}
          </Typography>
        </div>
        <div className={flexbox.flexboxRow}>
          <WiFog size={70} color={lightBlue["A200"]}></WiFog>
          <Typography variant="h4" style={{ fontSize: "2rem" }}>
            {unit === "metric"
              ? `Visiblity: ${weatherData.current.vis_km} KMs`
              : `Visiblity: ${weatherData.current.vis_miles} Miles`}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default WeatherData;
