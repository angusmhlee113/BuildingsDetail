import { LoginContext } from "../login/hooks/loginContext";
import { useContext } from "react";

const Logoutbutton = () => {
  const { logout } = useContext(LoginContext);

  return (
    <div>
      <button className="logoutbutton" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Logoutbutton;
