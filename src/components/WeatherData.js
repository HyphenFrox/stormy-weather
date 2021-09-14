import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  rootPaper: {
    minHeight: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function WeatherData() {
  const classes = useStyles();
  return (
    <Paper className={classes.rootPaper}>
      <Typography variant="h4" align="center" style={{ fontSize: "1.6rem" }}>
        Work In Progress
      </Typography>
    </Paper>
  );
}

export default WeatherData;
