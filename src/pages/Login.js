// src/pages/Login.js
import React, { useState, useContext } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setModal } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setModal({
        type: "success",
        title: "Login Successful",
        message: "Welcome back!",
      });
      navigate("/dashboard");
    } catch (error) {
      setModal({
        type: "error",
        title: "Login Error",
        message: error.message.replace("Firebase:", "").trim(),
      });
    }
  };

  return (
        <div className="container auth-form">
            <h2>Login</h2>
            <form onSubmit={login}>
                <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
                />
                <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                value={password}
                />
                <button type="submit">Login</button>
            </form>
        </div>
  );
}

export default Login;
