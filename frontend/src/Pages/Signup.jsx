import React, { useState } from "react";
import axios from "axios";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = { username, password, role, profilePic };

    const userData = {
      username,
      password,
      role,
      profilePic,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/signup",
        userData
      );
      console.log(response.data); // Log the response data
    } catch (error) {
      console.error("Error:", error);
    }

    // Add code to handle form submission
    console.log(userData);
  };

  return (
    <div className="w-full h-full bg-gray flex justify-center items-center">
      {/* <div className="absolute inset-y-0 left-0 h-full w-1/3 bg-customBgFaded"></div> */}
      <div className="absolute inset-y-0 left-0 top-60 h-40 w-40 rounded-full bg-customBgFaded shadow-neon animate-neon-glow"></div>

      <div className="w-1/3 p-8 rounded-3xl mx-2 bg-gray-800 flex-col justify-center ">
        <h2 className="text-2xl font-bold mb-5 text-center text-white">
          Sign Up to the TMS
        </h2>
        {/* <div class="w-20 h-20 bg-white rounded-full mb-5 ml-auto mr-auto"></div> */}
        <div className="flex items-center justify-center mb-5">
          <label
            htmlFor="profilePic"
            className="cursor-pointer flex-col items-center justify-center "
          >
            <div className="w-20 h-20 bg-white rounded-full mb-1"></div>
            <a className="text-sm  text-center text-blue-500">Profile Upload</a>
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              autocomplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-700 rounded-lg px-4 py-3 w-full bg-gray-800 placeholder-gray focus:outline-none text-white"
              required
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              autocomplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-700 rounded-lg px-4 py-3 w-full bg-gray-800 placeholder-gray focus:outline-none text-white"
              placeholder="pasword@123"
              required
            />
          </div>
          <div className="mb-4">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-700 rounded-lg px-4 py-3 w-full bg-gray-800 focus:outline-none placeholder-gray text-white"
              required
            >
              <option value="">Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          {/* <div className="mb-4">
            <input
              type="file"
              id="profilePic"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="border border-gray-700 rounded-md px-4 py-2 w-full bg-gray-800  focus:outline-none hidden"
            />
          </div> */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-full w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
