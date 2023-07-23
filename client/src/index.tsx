import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./store/LoginContext";
import { SignUpProvider } from "./store/signUpContx";
import { QueryClient, QueryClientProvider } from "react-query";
import "./utils/i18n";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LoginProvider>
          <SignUpProvider>
            <App />
          </SignUpProvider>
        </LoginProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
