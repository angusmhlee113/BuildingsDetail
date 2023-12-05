import { useContext, useEffect, useState } from "react";
import Header from "~/components/common/Header";
import Buildingselection from "~/components/overview/Buildingselection";
import Buildingdetails from "~/components/overview/Buildingdetails";
import Logoutbutton from "~/components/general/Logoutbutton";
import { LoginContext } from "~/components/login/hooks/loginContext";
import { isEmptyString } from "~/utils/isEmptyString";
import { sessionName } from "~/utils/constants";
import { useRouter } from "next/router";

const overview = () => {
  const [selectedBuildings, setSelectedBuildings] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      <div>{isLoggedIn}</div>
      <Header />
      <div className="mt-[150px] flex flex-row">
        <div className="flex flex-1 justify-center">
          <Buildingdetails selectedBuildings={selectedBuildings} />
        </div>
        <div className="ml-20 flex flex-1 ">
          <Buildingselection setSelectedBuildings={setSelectedBuildings} />
        </div>
      </div>
      <Logoutbutton />
    </div>
  );
};

export default overview;
