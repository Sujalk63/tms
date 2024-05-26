import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    role: null,
    userId: null,
  });

  // actually setting the states
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAuthState({
          token,
          role: decodedToken.role,
          userId: decodedToken.userId,
        });
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const setToken = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setAuthState({
        token,
        role: decodedToken.role,
        userId: decodedToken.userId,
      });
    } else {
      localStorage.removeItem("token");
      setAuthState({ token: null, role: null, userId: null });
    }
  };

  return (
    <AuthContext.Provider value={{ authState, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
