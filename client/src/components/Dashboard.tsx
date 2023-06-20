import React, { useContext } from "react";
import style from "./style.module.css";
import SideMenu from "./sideMenu/SideMenu";
import Navigation from "./navigation/Navigation";
import DashboardNavigation from "./navigation/dashboardNavigation/DashboardNav";
import { loginContx } from "../store/LoginContext";
import { DashbCtrx } from "../store/dashboardContext";
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { username } = useContext(loginContx);
  const { dashBoardNav } = useContext(DashbCtrx);

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
