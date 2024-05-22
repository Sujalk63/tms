import React, { useState, useEffect } from "react";
import axios from "axios";

export const TaskRoomForm = ({ onClose, onSuccess }) => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  //   const [error, setError] = useState("");
  const [roomAlert, setAlert] = useState(null);

  useEffect(() => {
    let timeoutId;
    if (roomAlert) {
      timeoutId = setTimeout(() => {
        setAlert("");
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [roomAlert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/taskroom/newtaskroom",
        {
          roomName,
          description,
        }
      );
      const message = response.data.message;
      console.log(message);
      if (response.data) {
        setAlert(message);
      }
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
    <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/5 p-8 rounded-lg bg-customColor flex-col items-center justify-center ">
      <h2 className="text-lg font-bold pb-1 mb-7 ml-auto mr-auto text-white w-1/2 border-b-4 border-customSideColor text-center">
        Create <br /> Task Room
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            id="roomName"
            autoComplete="off"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="border border-gray-700 rounded-lg px-4 py-3 w-full bg-customColorLight placeholder-gray focus:outline-none text-white"
            required
            placeholder="Room Name"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="description"
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-700 rounded-lg px-4 py-3 w-full bg-customColorLight placeholder-gray focus:outline-none text-white"
            placeholder="Description"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-customSideColor hover:bg-customSideColorDark text-black font-semibold py-3 px-4 rounded-lg w-full"
        >
          Create Room
        </button>
      </form>
      {roomAlert && (
        <div className="absolute bottom-4 right-4 bg-customColorLight text-white shadow-md p-4 rounded-md z-50">
          {roomAlert}
        </div>
      )}
    </div>
  );
};
