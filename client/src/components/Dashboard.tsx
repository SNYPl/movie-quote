import React, { useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import SideMenu from "./sideMenu/SideMenu";
import Navigation from "./navigation/Navigation";
import DashboardNavigation from "./navigation/dashboardNavigation/DashboardNav";
import { loginContx } from "../store/LoginContext";
import { DashbCtrx } from "../store/dashboardContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

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

const Dashboard: React.FC = () => {
  // useEffect(() => {
  //   axios.defaults.withCredentials = true;
  //
  //   axios
  //     .get("http://localhost:3001/dashboard", {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "http://localhost:3000/",
  //         " Access-Control-Allow-Credentials": true,
  //       },
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status == 200) {
  //         setUsername(res.data.username);
  //         setEmail(res.data.email);
  //         setProfileImageUpdated(res.data.image);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const { isLoading, error, data } = useQuery("userInfo", () =>
    axios.get("http://localhost:3001/dashboard", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        " Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
    })
  );

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
