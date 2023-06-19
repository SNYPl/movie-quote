import React, { useContext, useEffect } from "react";
import "./App.css";
import Landing from "./components/landing/Landing";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Cookies from "universal-cookie";
import { loginContx } from "./store/LoginContext";
import SendVerifyMail from "./components/signIn/SendMail";

function App() {
  const { setLogin, login, setEmail, setUsername } = useContext(loginContx);

  const cookies = new Cookies();
  useEffect(() => {
    if (cookies.get("login") === true) {
      setLogin(true);
    } else if (cookies.get("login") === "unVerified") {
      setLogin("unVerified");
    }
  }, [cookies.get("loginHandler")]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route path="/verify/:token" element={<Landing />} />
          <Route path="/forgot/password/:token" element={<Landing />} />
        </Route>
        <Route path="/noPass" element={<p>No Pass</p>} />
        <Route
          path="/dashboard"
          element={
            login === true ? (
              <Dashboard />
            ) : login === "unVerified" ? (
              <SendVerifyMail />
            ) : (
              <Landing />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
