import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./store/LoginContext";
import { SignUpProvider } from "./store/signUpContx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <SignUpProvider>
          <App />
        </SignUpProvider>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
);
