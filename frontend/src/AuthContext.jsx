import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const Id = decodedToken.userId; // Assuming the user ID is stored under `userId`
        const userRole = decodedToken.role; // Assuming the role is stored under `role`
        setUserId(Id);
        setRole(userRole);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const value = {
    role,
    setRole,
    userId,
    setUserId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
