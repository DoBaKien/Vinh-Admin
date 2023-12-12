import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import axios from "axios";
import { HashRouter } from "react-router-dom";

axios.defaults.baseURL = "https://kltnhk2023server-production.up.railway.app/";

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
