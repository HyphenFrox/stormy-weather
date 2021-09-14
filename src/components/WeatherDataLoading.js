import {
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  loadingPaper: {
    minHeight: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  progressLoader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > * + *": {
      marginLeft: "1em",
    },
  },
});

function WeatherDataLoading() {
  const classes = useStyles();
  return (
    <Paper className={classes.loadingPaper}>
      <div className={classes.progressLoader}>
        <CircularProgress></CircularProgress>
        <Typography variant="h4" style={{ fontSize: "1.6rem" }}>
          Loading Weather Data
        </Typography>
      </div>
    </Paper>
  );
}

export default WeatherDataLoading;
