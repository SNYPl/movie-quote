import React, { useState, createContext } from "react";

type contxCreate = {
  userMode: boolean | string;
  setUserMode: React.Dispatch<React.SetStateAction<string>>;
};

type contxProv = {
  children: React.ReactNode;
};

export const signUpCtrx = createContext<contxCreate>({
  userMode: false,
  setUserMode: () => {},
});

export const SignUpProvider: React.FC<contxProv> = ({ children }) => {
  const [userMode, setUserMode] = useState<string>("");

  return (
    <signUpCtrx.Provider
      value={{
        userMode,
        setUserMode,
      }}
    >
      {children}
    </signUpCtrx.Provider>
  );
};
