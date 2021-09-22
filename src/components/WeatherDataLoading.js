import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import useFlexbox from "../services/useFlexbox";

function WeatherDataLoading() {
  const flexbox = useFlexbox();

  return (
    <div className={flexbox.flexboxRow}>
      <CircularProgress></CircularProgress>
      <Typography variant="h4" style={{ fontSize: "1.6rem" }}>
        Loading Weather Data
      </Typography>
    </div>
  );
}

export default WeatherDataLoading;
