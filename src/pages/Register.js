// src/pages/Register.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setModal } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setModal({
        type: "success",
        title: "Registration Successful",
        message: "Welcome! You are now registered.",
      });

      navigate("/dashboard");
    } catch (err) {
      setModal({
        type: "error",
        title: "Registration Error",
        message: err.message,
      });
    }
  };

  return (
        <div className="container auth-form">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            <button type="submit">Register</button>
            </form>
        </div>
  );
}

export default Register;
