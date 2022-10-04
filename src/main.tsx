import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./services/firebase";
import "antd/dist/antd.css";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
