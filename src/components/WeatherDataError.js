import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  rootPaper: {
    minHeight: 200,
    display: "flex",
    alignItems: "center",
  },
});

function WeatherDataError(props) {
  const { error } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.rootPaper}>
      <Typography
        variant="h4"
        align="center"
        style={{ fontSize: "1.6rem", textTransform: "capitalize" }}
      >
        Error While Fetching Weather Data: {error.toString()}
      </Typography>
    </Paper>
  );
}

export default WeatherDataError;
