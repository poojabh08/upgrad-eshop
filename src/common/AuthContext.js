import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null); // Initialize to null

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    // console.log("Retrieved token from localStorage:", token); // Debugging

    if (token) {
      try {
        const payload = token.split(".")[1];
        const decodedPayload = atob(payload);
        const user = JSON.parse(decodedPayload);
        // console.log("Decoded payload:", user); // Debugging
        if (user.exp < Date.now() / 1000) {
          console.log("Token expired"); // Debugging
          localStorage.removeItem("authToken");
          setAuthToken(null); // Clear token if expired
        } else {
          setAuthToken(token); // Set valid token
          localStorage.setItem("authToken", token); 
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setAuthToken(null); // Handle decoding error
      }
    }
  }, []); // Empty dependency array for initial setup

  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  // console.log("Current authToken:", authToken); // Debugging

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
