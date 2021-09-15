import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  rootPaper: {
    minHeight: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "80%",
      margin: "auto",
    },
  },
}));

function NoCitySelected() {
  const classes = useStyles();
  return (
    <Paper className={classes.rootPaper}>
      <Typography
        variant="h4"
        style={{
          fontSize: "1.6rem",
          textTransform: "capitalize",
          margin: "auto",
        }}
      >
        please select a city from the filter above.
      </Typography>
    </Paper>
  );
}

export default NoCitySelected;
