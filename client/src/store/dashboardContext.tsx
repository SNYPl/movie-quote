import React, { useState, createContext } from "react";

type contxCreate = {
  // dashBoardNav: string;
  // setDashboardNav: React.Dispatch<React.SetStateAction<string>>;
  profileImage: any;
  setProfileImage: React.Dispatch<React.SetStateAction<any>>;
  profileImageUpdated: any;
  setProfileImageUpdated: React.Dispatch<React.SetStateAction<any>>;
  movies: any[];
  setMovies: React.Dispatch<React.SetStateAction<any[]>>;
};

type contxProv = {
  children: React.ReactNode;
};

export const DashbCtrx = createContext<contxCreate>({
  // dashBoardNav: "profile",
  // setDashboardNav: () => {},
  profileImage: "",
  setProfileImage: () => {},
  profileImageUpdated: "",
  setProfileImageUpdated: () => {},
  movies: [],
  setMovies: () => [],
});

export const DashboardProvider: React.FC<contxProv> = ({ children }) => {
  // const [dashBoardNav, setDashboardNav] = useState<string>("profile");
  const [profileImage, setProfileImage] = useState<any>("");
  const [profileImageUpdated, setProfileImageUpdated] = useState<any>("");
  const [movies, setMovies] = useState<any[]>([]);

  return (
    <DashbCtrx.Provider
      value={{
        profileImageUpdated,
        setProfileImageUpdated,
        profileImage,
        setProfileImage,
        movies,
        setMovies,
      }}
    >
      {children}
    </DashbCtrx.Provider>
  );
};
