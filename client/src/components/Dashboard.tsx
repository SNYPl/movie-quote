import React from "react";
import style from "./style.module.css";
import SideMenu from "./sideMenu/SideMenu";
import MyProfile from "./profile/Profile";
import Navigation from "./navigation/Navigation";
import DashboardNavigation from "./navigation/dashboardNavigation/DashboardNav";
import NewsFeed from "./newsFeed/NewsFeed";
import MovieList from "./movieList/MovieList";

const Dashboard: React.FC = () => {
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
          <MyProfile />
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
