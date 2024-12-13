import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SupabaseProvider } from "./superbaseClient";
import "./index.css";
import { UserProvider } from "./pages/Login";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SupabaseProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SupabaseProvider>
  </BrowserRouter>
);
