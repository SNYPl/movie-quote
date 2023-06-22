import React, { useContext, useEffect } from "react";
import style from "./style.module.css";
import SideMenu from "./sideMenu/SideMenu";
import Navigation from "./navigation/Navigation";
import DashboardNavigation from "./navigation/dashboardNavigation/DashboardNav";
import { loginContx } from "../store/LoginContext";
import { DashbCtrx } from "../store/dashboardContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
// import axios from '../utils/axios';

const Dashboard: React.FC = () => {
  const { username } = useContext(loginContx);
  const { dashBoardNav } = useContext(DashbCtrx);

  console.log(username)

  
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3001/dashboard",
      {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "http://localhost:3000/",
           " Access-Control-Allow-Credentials": true
            

        },
        withCredentials: true
    }).then(res=> console.log(res)).catch(err => console.log(err))

  });

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
