import { Dispatch, SetStateAction } from "react";

export const loginContextDefaultValue: {
  loggedIn: boolean;
  username: string;
  password: string;
  login: (username: string, password: string) => void;
  logout: VoidFunction;
  errorMessages: string;
} = {
  loggedIn: false,
  username: "",
  password: "",
  logout: () => {},
  login: () => {},
  errorMessages: "",
};

export const sessionName = "systeminfo_session";

export const responseStatus = {
  ok: 1,
  fail: 0,
  jwtFail: 2,
};
