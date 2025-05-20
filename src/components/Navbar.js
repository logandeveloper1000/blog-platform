// src/components/Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
        {/* Admin link removed intentionally */}
      </div>
      <div>
        {user ? (
          <button className="logout-button" onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" style={{ marginLeft: "1rem" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
