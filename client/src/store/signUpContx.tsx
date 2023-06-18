import React, { useState, createContext } from "react";

type contxCreate = {
  userMode: boolean | string;
  setUserMode: React.Dispatch<React.SetStateAction<string>>;
  verifyThanksPage: boolean;
  setVerifyThanksPage: React.Dispatch<React.SetStateAction<boolean>>;
};

type contxProv = {
  children: React.ReactNode;
};

export const signUpCtrx = createContext<contxCreate>({
  userMode: false,
  setUserMode: () => {},
  verifyThanksPage: false,
  setVerifyThanksPage: () => {},
});

export const SignUpProvider: React.FC<contxProv> = ({ children }) => {
  const [userMode, setUserMode] = useState<string>("");
  const [verifyThanksPage, setVerifyThanksPage] = useState<boolean>(false);

  return (
    <signUpCtrx.Provider
      value={{
        userMode,
        setUserMode,
        verifyThanksPage,
        setVerifyThanksPage,
      }}
    >
      {children}
    </signUpCtrx.Provider>
  );
};
