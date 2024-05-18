import React, { useState } from "react";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { username, password, role, profilePic };
    // Add code to handle form submission
    console.log(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 border p-5 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Sign Up to the TMS
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-1"
          >
            Username
          </label> */}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-md px-4 py-2 w-full"
            required
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="border rounded-md px-4 py-2 w-full" required >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="profilePic"
            className="block text-gray-700 font-medium mb-1"
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePic"
            onChange={(e) => setProfilePic(e.target.files[0])}
            className="border rounded-md px-4 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md "
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
