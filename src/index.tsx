import ReactDOM from "react-dom"

import Home from "./pages/Home"
import { ViewProvider } from "context/AppContext"
import reportWebVitals from "./reportWebVitals"

import "./styles/index.css"
import "./styles/palette.css"
import "./styles/fonts.css"
import "./styles/elements.css"

ReactDOM.render(
  <ViewProvider>
    <Home />
  </ViewProvider>,
  document.getElementById("root")
)

reportWebVitals()