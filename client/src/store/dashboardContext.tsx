import React, { useState, createContext } from "react";

type contxCreate = {
  dashBoardNav: string;
  setDashboardNav: React.Dispatch<React.SetStateAction<string>>;
  profileImage: any;
  setProfileImage: React.Dispatch<React.SetStateAction<any>>;
};

type contxProv = {
  children: React.ReactNode;
};

export const DashbCtrx = createContext<contxCreate>({
  dashBoardNav: "profile",
  setDashboardNav: () => {},
  profileImage: "profile",
  setProfileImage: () => {},
});

export const DashboardProvider: React.FC<contxProv> = ({ children }) => {
  const [dashBoardNav, setDashboardNav] = useState<string>("profile");
  const [profileImage, setProfileImage] = useState<any>("");


  return (
    <DashbCtrx.Provider
      value={{
        dashBoardNav,
        setDashboardNav,
        profileImage,
        setProfileImage
      }}
    >
      {children}
    </DashbCtrx.Provider>
  );
};
