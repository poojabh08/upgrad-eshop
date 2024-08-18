import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  if (authToken && authToken !== null) {
    localStorage.setItem("authToken", authToken);
  }
  const token = localStorage.getItem("authToken");
  if (token && token !== null) {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const user = JSON.parse(decodedPayload);
    if (user.exp < Date.now() / 1000) {
      localStorage.removeItem("authToken");
    }
  }
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
  return (
    <AuthContext.Provider
      value={{
        authToken,
        userId,
        isAdmin,
        setAuthToken,
        setUserId,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
