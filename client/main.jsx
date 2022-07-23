import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createTheme, ThemeProvider } from "@mui/material";
import App from "./App";

const container = document.querySelector("#root");
const root = createRoot(container);

const theme = createTheme({
  palette: {
    primary: {
      main: "#a2e5ff",
      light: "#d0f2ff",
      dark: "#42a5f5",
    },
    secondary: {
      main: "#2e89ac",
      dark: "#206b78",
      light: "#ac972e",
    },
  },
  typography: {
    fontFamily: "Quicksand",
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
