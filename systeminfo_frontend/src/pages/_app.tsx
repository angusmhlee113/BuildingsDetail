import { type AppType } from "next/app";
import { UserProvider } from "~/components/login/hooks/loginContext";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default MyApp;
