import React from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import "./styles/index.css";
import "./styles/palette.css";
import "./styles/fonts.css";
import "./styles/elements.css";

import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import { ViewProvider } from "context/AppContext";

// Web3 Wallet
function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  // <React.StrictMode>
    <ViewProvider>
      <Home />
    </ViewProvider>
  // </React.StrictMode>
  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
