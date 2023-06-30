import React, { useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import SideMenu from "./sideMenu/SideMenu";
import Navigation from "./navigation/Navigation";
import DashboardNavigation from "./navigation/dashboardNavigation/DashboardNav";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

const Dashboard: React.FC = () => {
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
