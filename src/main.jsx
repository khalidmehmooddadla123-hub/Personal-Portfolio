import React from "react";
import ReactDOM from "react-dom/client";
import { DarkModeProvider } from "./context/DarkModeContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </React.StrictMode>
);
