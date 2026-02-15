import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <>
      <div style={{ textAlign: "right", padding: "10px" }}>
        Welcome, {user}
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      </div>

      <Home />
    </>
  );
}

export default App;
