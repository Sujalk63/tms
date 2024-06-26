import React, { useState, useEffect } from "react";
import axios from "axios";
import { BottomWarning } from "../Components/BottomWarning";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { jwtDecode } from "jwt-decode";
// import { response } from "express";  importing a backend library in a frontend dir can cause such problems

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;
    if (alert) {
      timeoutId = setTimeout(() => {
        setAlert("");
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/signin",
        {
          username,
          password,
        }
      );
      const message = response.data.message;
      console.log(message);

      localStorage.setItem("token", response.data.token);

      // Decode the token and update context
      // const decodedToken = jwtDecode(response.data.token);
      // setUserId(decodedToken.userId);
      // setRole(decodedToken.role);
      setToken(response.data.token);

      localStorage.setItem("token", response.data.token);
      if (response.data) {
        setAlert(message);
      }
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        const message = error.response.data.message;
        console.log(message);
        setAlert(message);
      } else {
        console.log("An unexpected error occurred:", error);
        setAlert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full h-screen bg-gray flex justify-center items-center bg-customBg   bg-repeat text-primary-100 heropattern-topography-customBgLight">
      <div className="w-1/3 p-8 rounded-3xl bg-customColor flex-col items-center justify-center">
        <h2 className="text-2xl font-bold pb-1 mb-7 ml-auto mr-auto text-white w-1/2 border-b-4 border-customSideColor">
          Sign in to the TMS
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-700 rounded-lg px-4 py-3 w-full bg-customColorLight placeholder-gray focus:outline-none text-white"
              required
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-700 rounded-lg px-4 py-3 w-full bg-customColorLight placeholder-gray focus:outline-none text-white"
              placeholder="pasword@123"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-customSideColor hover:bg-customSideColorDark text-black font-semibold py-3 px-4 rounded-lg w-full"
          >
            Sign in
          </button>
          <BottomWarning
            label={"don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </form>
      </div>
      {alert && (
        <div className="absolute bottom-4 right-4 bg-customColorLight text-white shadow-md p-4 rounded-md z-50">
          {alert}
        </div>
      )}
    </div>
  );
};

export default Signin;

// const formData = new FormData();
// formData.append("username", username);
// formData.append("password", password);

// console.log(formData); formdata thing will not work here becuz the backend needs to be configured for form data as form data is used to transfer file to backends but in sigin we aint using file here

// When you need to upload files (such as images) along with other form data, using FormData is essential. It allows you to construct a set of key/value pairs representing form fields and their values, which can include files.
