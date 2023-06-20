import React, { useContext, useEffect } from "react";
import "./App.css";
import Landing from "./components/landing/Landing";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Cookies from "universal-cookie";
import { loginContx } from "./store/LoginContext";
import { DashboardProvider } from "./store/dashboardContext";
import SendVerifyMail from "./components/signIn/SendMail";
import NewsFeed from "./components/newsFeed/NewsFeed";
import MyProfile from "./components/profile/Profile";
import MovieList from "./components/movieList/MovieList";

function App() {
  const { setLogin, login, setUsername } = useContext(loginContx);
  const navigate = useNavigate();
  let location = useLocation();

  const cookies = new Cookies();
  useEffect(() => {
    if (cookies.get("login") === "true" && cookies.get("token")) {
      setLogin(true);
    } else if (cookies.get("login") === "unVerified") {
      setLogin("unVerified");
    } else {
      setLogin(false);
    }
  }, [cookies.get("login")]);

  useEffect(() => {
    if (login && location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [login]);

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
              <DashboardProvider>
                <Dashboard />
              </DashboardProvider>
            ) : login === "unVerified" ? (
              <SendVerifyMail />
            ) : (
              <Landing />
            )
          }
        >
          <Route index element={<NewsFeed />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="movie-list" element={<MovieList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
