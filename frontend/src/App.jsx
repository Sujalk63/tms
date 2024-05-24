import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { Dashboard } from "./Pages/DashBoard";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect, useMemo } from "react";

function App() {
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
        console.log(role, userId);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [role]);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route
            path="/dashboard"
            element={<Dashboard role={role} ></Dashboard>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
