import { createContext, type ReactNode, useEffect, useState } from "react";

import { _logout } from "./loginFunctions/logout";
import { _login } from "./loginFunctions/login";

import {
  loginContextDefaultValue,
  sessionName,
} from "../../../utils/constants";
import { NextRouter, useRouter } from "next/router";

export const LoginContext = createContext(loginContextDefaultValue);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");

  useEffect(() => {
    if (window.sessionStorage.getItem(sessionName) == "loggedin") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [router.asPath]);

  const logout = () => {
    _logout();
  };

  const login = (username: string, password: string) => {
    _login(username, password, setUsername, setLoggedIn, setErrorMessages);
  };

  return (
    <LoginContext.Provider
      value={{ login, logout, loggedIn, password, username, errorMessages }}
    >
      {children}
    </LoginContext.Provider>
  );
};
