import { useContext, useState } from "react";
import { LoginContext } from "../../components/login/hooks/loginContext";

const LoginPage = () => {
  const { errorMessages } = useContext(LoginContext);
  const { login } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleLogin = (e: any) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="login-container">
        <div className="headerbox">
          <h1 className="text-2xl font-bold">
            Seattle Building Data Visualization
          </h1>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <div className="inputlabel">
              <p>Username:</p>
            </div>
            <input
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
          </div>
          <div className="input-container">
            <div className="inputlabel">
              <p>Password:</p>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          <div className="mb-5 flex justify-center">
            <p className="text-red-500">{errorMessages}</p>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
