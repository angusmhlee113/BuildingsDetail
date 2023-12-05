import Header from "~/components/common/Header";
import Chartdraw from "~/components/charts/Chartdraw";
import Logoutbutton from "~/components/general/Logoutbutton";
import { isEmptyString } from "~/utils/isEmptyString";
import { useEffect } from "react";
import { sessionName } from "~/utils/constants";
import { useRouter } from "next/router";

const chart = () => {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = !isEmptyString(
      window.sessionStorage.getItem(sessionName) || "",
    );
    if (!loggedIn) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <Header />
      <h1 className="ml-20 mt-20">Average EUI by Property Type</h1>
      <Chartdraw />
      <Logoutbutton />
    </div>
  );
};

export default chart;
