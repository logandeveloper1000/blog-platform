// src/pages/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if this is the authorized admin
      if (user.email === "logandeveloper1000@gmail.com") {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin-dashboard");
      } else {
        alert("Access denied: not an admin.");
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
        <div className="container auth-form">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit">Login</button>
            </form>
        </div>
  );
}

export default AdminLogin;
