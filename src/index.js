import React from "react";
import ReactDOM from "react-dom";
import ReactQuery from "./components/ReactQuery";
import App from "./App";
import "./styles.scss";

ReactDOM.render(
  <React.StrictMode>
    <ReactQuery>
      <App></App>
    </ReactQuery>
  </React.StrictMode>,
  document.getElementById("root")
);
