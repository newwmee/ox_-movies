import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SupabaseProvider } from "./superbaseClient";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  </BrowserRouter>
);
