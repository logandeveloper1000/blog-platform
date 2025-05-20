// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Modal from "../components/Modal";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(null); // { type, title, message }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

 const logout = async () => {
  await signOut(auth);
  setModal({
    type: "success",
    title: "Logged Out",
    message: "You have been logged out successfully.",
  });
  setTimeout(() => {
    window.location.href = "/login";
  }, 1000); // wait for modal to display before redirect
};


  return (
    <AuthContext.Provider value={{ user, setUser, logout, setModal }}>
      {modal && <Modal {...modal} onClose={() => setModal(null)} />}
      {children}
    </AuthContext.Provider>
  );
}

