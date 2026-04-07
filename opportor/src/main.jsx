import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { HashRouter } from "react-router-dom";
import { AccessibilityProvider } from "./context/AccessibilityContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AccessibilityProvider>
    <HashRouter>
      <App />
    </HashRouter>
    </AccessibilityProvider>
  </React.StrictMode>
);
