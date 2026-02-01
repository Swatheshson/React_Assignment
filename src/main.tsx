import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.min.css';                 // core CSS
import 'primeicons/primeicons.css';                               // icons
import 'primeflex/primeflex.css';                                 // optional flex utilities
import './index.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
