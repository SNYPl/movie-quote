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
import List from "./components/movieList/list/List";
import MovieDescription from "./components/movieList/movieDescription/MovieDescription";
import ViewQuote from "./components/movieList/movieDescription/quotes/view/ViewQuote";
import EditQuote from "./components/movieList/movieDescription/quotes/edit/EditQuote";
import NotFound from "./components/error/404";
import GoogleSuccess from "./components/signIn/SignGoogle";

function App() {
  const { setLogin, login } = useContext(loginContx);
  const navigate = useNavigate();
  let location = useLocation();
  const cookies = new Cookies();

  useEffect(() => {
    if (!cookies.get("remember")) {
      const handleBeforeUnload = (event: any) => {
        cookies.remove("token", { path: "/" });
        cookies.remove("isLoggedIn", { path: "/" });
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);

  useEffect(() => {
    if (cookies.get("isLoggedIn") === "true" && cookies.get("token")) {
      setLogin(true);
    } else if (
      cookies.get("isLoggedIn") === "unVerified" &&
      cookies.get("token")
    ) {
      setLogin("unVerified");
    } else if (cookies.get("googleSigned")) {
      setLogin(true);
    } else if (
      cookies.get("remember") &&
      cookies.get("token") &&
      cookies.get("isLoggedIn") === true
    ) {
      setLogin(true);
    } else if (
      cookies.get("remember") &&
      cookies.get("token") &&
      cookies.get("isLoggedIn") === "unVerified"
    ) {
      setLogin("unVerified");
    } else {
      setLogin(false);
    }
  }, [cookies.get("isLoggedIn")]);

  useEffect(() => {
    if (cookies.get("isLoggedIn") && location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [cookies.get("isLoggedIn"), cookies.get("token")]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route path="/verify/:token" element={<Landing />} />
          <Route path="/forgot/password/:token" element={<Landing />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            login === true ? (
              <DashboardProvider>{<Dashboard />}</DashboardProvider>
            ) : login === "unVerified" ? (
              <SendVerifyMail />
            ) : (
              <Landing />
            )
          }
        >
          <Route index element={<NewsFeed />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="movie-list" element={<MovieList />}>
            <Route index element={<List />} />
            <Route
              path="/dashboard/movie-list/movie/:movie"
              element={<MovieDescription />}
            />
            <Route
              path="/dashboard/movie-list/quote/:quote"
              element={<ViewQuote />}
            />
            <Route
              path="/dashboard/movie-list/quote/:quote/edit-quote"
              element={<EditQuote />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/auth/google/success" element={<GoogleSuccess />} />

        <Route path="/noPass" element={<p>No Pass</p>} />
      </Routes>
    </div>
  );
}

export default App;
