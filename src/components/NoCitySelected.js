import { Typography } from "@material-ui/core";
import React from "react";

function NoCitySelected() {
  return (
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
  );
}

export default NoCitySelected;
