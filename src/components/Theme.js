import React from "react";
import { createTheme, CssBaseline } from "@material-ui/core";
import { deepOrange, indigo } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";

function Theme(props) {
  const { children } = props;
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: indigo["A200"],
      },
      secondary: {
        main: deepOrange["A200"],
      },
      background: {
        default: "#80d8ff",
      },
    },
    typography: {
      fontFamily: "'Raleway', sans-serif",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {children}
      <CssBaseline></CssBaseline>
    </ThemeProvider>
  );
}

export default Theme;
