import React from "react";
import ReactDOM from "react-dom";

import "./styles/index.css";
import "./styles/palette.css";
import "./styles/fonts.css";
import "./styles/elements.css";

import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import { ViewProvider } from "context/AppContext";

ReactDOM.render(
  <ViewProvider>
    <Home />
  </ViewProvider>,
  document.getElementById("root")
);

reportWebVitals();
