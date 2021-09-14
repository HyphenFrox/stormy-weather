import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  rootPaper: {
    minHeight: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    padding: "2em",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "80%",
      margin: "auto",
    },
  },
  currentTempSection: {
    display: "flex",
    alignContent: "center",
    alignItems: "stretch",
    "& > *:first-child": {
      flexShrink: 0,
    },
    "& > *:nth-child(2)": {
      flexGrow: 1,
    },
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
}));

function WeatherData(props) {
  const { weatherData } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.rootPaper}>
      <div className={classes.currentTempSection}>
        <img
          src={weatherData.current.condition.icon}
          className={classes.conditionIcon}
        ></img>
        <div className={classes.tempNumberSection}>
          <Typography
            variant="h4"
            align="center"
            style={{ fontSize: "2.5rem" }}
          >
            {weatherData.current.temp_c}
          </Typography>
          <Typography variant="h4" style={{ fontSize: "2.5rem" }}>
            <sup>o</sup>C
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default WeatherData;
