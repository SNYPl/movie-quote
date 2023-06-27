import React, { useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import SideMenu from "./sideMenu/SideMenu";
import Navigation from "./navigation/Navigation";
import DashboardNavigation from "./navigation/dashboardNavigation/DashboardNav";
import { loginContx } from "../store/LoginContext";
import { DashbCtrx } from "../store/dashboardContext";
import { Outlet } from "react-router-dom";
import axios from "axios";

// type MyType = {
//   name: string;
//   image: string;
//   year: string;
//   genre: string[];
//   description: string;
//   director: string;
//   budget: string;
//   quotes: any[];
// };

type MyType = {};

const Dashboard: React.FC = () => {
  const { setUsername, setEmail } = useContext(loginContx);
  const { setMovies, setProfileImageUpdated, profileImageUpdated } = useContext(
    DashbCtrx
  );
  const [movies, setMovie] = useState<MyType[]>([{}]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    setProfileImageUpdated("loading");
    axios
      .get("http://localhost:3001/dashboard", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000/",
          " Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 200) {
          setUsername(res.data.username);
          setEmail(res.data.email);
          setProfileImageUpdated(res.data.image);
          // setMovies((prev) => [...prev, res.data.movies]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.dashboard}>
      <header className={style.nav}>
        <Navigation>
          <DashboardNavigation />
        </Navigation>
      </header>
      <section className={style.dashboardInfo}>
        <SideMenu />
        <section className={style.dashboardContent}>
          <Outlet />
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
