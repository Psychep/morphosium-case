import { CssBaseline } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import Router from "./config/router.js";
import { store } from "./redux";
export default function App() {
  return (
    <Provider store={store}>
      <CssBaseline />

      <Router />
    </Provider>
  );
}
