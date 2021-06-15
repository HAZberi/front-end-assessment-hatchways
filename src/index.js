import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//Material-ui Theme Context Imports
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme.js";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
