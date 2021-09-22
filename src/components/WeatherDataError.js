import { Typography } from "@material-ui/core";
import React from "react";

function WeatherDataError(props) {
  const { error } = props;
  return (
    <Typography
      variant="h4"
      align="center"
      style={{ fontSize: "1.6rem", textTransform: "capitalize" }}
    >
      Error While Fetching Weather Data: {error.toString()}
    </Typography>
  );
}

export default WeatherDataError;
