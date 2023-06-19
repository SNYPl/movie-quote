import React, { useState, createContext } from "react";

type contxCreate = {
  userMode: boolean | string;
  setUserMode: React.Dispatch<React.SetStateAction<string>>;
  verifyThanksPage: boolean;
  setVerifyThanksPage: React.Dispatch<React.SetStateAction<boolean>>;
  forgotPasswordMode: string;
  setForgotPasswordMode: React.Dispatch<React.SetStateAction<string>>;
  forgotPasswordEmail: string;
  setForgotPasswordEmail: React.Dispatch<React.SetStateAction<string>>;
};

type contxProv = {
  children: React.ReactNode;
};

export const signUpCtrx = createContext<contxCreate>({
  userMode: false,
  setUserMode: () => {},
  verifyThanksPage: false,
  setVerifyThanksPage: () => {},
  forgotPasswordMode: "step1",
  setForgotPasswordMode: () => {},
  forgotPasswordEmail: "",
  setForgotPasswordEmail: () => {},
});

export const SignUpProvider: React.FC<contxProv> = ({ children }) => {
  const [userMode, setUserMode] = useState<string>("");
  const [verifyThanksPage, setVerifyThanksPage] = useState<boolean>(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState<string>("step1");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>("");

  return (
    <signUpCtrx.Provider
      value={{
        userMode,
        setUserMode,
        verifyThanksPage,
        setVerifyThanksPage,
        forgotPasswordMode,
        setForgotPasswordMode,
        forgotPasswordEmail,
        setForgotPasswordEmail,
      }}
    >
      {children}
    </signUpCtrx.Provider>
  );
};
