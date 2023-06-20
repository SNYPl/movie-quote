import React, { useState, createContext } from "react";

type contxCreate = {
  login: boolean | string;
  setLogin: React.Dispatch<React.SetStateAction<boolean | string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

type contxProv = {
  children: React.ReactNode;
};

export const loginContx = createContext<contxCreate>({
  login: "",
  setLogin: () => {},
  username: "",
  setUsername: () => "",
  email: "",
  setEmail: () => "",
});

export const LoginProvider: React.FC<contxProv> = ({ children }) => {
  const [login, setLogin] = useState<boolean | string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <loginContx.Provider
      value={{
        setLogin,
        login,
        setUsername,
        username,
        email,
        setEmail,
      }}
    >
      {children}
    </loginContx.Provider>
  );
};
