import React, { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState("password123");

  const login = (username, password) => {
    // ✅ Simple static check (replace with real auth later)
    if (username === "admin" && password === "password123") {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };
 
  const logout = () => {
    setIsLoggedIn(false);
  };
  const changePassword = (oldPass, newPass) => {
  if (oldPass === adminPassword) {
    setAdminPassword(newPass);
    return true;
  }
  return false;
};

  return (
    <AdminAuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
