import { Dispatch, SetStateAction } from "react";
import { sessionName } from "~/utils/constants";

export const _login = async (
  username: string,
  password: string,
  setUsername: Dispatch<SetStateAction<string>>,
  setLoggedIn: Dispatch<SetStateAction<boolean>>,
  setErrorMessages: Dispatch<SetStateAction<string>>,
) => {
  setUsername(username);

  const body = JSON.stringify({
    username: username,
    password: password,
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKENDLOCALHOST}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      },
    );

    if (response.ok) {
      const data = await response.json();
      window.sessionStorage.setItem(sessionName, "loggedin");
      setErrorMessages("");
      window.location.href = "/chart";
    } else {
      const errorData = await response.json();
      setErrorMessages(errorData.message);
      console.log(errorData.message);
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
  }
};
