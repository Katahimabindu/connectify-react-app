import { useState } from "react";
import "./login.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim() !== "") {
      localStorage.setItem("user", username);
      setUser(username);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Connectify</h1>
        <p className="subtitle">Connect with friends</p>

        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="note">*Enter any name to continue</p>
      </div>
    </div>
  );
};

export default Login;
