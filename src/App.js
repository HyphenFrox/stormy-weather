import React from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { indigo, deepOrange } from "@material-ui/core/colors";

//
import Homepage from "./Pages/Homepage";
//

function App() {
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

  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Homepage></Homepage>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
      <CssBaseline></CssBaseline>
    </ThemeProvider>
  );
}

export default App;
