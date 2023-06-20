import React, { useState, createContext } from "react";

type contxCreate = {
  dashBoardNav: string;
  setDashboardNav: React.Dispatch<React.SetStateAction<string>>;
};

type contxProv = {
  children: React.ReactNode;
};

export const DashbCtrx = createContext<contxCreate>({
  dashBoardNav: "profile",
  setDashboardNav: () => {},
});

export const DashboardProvider: React.FC<contxProv> = ({ children }) => {
  const [dashBoardNav, setDashboardNav] = useState<string>("profile");

  return (
    <DashbCtrx.Provider
      value={{
        dashBoardNav,
        setDashboardNav,
      }}
    >
      {children}
    </DashbCtrx.Provider>
  );
};
