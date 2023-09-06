import React, { useContext, useEffect, Suspense } from "react";
import "./App.css";
import Landing from "./components/landing/Landing";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Cookies from "universal-cookie";
import { loginContx } from "./store/LoginContext";
import { DashboardProvider } from "./store/dashboardContext";
import NotFound from "./components/error/404";
import GoogleSuccess from "./components/signIn/SignGoogle";
import SendVerifyMail from "./components/signIn/SendMail";
// import NewsFeed from "./components/newsFeed/NewsFeed";
// import MyProfile from "./components/profile/Profile";
// import MovieList from "./components/movieList/MovieList";
// import List from "./components/movieList/list/List";
// import MovieDescription from "./components/movieList/movieDescription/MovieDescription";
// import ViewQuote from "./components/movieList/movieDescription/quotes/view/ViewQuote";
// import EditQuote from "./components/movieList/movieDescription/quotes/edit/EditQuote";
// import axios from "axios";
import axios from "./helper/axios";
axios.defaults.withCredentials = true;

const MyProfile = React.lazy(() => import("./components/profile/Profile"));
const NewsFeed = React.lazy(() => import("./components/newsFeed/NewsFeed"));
const MovieList = React.lazy(() => import("./components/movieList/MovieList"));
const List = React.lazy(() => import("./components/movieList/list/List"));
const MovieDescription = React.lazy(() =>
  import("./components/movieList/movieDescription/MovieDescription")
);
const ViewQuote = React.lazy(() =>
  import("./components/movieList/movieDescription/quotes/view/ViewQuote")
);
const EditQuote = React.lazy(() =>
  import("./components/movieList/movieDescription/quotes/edit/EditQuote")
);

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
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <NewsFeed />
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MyProfile />
              </Suspense>
            }
          />

          <Route
            path="movie-list"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MovieList />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <List />
                </Suspense>
              }
            />
            <Route
              path="/dashboard/movie-list/movie/:movie"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MovieDescription />
                </Suspense>
              }
            />
            <Route
              path="/dashboard/movie-list/quote/:quote"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ViewQuote />
                </Suspense>
              }
            />
            <Route
              path="/dashboard/movie-list/quote/:quote/edit-quote"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <EditQuote />
                </Suspense>
              }
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
